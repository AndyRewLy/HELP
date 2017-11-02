import os

from flask import Flask, request, render_template, send_from_directory, session
from flask_restful import Resource, Api
from flask_cors import CORS, cross_origin
from json import dumps
from flask_jsonpify import jsonify

from .userDAO import UserDAO

#PROJECT_ROOT = os.path.abspath(os.pardir)
#REACT_DIR = PROJECT_ROOT + "\help-react\src"
app = Flask(__name__, static_url_path='')
CORS(app)
api = Api(app)

api.add_resource(UserDAO, '/User/<username>')
activeUsers = []

@app.route('/')
def index():
   if not session.get('logged_in'):
      return render_template('login.html') 
   return render_template("index.html")
   
@app.route('/templates/<path:path>')
def send_js(path):

   return send_from_directory('templates', path)