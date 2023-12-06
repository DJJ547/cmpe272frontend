SERVER_IP="45.56.84.203"

echo "switching to branch main"
git checkout main

echo "building app"
npm run build

echo "deploying files to server"
scp -r build/* root@${SERVER_IP}:/var/www/45.56.84.203/

echo "deployed successfully"