#/bin/bash

IMAGE_NAME=scala/ui
CONTAINER_NAME=scala-ui
docker run  --name $CONTAINER_NAME -p 4000:80 $IMAGE_NAME