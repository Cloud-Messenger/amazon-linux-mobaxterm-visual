CM.anim = {
 apply(s){
  document.querySelectorAll('.nd').forEach(n=>n.classList.toggle('on',(s.nodes||[]).includes(n.id)));
  document.querySelectorAll('.pk').forEach(p=>p.classList.toggle('on',(s.pk||[]).includes(p.id)));
  document.getElementById('ipTag').textContent = s.ip||CM.state.step>4 ? 'Public IPv4: 203.0.113.25 (example)' : '';
 },
 journey:["AWS Management Console","Amazon Linux 2023 AMI","EC2 instance creation","PEM key generation","Security group configuration","Windows laptop","MobaXterm","SSH private-key authentication","Amazon Linux terminal","NGINX installation","Live website"],
 playFinal(){
  const items=document.querySelectorAll('#journey li'); let i=0; const c=document.getElementById('cong'); c.textContent='';
  items.forEach(x=>x.classList.remove('on'));
  const t=setInterval(()=>{ items.forEach(x=>x.classList.remove('on')); if(i>=items.length){clearInterval(t);
   c.textContent='Congratulations! You have successfully launched Amazon Linux 2023 on AWS EC2 and connected securely using MobaXterm with your PEM private key!';return;}
   items[i++].classList.add('on'); },600);
 }
};
