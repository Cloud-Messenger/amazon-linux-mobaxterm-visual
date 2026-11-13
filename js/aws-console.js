CM.views = CM.views || {};
CM.views.aws = { label:"AWS Console", render(el){
 const s=CM.state.step, st=[
 ["Sign in and open EC2","Services > Compute > EC2 > Instances > Launch instances","<input type=text value='Search: EC2' readonly> <button class=hl>Launch instances</button>"],
 ["Name and AMI","Name: Cloud-Messenger-Amazon-Linux","<p>AMI: <b>Amazon Linux 2023</b> (64-bit x86)<br>Type: <b>t3.micro</b> · Storage: 8 GiB gp3 EBS<br>VPC: default · Subnet: default AZ</p>"],
 ["Key pair","Create new key pair","<p>Name: cloud-messenger-key · Type: RSA · Format: .pem</p><button class=hl id=mk>Create key pair</button><span id=mkr></span>"],
 ["Network settings","Security group: cm-sg","<table border=1 cellpadding=5><tr><td>SSH</td><td>TCP 22</td><td>My IP</td></tr><tr><td>HTTP</td><td>TCP 80</td><td>0.0.0.0/0</td></tr><tr><td>HTTPS</td><td>TCP 443</td><td>0.0.0.0/0 (when configured)</td></tr></table>"],
 ["Review and launch","Instance state","<button class=hl id=ln>Launch instance</button><p id=lr>State: —</p>"]][Math.min(s,4)];
 el.innerHTML=`<div class="win"><div class="tb"><span>AWS Console (educational simulation)</span><span>Region: ap-south-1</span></div><div class="bd"><h3>${st[0]}</h3><p>${st[1]}</p>${st[2]}</div></div>`;
 const mk=el.querySelector('#mk'); if(mk) mk.onclick=()=>{el.querySelector('#mkr').textContent=' Downloaded cloud-messenger-key.pem (simulated)'; };
 const ln=el.querySelector('#ln'); if(ln) ln.onclick=()=>{const r=el.querySelector('#lr');r.textContent='State: Pending';setTimeout(()=>r.textContent='State: Running · Checks: Initializing',1200);setTimeout(()=>r.textContent='State: Running · Checks: 2/2 passed · Public IPv4: 203.0.113.25',2600);};
}};
CM.views.downloads = { label:"Downloads", render(el){
 el.innerHTML=`<div class="win"><div class="tb"><span>File Explorer – Downloads</span><span>Simulation</span></div><div class="bd"><p>C:\\Users\\Username\\Downloads</p><p class="hl" style="display:inline-block;padding:4px">📄 cloud-messenger-key.pem</p><p class="tip">Contents are hidden on purpose. Never share or upload this file. AWS cannot give it to you again.</p></div></div>`;
}};
