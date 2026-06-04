/* ===========================================================
   CIVIC SCORE — Government of India citizen rating system
   Computes a 0-1000 score per user from:
     - Document renewal timeliness (+)
     - Tax / fee payments on time (+)
     - No challans / minor challans only (+)
     - Lapsed insurance / PUC (-)
     - Overdue challans (-)
     - Active watchlist flag (-)
     - Account age (+)
   Tier:  Diamond  850+  |  Gold  700+  |  Silver  500+  |  Bronze  <500
   =========================================================== */
const CivicScore={
  PERFECT:1000, TIER_DIAMOND:850, TIER_GOLD:700, TIER_SILVER:500,

  tierFor(score){
    if(score>=this.TIER_DIAMOND) return {name:'Diamond',color:'#00A8C9',icon:'fa-gem'};
    if(score>=this.TIER_GOLD)     return {name:'Gold',color:'#FFB020',icon:'fa-trophy'};
    if(score>=this.TIER_SILVER)   return {name:'Silver',color:'#9CA3AF',icon:'fa-medal'};
    return {name:'Bronze',color:'#C77B30',icon:'fa-award'};
  },

  async compute(uid,db){
    let score=this.PERFECT;
    const reasons=[];

    // Account age bonus
    try{
      const u=firebase.auth().currentUser;
      const ageDays=(Date.now()-new Date(u.metadata.creationTime))/86400000;
      if(ageDays>365) score+=10, reasons.push({p:10,t:'Account over 1 year old'});
    }catch(e){}

    // Vehicles & expired docs
    const vSnap=await db.ref('vehicles/'+uid).once('value');
    const vehicles=vSnap.val()||{};
    const vCount=Object.keys(vehicles).length;
    const now=Date.now();
    Object.values(vehicles).forEach(v=>{
      if(v.insurance){
        const exp=new Date(v.insurance).getTime();
        const days=(exp-now)/86400000;
        if(days<0) score-=80, reasons.push({p:-80,t:'Lapsed insurance on '+v.rc});
        else if(days<30) score-=20, reasons.push({p:-20,t:'Insurance expiring soon on '+v.rc});
        else if(days>180) score+=15, reasons.push({p:15,t:'Long-valid insurance on '+v.rc});
      }else{
        score-=10; reasons.push({p:-10,t:'No insurance recorded for '+v.rc});
      }
      if(v.puc){
        const exp=new Date(v.puc).getTime();
        const days=(exp-now)/86400000;
        if(days<0) score-=60, reasons.push({p:-60,t:'Lapsed PUC on '+v.rc});
        else if(days<30) score-=15, reasons.push({p:-15,t:'PUC expiring soon on '+v.rc});
        else score+=10, reasons.push({p:10,t:'Valid PUC on '+v.rc});
      }
    });

    // Challans
    const cSnap=await db.ref('challans/'+uid).once('value');
    const challans=cSnap.val()||{};
    let pending=0,paid=0,disputed=0,totalDue=0;
    Object.values(challans).forEach(c=>{
      if(c.status==='pending'){pending++;totalDue+=c.amount||0;}
      else if(c.status==='paid') paid++;
      else if(c.status==='disputed') disputed++;
    });
    if(paid>0) score+=Math.min(40,paid*5), reasons.push({p:Math.min(40,paid*5),t:'Paid '+paid+' challan(s) on time'});
    if(pending>0){
      const pen=pending*40+Math.min(80,totalDue/100);
      score-=Math.round(pen);
      reasons.push({p:-Math.round(pen),t:pending+' pending challan(s) · ₹'+totalDue+' due'});
    }
    if(disputed>0) score-=disputed*10, reasons.push({p:-disputed*10,t:disputed+' disputed challan(s)'});

    // Watchlist check
    // (officer can flag us; iterate all officer watchlists — usually empty in real data)
    // Lightweight: just check our own user record for any flag
    const userRec=(await db.ref('users/'+uid).once('value')).val()||{};
    if(userRec.onWatchlist) score-=150, reasons.push({p:-150,t:'On officer watchlist'});

    // QR usage (active citizen)
    const qrSnap=await db.ref('users/'+uid+'/trafficdata').once('value');
    if(qrSnap.exists()){
      const cnt=qrSnap.numChildren();
      score+=Math.min(30,cnt*5);
      reasons.push({p:Math.min(30,cnt*5),t:'Active QR user ('+cnt+' QR'+(cnt>1?'s':'')+')'});
    }

    score=Math.max(0,Math.min(1000,Math.round(score)));
    return {score,reasons,tier:this.tierFor(score),vehicles:vCount};
  }
};
