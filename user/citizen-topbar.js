/* Shared citizen top bar — injects into any page with <div id="citizenTopbar"></div> */
(function(){
  document.addEventListener('DOMContentLoaded',()=>{
    const host=document.getElementById('citizenTopbar');
    if(!host)return;
    const html=`
<header class="top-bar">
  <div class="brand">
    <button class="icon-btn" onclick="openDrawer()" title="Menu" aria-label="Menu"><i class="fa-solid fa-bars"></i></button>
    <div class="brand-logo"><i class="fa-solid fa-qrcode"></i></div>
    <div class="brand-text">
      <h1>QR Nexus</h1>
      <div class="sub">Government of India · Traffic Dept</div>
    </div>
  </div>
  <div class="top-actions">
    <a class="icon-btn" href="challans.html" title="My Challans"><i class="fa-solid fa-bell"></i><span class="badge-num" id="topNotifBadge">0</span></a>
    <a class="icon-btn" href="profile.html" title="My Profile"><i class="fa-solid fa-user"></i></a>
    <a class="icon-btn danger" href="javascript:void(0)" onclick="logout()" title="Logout"><i class="fa-solid fa-right-from-bracket"></i></a>
  </div>
</header>

<aside id="drawer" aria-label="Side menu" style="position:fixed;top:0;left:0;bottom:0;width:280px;background:#fff;z-index:200;transform:translateX(-100%);transition:transform 0.3s var(--ease);box-shadow:0 24px 60px rgba(0,0,0,0.20);overflow-y:auto;display:flex;flex-direction:column;">
  <div style="padding:24px 20px;background:linear-gradient(135deg,#FF6B00,#FF8C42);color:#fff;display:flex;align-items:center;gap:12px;">
    <div class="brand-logo" style="background:rgba(255,255,255,0.25);box-shadow:none;" id="drawerAvatar">?</div>
    <div style="flex:1;min-width:0;">
      <div style="font-size:1rem;font-weight:600;" id="drawerName">Loading...</div>
      <div style="font-size:0.78rem;opacity:0.85;word-break:break-all;" id="drawerEmail">...</div>
    </div>
    <button onclick="closeDrawer()" aria-label="Close" style="position:absolute;top:14px;right:14px;background:rgba(255,255,255,0.2);border:none;width:32px;height:32px;border-radius:50%;color:#fff;cursor:pointer;font-size:1.1rem;display:flex;align-items:center;justify-content:center;">&times;</button>
  </div>
  <div style="padding:12px 0;flex:1;">
    <a href="userhome.html" style="display:flex;align-items:center;gap:14px;padding:14px 22px;color:var(--cit-text);text-decoration:none;font-size:0.92rem;font-weight:500;border-left:3px solid transparent;transition:all 0.2s var(--ease);"><i class="fa-solid fa-house" style="width:20px;color:var(--cit-mute);"></i> Home</a>
    <a href="profile.html" style="display:flex;align-items:center;gap:14px;padding:14px 22px;color:var(--cit-text);text-decoration:none;font-size:0.92rem;font-weight:500;border-left:3px solid transparent;transition:all 0.2s var(--ease);"><i class="fa-solid fa-user" style="width:20px;color:var(--cit-mute);"></i> My Profile</a>
    <a href="my_vehicles.html" style="display:flex;align-items:center;gap:14px;padding:14px 22px;color:var(--cit-text);text-decoration:none;font-size:0.92rem;font-weight:500;border-left:3px solid transparent;transition:all 0.2s var(--ease);"><i class="fa-solid fa-car" style="width:20px;color:var(--cit-mute);"></i> My Vehicles</a>
    <a href="twowheeler_license.html" style="display:flex;align-items:center;gap:14px;padding:14px 22px;color:var(--cit-text);text-decoration:none;font-size:0.92rem;font-weight:500;border-left:3px solid transparent;transition:all 0.2s var(--ease);"><i class="fa-solid fa-motorcycle" style="width:20px;color:var(--cit-mute);"></i> Two-Wheeler License</a>
    <a href="challans.html" style="display:flex;align-items:center;gap:14px;padding:14px 22px;color:var(--cit-text);text-decoration:none;font-size:0.92rem;font-weight:500;border-left:3px solid transparent;transition:all 0.2s var(--ease);"><i class="fa-solid fa-receipt" style="width:20px;color:var(--cit-mute);"></i> My Challans <span class="count" id="drawerChallanCount" style="background:var(--cit-red);color:#fff;font-size:0.7rem;padding:2px 8px;border-radius:10px;margin-left:auto;display:none;">0</span></a>
    <a href="schemes.html" style="display:flex;align-items:center;gap:14px;padding:14px 22px;color:var(--cit-text);text-decoration:none;font-size:0.92rem;font-weight:500;border-left:3px solid transparent;transition:all 0.2s var(--ease);"><i class="fa-solid fa-landmark" style="width:20px;color:var(--cit-mute);"></i> Government Schemes</a>
    <a href="aboutus.html" style="display:flex;align-items:center;gap:14px;padding:14px 22px;color:var(--cit-text);text-decoration:none;font-size:0.92rem;font-weight:500;border-left:3px solid transparent;transition:all 0.2s var(--ease);"><i class="fa-solid fa-circle-info" style="width:20px;color:var(--cit-mute);"></i> About Us</a>
    <a href="contactus.html" style="display:flex;align-items:center;gap:14px;padding:14px 22px;color:var(--cit-text);text-decoration:none;font-size:0.92rem;font-weight:500;border-left:3px solid transparent;transition:all 0.2s var(--ease);"><i class="fa-solid fa-headset" style="width:20px;color:var(--cit-mute);"></i> Contact Us</a>
    <a href="javascript:void(0)" onclick="logout()" style="display:flex;align-items:center;gap:14px;padding:14px 22px;color:var(--cit-red);text-decoration:none;font-size:0.92rem;font-weight:500;border-left:3px solid transparent;transition:all 0.2s var(--ease);"><i class="fa-solid fa-right-from-bracket" style="width:20px;color:var(--cit-red);"></i> Logout</a>
  </div>
</aside>
<div id="drawerBackdrop" onclick="closeDrawer()" style="position:fixed;inset:0;background:rgba(0,0,0,0.5);z-index:150;opacity:0;pointer-events:none;transition:opacity 0.3s var(--ease);"></div>
`;
    host.outerHTML=html;

    // Hover state for drawer links
    document.querySelectorAll('#drawer a').forEach(a=>{
      a.addEventListener('mouseenter',()=>{a.style.background='var(--cit-bg-2)';a.style.borderLeftColor='var(--cit-saffron)';a.style.color='var(--cit-saffron)';const ic=a.querySelector('i');if(ic)ic.style.color='var(--cit-saffron)';});
      a.addEventListener('mouseleave',()=>{a.style.background='';a.style.borderLeftColor='transparent';a.style.color=a.getAttribute('onclick')==='logout()'?'var(--cit-red)':'var(--cit-text)';const ic=a.querySelector('i');if(ic)ic.style.color=a.getAttribute('onclick')==='logout()'?'var(--cit-red)':'var(--cit-mute)';});
    });

    // Listen to challans count
    if(firebase.auth().currentUser){
      const uid=firebase.auth().currentUser.uid;
      firebase.database().ref('challans/'+uid).orderByChild('status').equalTo('pending').on('value',s=>{
        const n=s.numChildren();
        const b=document.getElementById('topNotifBadge');
        if(b){b.textContent=n;b.style.display=n>0?'block':'none';}
        const c=document.getElementById('drawerChallanCount');
        if(c){c.textContent=n;c.style.display=n>0?'inline-block':'none';}
      });
      // Drawer user info
      const u=firebase.auth().currentUser;
      const name=u.email.split('@')[0];
      const av=document.getElementById('drawerAvatar');if(av)av.textContent=name.charAt(0).toUpperCase();
      const dn=document.getElementById('drawerName');if(dn)dn.textContent=name;
      const de=document.getElementById('drawerEmail');if(de)de.textContent=u.email;
    }
  });
})();

function openDrawer(){
  const d=document.getElementById('drawer');
  const b=document.getElementById('drawerBackdrop');
  if(d)d.style.transform='translateX(0)';
  if(b){b.style.opacity='1';b.style.pointerEvents='auto';}
}
function closeDrawer(){
  const d=document.getElementById('drawer');
  const b=document.getElementById('drawerBackdrop');
  if(d)d.style.transform='translateX(-100%)';
  if(b){b.style.opacity='0';b.style.pointerEvents='none';}
}
function logout(){firebase.auth().signOut().then(()=>location.href='../index.html');}
function toast(msg,type){
  let t=document.getElementById('toast');
  if(!t){t=document.createElement('div');t.id='toast';t.className='toast';document.body.appendChild(t);}
  t.className='toast show '+(type||'');
  const icon=type==='err'?'<i class="fa-solid fa-circle-xmark" style="color:var(--cit-red)"></i>':(type==='ok'?'<i class="fa-solid fa-circle-check" style="color:var(--cit-green)"></i>':'<i class="fa-solid fa-circle-info" style="color:var(--cit-saffron)"></i>');
  t.innerHTML=icon+' '+msg;
  clearTimeout(t._tm);t._tm=setTimeout(()=>t.classList.remove('show'),3200);
}
