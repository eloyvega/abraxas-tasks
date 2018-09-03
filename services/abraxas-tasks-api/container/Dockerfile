FROM python:3

RUN apt-get update

ENV USER app
ENV HOME /home/$USER

ADD app.tar $HOME/
ADD run.sh $HOME/

RUN cd $HOME && pip install -r requirements.txt
RUN pip install uwsgi

EXPOSE 5000

WORKDIR $HOME

ENTRYPOINT ["/home/app/run.sh"]
