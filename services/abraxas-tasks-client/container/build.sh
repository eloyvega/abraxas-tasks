#!/bin/bash
tar --exclude "**node_modules" --exclude ".git/" -cvf app.tar ../
docker build -t $1 .
