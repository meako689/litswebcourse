#!/bin/bash

activate="./venv/bin/activate";
if [ ! -f $activate ]; then 
	virtualenv venv --python=python3;
fi
source $activate;
pip install -r ./requirements.pip;
bash deploy.sh;

cd newsfront;
npm install;
npm run build;
cd -;
