docker image pull mongo
docker container rm -f $(docker container ls -q --filter name=mongo) 
docker container run --detach  --volume mongodbdata:/data/db --publish 27017:27017 --name  mongo mongo
#docker container start mongo

echo docker image is spinning up .... waiting 5 seconds before attemping to connect our node js script.
sleep 5
nodemon app.js
#node app.js
#docker container exec -it mongo bash
#docker container exec -it mongo mongo 
#docker container exec -it mongo mongo "mongodb+srv://clusterjohnny-m6nxe.mongodb.net/test" --username admin-johnny 

