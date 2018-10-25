#/bin/bash

docker build -t scala/ui:latest .
#docker run -p 80:80 -it scala/ui /bin/sh
docker run -it -p 3000:80 scala/ui 