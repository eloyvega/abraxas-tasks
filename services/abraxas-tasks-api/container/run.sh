#!/bin/bash
cd app/
uwsgi --http 0.0.0.0:5000 --module main:flask_app
