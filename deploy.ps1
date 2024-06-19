$newVersion = npm version patch
$envContent = Get-Content -Path .\.env
echo $newVersion
$updatedEnvContent = $envContent -replace '(APP_VERSION=).*', "`$1$newVersion"
echo $updatedEnvContent
$updatedEnvContent | Set-Content -Path .\.env
#git push
#ssh pinkstaging2 "cd /var/www/node_apps/api-auth-service && git pull origin master  && npm install && npm run build && /home/ubuntu/.nvm/versions/node/v21.6.1/bin/pm2 restart api-auth-service"
