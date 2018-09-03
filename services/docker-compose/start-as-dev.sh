export REACT_APP_GRAPHQL_URI="http://192.168.50.4:5000/graphql"
export WORKERS="1"
export MONGO_URI="mongodb://root:example@192.168.50.4:27017/tasks?authSource=admin"
export MONGO_DB="abraxa-tasks"
export ABRAXAS_TASKS_CLIENT_IMAGE="abraxas-tasks-client"
export ABRAXAS_TASKS_API_IMAGE="abraxas-tasks-api"

DOCKER_COMPOSE_DIR=$(pwd)

# Create abraxas-tasks-api image

cd ../abraxas-tasks-api/container/
./build.sh abraxas-tasks-api
cd $DOCKER_COMPOSE_DIR

# Create abraxas-tasks-client image
cd ../abraxas-tasks-client/container/
./build.sh abraxas-tasks-client
cd $DOCKER_COMPOSE_DIR

docker-compose up
