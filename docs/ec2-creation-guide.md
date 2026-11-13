# EC2 creation guide
1. Console → EC2 → Launch instances. 2. Name Cloud-Messenger-Amazon-Linux. 3. AMI Amazon Linux 2023. 4. Type t3.micro (or free-tier eligible). 5. Create key pair cloud-messenger-key (RSA, .pem). 6. Security group: SSH 22 from My IP, HTTP 80. 7. Launch; wait for 2/2 checks; copy Public IPv4.
