# 🐧 Amazon Linux EC2 Visual – From AWS Instance Creation to MobaXterm SSH Connection

An interactive, no-build educational lab by **Cloud Messenger™**: nine animated steps, a Windows/MobaXterm simulator, a Linux terminal simulator, a website preview and a 12-incident troubleshooting lab. Everything is a **simulation** – no AWS credentials or private keys are ever requested.

## Learning objectives
Create an Amazon Linux 2023 EC2 instance · understand Nitro/virtualization · create and protect a `.pem` key · configure Security Groups · connect with MobaXterm using the PEM directly · explore Linux · host a site with NGINX · troubleshoot SSH and HTTP.

## Run it
Open `index.html` in a browser, or serve it: `python3 -m http.server`.

## Nine steps
1 AWS Console & EC2 · 2 Amazon Linux AMI · 3 PEM key pair · 4 Security Group · 5 Launch EC2 · 6 MobaXterm SSH setup · 7 Select PEM key · 8 SSH login & Linux commands · 9 NGINX & troubleshooting. Autoplay runs every 5 seconds with Play/Pause, Reset, Previous/Next, Beginner/Technical mode and Light/Dark theme.

## MobaXterm + PEM (most important part)
Remote host `<EC2-PUBLIC-IP>` · Specify username ✓ `ec2-user` · Port `22` · Advanced SSH settings → **Use private key** ✓ → Browse → `cloud-messenger-key.pem`.
MobaXterm accepts OpenSSH-compatible keys, so **no PuTTYgen / PPK conversion is needed** for a standard AWS PEM. Reference screenshots are in `assets/mobaxterm/`. Note: the screenshots use username `ubuntu` (Ubuntu AMIs) and one shows a `.ppk`; for Amazon Linux use `ec2-user` and the `.pem`.

## Amazon Linux deployment commands
```bash
sudo dnf update -y
sudo dnf install git nginx -y
git clone https://github.com/Cloud-Messenger/amazon-linux-mobaxterm-visual.git
sudo cp -r amazon-linux-mobaxterm-visual/* /var/www/html/
sudo systemctl enable --now nginx
```
Open TCP 80 in the Security Group. Note: the default NGINX package serves `/usr/share/nginx/html`; either copy there or set `root /var/www/html;` in the server block and run `sudo nginx -t && sudo systemctl reload nginx`.

## GitHub Pages
Push the repo → Settings → Pages → Deploy from branch `main` / root. GitHub Pages hosts this **visualization**; the real NGINX site runs on your EC2 instance.

## Security best practices
Never commit `.pem`/`.ppk` (they are in `.gitignore`) · SSH from My IP only · least privilege · patch regularly · use HTTPS for production · rotate keys.

## Interview questions
Region vs AZ? · What is an AMI? · Public vs private key? · Why ec2-user? · Timed out vs refused vs publickey? · What does a Security Group do (stateful)? · What does Nitro offload?

See `docs/` for guides. Third-party trademarks remain property of their owners.

Created by **Cloud Messenger™** · https://cloudmessenger.in/ · https://www.linkedin.com/in/ulhas-narwade-aws-certified-devops · https://github.com/Cloud-Messenger · #buildwithCloud-Messenger
© 2026 Cloud Messenger. All rights reserved.
