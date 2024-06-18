ssh pinkstaging2 "cd /var/www/node_apps/api-auth-service && git pull origin master && npm install && /home/ubuntu/.nvm/versions/node/v21.6.1/bin/pm2 restart api-auth-service"
