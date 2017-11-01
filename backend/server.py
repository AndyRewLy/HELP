from flask import Flask, request
from flask_restful import Resource, Api
from json import dumps
from flask_jsonpify import jsonify

from userDAO import UserDAO

app = Flask(__name__)
api = Api(app)

api.add_resource(UserDAO, '/User/<username>')

if __name__ == '__main__':
	app.run(port='5002')
