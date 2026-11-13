# Troubleshooting
Timed out → path blocked (SG, NACL, route, wrong IP, stopped instance). Refused → host reachable, nothing listening (sshd/nginx down). Permission denied (publickey) → wrong key or username.
Commands: sudo systemctl status sshd | nginx; sudo journalctl -u sshd -n 50; sudo nginx -t; sudo ss -tulpn; curl -I http://localhost; df -h; free -m. All 12 incidents are in the in-app lab.
