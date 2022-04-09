#!/bin/bash

rm -r /www/*
cp -r ./assets /www/assets
cp -r ./css /www/css
cp -r ./js /www/js
cp -r ./pages /www/pages
cp ./index.html /www/index.html
nginx -s reload

