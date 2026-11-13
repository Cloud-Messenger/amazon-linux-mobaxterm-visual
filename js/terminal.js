CM.term = (function(){
 const out=()=>document.getElementById('tout'), box=()=>document.getElementById('term');
 const ex={
  whoami:["ec2-user","Your login name."],hostname:["ip-172-31-24-87.ap-south-1.compute.internal","The server's name; it embeds the private IP."],pwd:["/home/ec2-user","Your home directory."],
  "ls -la":["total 12\ndrwx------ 3 ec2-user ec2-user  95 Nov 14 09:12 .\ndrwxr-xr-x 3 root     root       22 Nov 14 09:10 ..\n-rw-r--r-- 1 ec2-user ec2-user  18 Jan 28  2023 .bash_logout\ndrwx------ 2 ec2-user ec2-user  29 Nov 14 09:10 .ssh","Hidden files start with a dot. .ssh holds authorized_keys with your public key."],
  "uname -a":["Linux ip-172-31-24-87.ap-south-1.compute.internal 6.1.x-xx.amzn2023.x86_64 #1 SMP x86_64 GNU/Linux","The kernel version and architecture."],
  "cat /etc/os-release":['NAME="Amazon Linux"\nVERSION="2023"\nID="amzn"\nPRETTY_NAME="Amazon Linux 2023"',"Identifies the distribution."],
  "df -h":["Filesystem      Size  Used Avail Use% Mounted on\n/dev/nvme0n1p1  8.0G  1.6G  6.5G  20% /\ntmpfs           475M     0  475M   0% /dev/shm","Disk use. The EBS root volume appears as an NVMe device on Nitro."],
  "free -m":["               total        used        free      shared  buff/cache   available\nMem:             949         160         560           0         228         650\nSwap:              0           0           0","Memory in MiB."],
  uptime:[" 09:20:11 up 12 min,  1 user,  load average: 0.00, 0.01, 0.00","Time since boot and CPU load."],
  "ip addr":["1: lo: <LOOPBACK,UP> inet 127.0.0.1/8\n2: ens5: <BROADCAST,MULTICAST,UP> mtu 9001\n    inet 172.31.24.87/20 brd 172.31.31.255 scope global dynamic ens5","ens5 is the network interface; only the private IP appears inside the VM."],
  "sudo dnf update -y":["Dependencies resolved.\nNothing to do.\nComplete!","dnf updates packages; sudo runs it as administrator."],
  "sudo dnf install nginx -y":["Installing: nginx\nInstalled: nginx-1.2x.x\nComplete!","Installs the web server."],
  "sudo systemctl enable --now nginx":["Created symlink /etc/systemd/system/multi-user.target.wants/nginx.service","Starts NGINX now and at every boot."],
  "sudo systemctl status nginx":["● nginx.service - The nginx HTTP and reverse proxy server\n   Active: active (running)","Shows the service state."],
  "sudo systemctl status sshd":["● sshd.service - OpenSSH server daemon\n   Active: active (running)","If sshd is down, SSH is refused."],
  "sudo nginx -t":["nginx: configuration file /etc/nginx/nginx.conf test is successful","Syntax-checks the config."],
  "sudo ss -tulpn":["tcp LISTEN 0 128 0.0.0.0:22  users:((\"sshd\"))\ntcp LISTEN 0 511 0.0.0.0:80  users:((\"nginx\"))","Shows which ports have listeners."],
  "curl -I http://localhost":["HTTP/1.1 200 OK\nServer: nginx\nContent-Type: text/html","A 200 means NGINX serves the page locally."],
  "sudo journalctl -u sshd -n 50":["... Accepted publickey for ec2-user from 198.51.100.7 port 51234 ssh2","Recent SSH log lines."]
 };
 const need={"sudo systemctl enable --now nginx":1,"sudo systemctl status nginx":1,"sudo nginx -t":1,"curl -I http://localhost":1};
 function print(t,c){const d=document.createElement('div');d.textContent=t;if(c)d.className=c;out().appendChild(d);box().scrollTop=box().scrollHeight;}
 function run(cmd){
  cmd=cmd.trim(); print('[ec2-user@ip-172-31-24-87 ~]$ '+cmd); if(!cmd)return;
  if(cmd==='clear'){out().innerHTML='';return;}
  if(cmd==='help'){print(Object.keys(ex).join('\n'),'x');return;}
  const r=ex[cmd]; if(!r){print('bash: '+cmd.split(' ')[0]+': command not found (not in this simulator – type help)');return;}
  if(need[cmd]&&!CM.state.nginx){ print(cmd.includes('curl')?'curl: (7) Failed to connect to localhost port 80: Connection refused':'Unit nginx.service could not be found. Install it first with: sudo dnf install nginx -y');return;}
  if(cmd==='sudo dnf install nginx -y')CM.state.nginx=true;
  print(r[0]); print('→ '+r[1],'e');
 }
 function init(){
  print('Last login: Sat Nov 14 09:08:41 2026 from 198.51.100.7\n\n       Amazon Linux 2023\n       (simulation – not a real server)\n');
  const i=document.getElementById('tin'); i.addEventListener('keydown',e=>{if(e.key==='Enter'){run(i.value);i.value='';}});
  const c=document.getElementById('chips'); ['whoami','hostname','pwd','ls -la','uname -a','cat /etc/os-release','df -h','free -m','uptime','ip addr','sudo dnf update -y','sudo dnf install nginx -y','sudo systemctl enable --now nginx','sudo systemctl status nginx','curl -I http://localhost'].forEach(x=>{const b=document.createElement('button');b.textContent=x;b.onclick=()=>run(x);c.appendChild(b);});
 }
 return {init,run};
})();
