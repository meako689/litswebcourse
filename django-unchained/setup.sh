#!/bin/bash

activate="./venv/bin/activate";
if [ ! -f $activate ]; then 
	virtualenv venv --python=python3;
fi
source $activate;
pip install -r ./newstalk/requirements.pip;
python newstalk/manage.py migrate;

cd newsfront;
npm install;
npm run build;
cd -;


