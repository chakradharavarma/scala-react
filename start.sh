#/bin/bash

IMAGE_NAME=scala/frontend
CONTAINER_NAME=scala-frontend
docker run  --name $CONTAINER_NAME -p 4000:80 $IMAGE_NAME