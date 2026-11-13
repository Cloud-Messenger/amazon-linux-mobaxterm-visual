(function(){
 const $=id=>document.getElementById(id); let timer=null, playing=true, done=new Set();
 function set(id,v){$(id).textContent=v;}
 function go(i){
  i=Math.max(0,Math.min(8,i)); CM.state.step=i; const s=CM.steps[i];
  set('stTitle',`Step ${i+1}: ${s.e} ${s.t}`); set('stStory',s.story); set('cSimple',s.simple); set('cTech',s.tech); set('cAna',s.ana); set('cCmd',s.cmd); set('cOut',s.out); set('cMis',s.mis); set('cTro',s.tro); set('cInt',s.q);
  for(let k=0;k<i;k++)done.add(k);
  document.querySelectorAll('#side button').forEach((b,k)=>{b.classList.toggle('act',k===i);b.classList.toggle('done',done.has(k));});
  $('prog').style.width=((i+1)/9*100)+'%'; CM.anim.apply(s); CM.showView(s.view);
 }
 function tick(){timer=setInterval(()=>{ if(CM.state.step>=8){go(0);} else go(CM.state.step+1); },5000);}
 function play(){playing=true;$('play').textContent='Pause';clearInterval(timer);tick();}
 function pause(){playing=false;$('play').textContent='Play';clearInterval(timer);}
 function init(){
  const side=$('side'); CM.steps.forEach((s,i)=>{const b=document.createElement('button');b.innerHTML=`<span class="n">${i+1}</span><span class="t">${s.t}</span>`;b.onclick=()=>{go(i);if(playing)play();};side.appendChild(b);});
  CM.buildTabs(); CM.buildLab(); CM.term.init();
  CM.anim.journey.forEach(x=>{const li=document.createElement('li');li.textContent=x;$('journey').appendChild(li);});
  $('prev').onclick=()=>{go(CM.state.step-1);if(playing)play();}; $('next').onclick=()=>{go(CM.state.step+1);if(playing)play();};
  $('play').onclick=()=>playing?pause():play();
  $('reset').onclick=()=>{done.clear();CM.mx={host:'',user:'',port:'22',usePk:false,key:''};CM.state.nginx=false;$('tout').innerHTML='';$('cong').textContent='';go(0);play();};
  $('mode').onclick=()=>{const b=document.body;const m=b.dataset.mode==='beginner'?'technical':'beginner';b.dataset.mode=m;$('mode').textContent='Mode: '+(m==='beginner'?'Beginner':'Technical');};
  $('theme').onclick=()=>{const h=document.documentElement;const t=h.dataset.theme==='dark'?'light':'dark';h.dataset.theme=t;$('theme').textContent='Theme: '+(t==='dark'?'Dark':'Light');};
  $('fin').onclick=()=>CM.anim.playFinal();
  go(0); tick();
 }
 document.addEventListener('DOMContentLoaded',init);
})();
