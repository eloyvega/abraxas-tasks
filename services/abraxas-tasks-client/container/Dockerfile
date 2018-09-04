FROM node:8.11.1

EXPOSE 3000
EXPOSE 9009

ENV APP_HOME /opt/app

ADD app.tar $APP_HOME

WORKDIR $APP_HOME

RUN rm -f package-lock.json
RUN npm install

ENTRYPOINT ["npm", "start"]
