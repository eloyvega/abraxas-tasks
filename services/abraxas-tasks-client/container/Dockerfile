FROM node:8.11.1

EXPOSE 3000

ENV APP_HOME /opt/app
ENV NODE_ENV production

ADD app.tar $APP_HOME

WORKDIR $APP_HOME

RUN rm -f package-lock.json
RUN npm install

ENTRYPOINT ["npm", "start"]
