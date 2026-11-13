CM.views = CM.views || {};
CM.views.desktop = { label:"Windows Desktop", render(el){
 el.innerHTML=`<div class="win dark"><div class="tb"><span>Windows desktop (simulation)</span><span>${new Date().getFullYear()}</span></div><div class="bd"><div class="icons"><button data-go="aws">☁️ AWS Console</button><button data-go="downloads">📁 Downloads</button><button data-go="mhome">🖥️ MobaXterm</button></div><p class="note">Click an icon to open it.</p></div></div>`;
 el.querySelectorAll('[data-go]').forEach(b=>b.onclick=()=>CM.showView(b.dataset.go));
}};
CM.showView=function(id){
 const v=CM.views[id]; if(!v) return; CM.curView=id; const el=document.getElementById('sim'); v.render(el);
 document.querySelectorAll('#simTabs button').forEach(b=>b.classList.toggle('act',b.dataset.v===id));
};
CM.buildTabs=function(){
 const t=document.getElementById('simTabs'); t.innerHTML='';
 ['desktop','aws','downloads','mhome','ssh','adv','pem','term'].forEach(id=>{const b=document.createElement('button');b.dataset.v=id;b.textContent=CM.views[id].label;b.onclick=()=>CM.showView(id);t.appendChild(b);});
};
