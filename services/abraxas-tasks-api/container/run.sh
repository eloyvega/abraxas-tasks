#!/bin/bash
cd app/
gunicorn main:flask_app -b 0.0.0.0:5000 --workers $WORKERS --timeout 300
