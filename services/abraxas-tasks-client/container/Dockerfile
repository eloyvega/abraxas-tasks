FROM node:8.11.1

EXPOSE 3000

ENV USER app
ENV APP_HOME /opt/$USER
ENV NODE_ENV production

ADD app.tar $APP_HOME

WORKDIR $APP_HOME

RUN rm -f package-lock.json
RUN npm install

RUN useradd -d $APP_HOME $USER
RUN chown -R $USER:$USER $APP_HOME

USER $USER

ENTRYPOINT ["npm", "start"]
