# Architecture
Windows laptop → MobaXterm → PEM private key → SSH TCP 22 → Security Group → Amazon Linux 2023 EC2 (on Nitro) → NGINX → HTML/CSS/JS → browser.
Nitro = dedicated hardware cards (network, EBS, security) plus a lightweight KVM-based hypervisor.
