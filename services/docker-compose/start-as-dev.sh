export REACT_APP_GRAPHQL_URI="http://192.168.50.4:5000/graphql"
export WORKERS="1"
export MONGO_URI="mongodb://root:example@192.168.50.4:27017/admin"
export MONGO_DB="abraxa-tasks"

DOCKER_COMPOSE_DIR=$(pwd)

# Create abraxas-tasks-api image
cd ../abraxas-tasks-api/container/
./build.sh cd abraxas-tasks-api
cd $DOCKER_COMPOSE_DIR

# Create abraxas-tasks-client image
cd ../abraxas-tasks-client/container/
./build.sh cd abraxas-tasks-client
cd $DOCKER_COMPOSE_DIR

docker-compose up
