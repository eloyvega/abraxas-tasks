import os
from flask import Flask
from flask_cors import CORS
from flask_graphql import GraphQLView
from mongoengine import connect

from schema import schema

MONGO_DB = os.environ['MONGO_DB']
MONGO_URI = os.environ['MONGO_URI']

connect(MONGO_DB, host=MONGO_URI)

flask_app = Flask(__name__)
CORS(flask_app)
flask_app.debug = True

flask_app.add_url_rule(
    '/graphql',
    view_func=GraphQLView.as_view('graphql', schema=schema, graphiql=True)
)

if __name__ == '__main__':
  flask_app.run(host="0.0.0.0", port="5000")
