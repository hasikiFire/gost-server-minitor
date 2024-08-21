#!/bin/bash
sudo docker stop gostv3
sudo docker rm gostv3
sudo docker-compose up -d
sudo docker ps  -a
