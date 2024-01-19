my notes file:
For notes syntax stuff: [notes](https://docs.github.com/en/get-started/writing-on-github/getting-started-with-writing-and-formatting-on-github/basic-writing-and-formatting-syntax)

# Git and Github notes:
When using git, we must add, commit, and then push to get it to github. We can clone from github, and once we have, then we can just pull everything we need. And we can use the VS code interface to deal with merge issues.

# EC2
Need to create an actual server for the webpage through EC2. See https://learn.cs260.click/page/webServers/amazonWebServicesEc2/amazonWebServicesEc2_md for notes on this. The address to the wesite is http://54.234.216.97/. SSH using ssh -i /c/Users/zenit/.ssh/ImHungry.pem ubuntu@54.234.216.97

# Adding security (Caddy and HTTPS)
https://learn.cs260.click/page/webServers/https/https_md
We just ssh into our server, and modify our caddy file to include our new domain name. Domain name was done from these instructions: https://learn.cs260.click/page/webServers/amazonWebServicesRoute53/amazonWebServicesRoute53_md
