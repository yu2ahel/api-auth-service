$newVersion = npm version patch



# if $newVersion not empty do the next line
if (!([string]::IsNullOrEmpty($newVersion)))
{
    $envContent = Get-Content -Path .\.env
    echo $newVersion
    $updatedEnvContent = $envContent -replace '(APP_VERSION=).*', "`$1$newVersion"
    echo $updatedEnvContent
    $updatedEnvContent | Set-Content -Path .\.env
    ssh pinkstaging2 "cd /var/www/node_apps/api-auth-service &&  sed -i 's/\(APP_VERSION=\).*/\1$newVersion/' .env"
}

git push
ssh pinkstaging2 "cd /var/www/node_apps/api-auth-service && git pull origin master  && npm install && npm run build && /home/ubuntu/.nvm/versions/node/v21.6.1/bin/pm2 restart api-auth-service"
