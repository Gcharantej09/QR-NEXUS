/* Shared admin top bar — injects into any page with <div id="adminTopbar"></div> */
(function(){
  const u=firebase.auth().currentUser;
  document.addEventListener('DOMContentLoaded',()=>{
    const host=document.getElementById('adminTopbar');
    if(!host)return;
    const html=`
<header class="top-bar">
  <div class="brand">
    <a class="icon-btn" href="adminhome.html" title="Command Center" aria-label="Home"><i class="fa-solid fa-house"></i></a>
    <div class="brand-logo"><i class="fa-solid fa-shield-halved"></i></div>
    <div class="brand-text">
      <h1>QR Nexus · Officer</h1>
      <div class="sub">Command Center</div>
    </div>
  </div>
  <div class="top-actions">
    <a class="icon-btn" href="qr_code_scanner.html" title="Scan QR"><i class="fa-solid fa-camera"></i></a>
    <a class="icon-btn" href="scan_history.html" title="History"><i class="fa-solid fa-clock-rotate-left"></i></a>
    <a class="icon-btn" href="watchlist.html" title="Watchlist"><i class="fa-solid fa-eye"></i><span class="badge-num" id="topWatchlistBadge">0</span></a>
    <a class="icon-btn" href="settings.html" title="Settings"><i class="fa-solid fa-gear"></i></a>
    <a class="icon-btn danger" href="javascript:void(0)" onclick="logout()" title="Sign out"><i class="fa-solid fa-right-from-bracket"></i></a>
  </div>
</header>`;
    host.outerHTML=html;
    // Listen to watchlist count
    if(firebase.auth().currentUser){
      const uid=firebase.auth().currentUser.uid;
      firebase.database().ref('watchlist/'+uid).on('value',s=>{
        const n=s.numChildren();
        const b=document.getElementById('topWatchlistBadge');
        if(b){b.textContent=n;b.style.display=n>0?'block':'none';}
      });
    }
  });
})();
function logout(){firebase.auth().signOut().then(()=>location.href='../index.html');}
function toast(msg,type){
  let t=document.getElementById('toast');
  if(!t){t=document.createElement('div');t.id='toast';t.className='toast';document.body.appendChild(t);}
  t.className='toast show '+(type||'');
  t.innerHTML=(type==='err'?'<i class="fa-solid fa-circle-xmark"></i>':(type==='ok'?'<i class="fa-solid fa-circle-check"></i>':'<i class="fa-solid fa-circle-info"></i>'))+' '+msg;
  clearTimeout(t._tm);t._tm=setTimeout(()=>t.classList.remove('show'),3200);
}
