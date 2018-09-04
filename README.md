# Abraxas Tasks
## About
Aplicación de productividad para la gestión de tareas.
![Demo](./tasker.gif)


## Ambiente de desarrollo local
### Requerimientos
- Vagrant: https://www.vagrantup.com/downloads.html
- vagrant-disksize: https://github.com/sprotheroe/vagrant-disksize


### Pasos
- Crear y acceder a la maquina virtual
```
cd vagrant/
vagrant up
vagrant ssh
```


A partir de aquí se asume que todos los comandos se ejecutan dentro de la maquina virtual creada con Vagrant.


- Levantar servicios de desarrollo (solo mongo y mongo express)
```
cd /home/app/services/docker-compose/
sudo ./start-only-develop-services.sh
```


- Crear ambiente de desarrollo para abraxas-tasks-api
```
pyenv install 3.8-dev
cd /home/app/services/abraxas-tasks-api/
pyenv virtualenv 3.8-dev abraxas-tasks-api
pyenv activate abraxas-tasks-api
pip install -r requirements.txt
cd app
export MONGO_URI="mongodb://root:example@192.168.50.4:27017/tasks?authSource=admin"; export MONGO_DB="abraxa-tasks"; python -m main
```

- Ahora el API deberia  estar disponible en esta url: http://192.168.50.4:5000/graphql

- Crear ambiente de desarrollo para abraxas-tasks-client
```
cd /home/app/services/abraxas-tasks-client/
nvm install stable
nvm use stable
npm install
```

- Ahora podemos ejecutar el cual iniciara el servidor de desarrollo, el cual se podra acceder en http://192.168.50.4:3000/
```
export REACT_APP_GRAPHQL_URI="http://192.168.50.4:5000/graphql"; npm start
``` 


- Iniciar servidor de Storybooks y exponerlo en http://192.168.50.4:9009/
```
npm run storybook
```


### Correr analisis de Sonar
- Analizar abraxas-tasks-api
```
cd /home/app/services/abraxas-tasks-api/
sonar-scanner \
  -Dsonar.projectKey=abraxas-tasks-api \
  -Dsonar.sources=app \
  -Dsonar.host.url=${SONAR_HOST_URL} \
  -Dsonar.login=${SONAR_LOGIN}\
  -Dsonar.javascript.file.suffixes=.py \
  -Dsonar.language=py \
  -Dsonar.python.pylint=/usr/local/bin/pylint 
```


- Analizar abraxas-tasks-client
```
cd /home/app/services/abraxas-tasks-client/
sonar-scanner \
    -Dsonar.projectKey=abraxas-tasks-client \
    -Dsonar.sources=. -Dsonar.host.url=${SONAR_HOST_URL} \
    -Dsonar.login=${SONAR_LOGIN} \
    -Dsonar.sources=src \
    -Dsonar.javascript.file.suffixes=.js,.jsx
```


### Desplegar en ambiente de Docker local
```
cd /home/app/services/docker-compose/
sudo ./start-as-dev.sh 
```
