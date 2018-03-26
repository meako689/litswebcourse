#!/bin/bash

activate="./venv/bin/activate";
if [ ! -f $activate ]; then 
	virtualenv venv --python=python3;
fi
source $activate;
pip install -r ./requirements.txt;
bash deploy.sh;
npm install;
npm run build;
