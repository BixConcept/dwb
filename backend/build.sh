#!/bin/sh

go build
docker build . -t dwb 
docker-compose up 
