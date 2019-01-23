# Docker Python App   
* memo
 - python version:
 - resources allocation:
	- cpu
	- ram
 - Run time set
 - Warning, Error catch System
 - Result Print => stdout

 Running Command
 docker build --tag sendbox .
 docker run sendbox

Docker delete <none> images
docker image prune
docker rmi -f <image_id> 


Docker image save / load
docker save sendbox > sendbox.tar
docker load --input sendbox.tar