sudo git pull
sudo npm install
sudo npm run build
sudo rm -rf /var/www/html/build
sudo cp -r build /var/www/html/
echo "Build completed"