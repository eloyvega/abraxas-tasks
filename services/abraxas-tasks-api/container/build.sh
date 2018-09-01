#!/bin/bash   
tar -cvf app.tar ../
docker build -t $1 .
