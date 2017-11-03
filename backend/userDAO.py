from flask_restful import Resource
from flask import make_response
from flask_jsonpify import jsonify
from .user import *
from .dbConnector import getUser

class UserDAO(Resource):
   """A User representation of the class"""

   def get(self, username):
      #make a database connection here
      users = [User('chicken', ['eating'], ['chinese', 'japanese']),
           User('chicken1', ['eating', 'running'], ['chinese', 'bolivian']),
           User('natashaeatschickens', ['eating', 'fighting'], ['chinese', 'japanese', 'mac'])]
      print(getUser(username))
      return jsonify({'data': getUser(username)})

      #for user in users:
      #  if user.username == username:
      #  	return jsonify(userJSON(user))
      # 
      #return jsonify({'data':{'username': 'invalid username' + username}})
