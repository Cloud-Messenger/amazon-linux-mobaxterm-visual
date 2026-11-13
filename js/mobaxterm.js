CM.views = CM.views || {};
CM.mx = { host:'', user:'', port:'22', usePk:false, key:'' };
CM.views.mhome = { label:"MobaXterm Home", render(el){
 el.innerHTML=`<div class="win dark"><div class="tb"><span>MobaXterm (simulation)</span><span>Session · Servers · Tools</span></div><div class="bd"><button class="hl" id="ns">Session</button><p class="note">Click Session, then SSH.</p></div></div>`;
 el.querySelector('#ns').onclick=()=>CM.showView('ssh');
}};
CM.shots=`<details class="tip"><summary>Reference screenshots of the real MobaXterm window</summary>
<p>Screenshot 1 is a real session (username ubuntu is for Ubuntu AMIs; Amazon Linux uses ec2-user). Screenshot 2 is a numbered layout guide: 1 SSH, 2 Remote host, 3 Specify username, 4 Use private key. It shows a .ppk file; with AWS .pem you can select the .pem directly.</p>
<img class="shot" src="assets/mobaxterm/mobaxterm-session-reference-1.png" alt="MobaXterm session settings with a private key selected"><img class="shot" src="assets/mobaxterm/mobaxterm-session-reference-2.png" alt="MobaXterm numbered session settings guide"></details>`;
function field(el,id,val,done){const i=el.querySelector(id);let k=0;const t=setInterval(()=>{i.value=val.slice(0,++k);if(k>=val.length){clearInterval(t);done&&done();}},60);}
CM.views.ssh = { label:"SSH Session", render(el){
 el.innerHTML=`<div class="win dark"><div class="tb"><span>Session settings – SSH</span><span>Simulation</span></div><div class="bd">
 <p>Remote host * <input type="text" id="h" value="${CM.mx.host}"> &nbsp;<label><input type="checkbox" id="su" ${CM.mx.user?'checked':''}> Specify username</label> <input type="text" id="u" value="${CM.mx.user}" style="width:110px"> Port <input type="text" id="p" value="${CM.mx.port}" style="width:50px"></p>
 <button id="auto" class="hl">Fill fields</button> <button id="adv">Advanced SSH settings</button>${CM.shots}</div></div>`;
 el.querySelector('#auto').onclick=()=>{field(el,'#h','203.0.113.25',()=>{CM.mx.host='203.0.113.25';el.querySelector('#su').checked=true;field(el,'#u','ec2-user',()=>{CM.mx.user='ec2-user';});});};
 el.querySelector('#adv').onclick=()=>CM.showView('adv');
}};
CM.views.adv = { label:"Advanced SSH", render(el){
 el.innerHTML=`<div class="win dark"><div class="tb"><span>Session settings – Advanced SSH settings</span><span>Simulation</span></div><div class="bd">
 <p>X11-Forwarding ☑ · Compression ☑ · Remote environment: Interactive shell</p>
 <p><label><input type="checkbox" id="up" ${CM.mx.usePk?'checked':''}> Use private key</label> <input type="text" id="k" readonly style="width:360px" value="${CM.mx.key}"> <button id="br" class="hl">Browse</button></p>
 <p id="msg" class="note">Check the box, click Browse, choose the key, then OK.</p><button id="ok">OK</button> <button id="cn">Cancel</button>${CM.shots}</div></div>`;
 el.querySelector('#up').onchange=e=>CM.mx.usePk=e.target.checked;
 el.querySelector('#br').onclick=()=>CM.showView('pem');
 el.querySelector('#ok').onclick=()=>{const m=el.querySelector('#msg');m.textContent=CM.mx.usePk&&CM.mx.key?'Session saved. Connecting… (opens the terminal)':'Tick Use private key and select a key first.';if(CM.mx.usePk&&CM.mx.key){setTimeout(()=>{CM.showView('term');document.getElementById('term').scrollIntoView({behavior:'smooth'});},800);}};
}};
CM.views.pem = { label:"Select PEM File", render(el){
 el.innerHTML=`<div class="win"><div class="tb"><span>Select private key – Downloads</span><span>Simulation</span></div><div class="bd"><p>C:\\Users\\Username\\Downloads</p>
 <p><button data-f="notes.txt">notes.txt</button> <button data-f="cloud-messenger-key.pem" class="hl">cloud-messenger-key.pem</button> <button data-f="cloud-messenger-key.ppk">old-key.ppk</button></p><p id="pm" class="note">Choose the .pem file. Contents stay hidden.</p></div></div>`;
 el.querySelectorAll('[data-f]').forEach(b=>b.onclick=()=>{const f=b.dataset.f;if(f==='cloud-messenger-key.pem'){CM.mx.key='C:\\Users\\Username\\Downloads\\cloud-messenger-key.pem';CM.mx.usePk=true;CM.showView('adv');}else el.querySelector('#pm').textContent='That is not the key pair file created for this instance. Pick cloud-messenger-key.pem.';});
}};
CM.views.term = { label:"Linux Terminal", render(el){
 el.innerHTML=`<div class="win dark"><div class="tb"><span>Terminal – ec2-user@ip-172-31-24-87</span><span>Simulation</span></div><div class="bd"><p>SSH tunnel to 203.0.113.25:22 with key ${CM.mx.key?'cloud-messenger-key.pem':'(not selected yet – complete Step 7)'}</p><p class="note">Scroll to the Linux terminal section below and type commands.</p></div></div>`;
}};
