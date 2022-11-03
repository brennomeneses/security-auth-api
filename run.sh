#!/bin/bash

clear
printf "Installing dependacies: ..."
printf "Installing dependacies: git"
sudo apt install -y git

printf "Installing dependacies: nodejs and npm"
sudo apt install -y node npm

printf "Installing dependacies: PostgeSQL database"
sudo apt install postgresql-12

clear
printf "Cloning the repository"
git clone -b build https://github.com/brennomeneses/security-auth-api.git

printf "Installing project dependacies"
cd security-auth-api
npm install

printf "generating .env file"
touch 'DATABASE_URL="postgresql://postgres:umasenha@localhost:5432/seguranca?schema=public"' > .env

clear
printf "running postinstall scrips"
npm run generate

npm run build

NC='\033[0m'
GREEN = '\033[1;32m'
printf "All ready!! run ${GREEN}'node dist/index.js'${NC} to run the project "
