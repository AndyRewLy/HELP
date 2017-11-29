import os

from flask import Flask, request, render_template, send_from_directory, session
from flask_restful import Resource, Api
from flask_cors import CORS, cross_origin
from json import dumps
from flask_jsonpify import jsonify

from .userDAO import UserDAO, UsersAll, UserRecommendationFood, UserRecommendationActivityCategories, UserRecommendationFoodCategories

#PROJECT_ROOT = os.path.abspath(os.pardir)
#REACT_DIR = PROJECT_ROOT + "\help-react\src"
app = Flask(__name__, static_url_path='')
CORS(app, resources={r"/*": {"origins": "*"}})
api = Api(app)

api.add_resource(UsersAll, '/User/')
api.add_resource(UserDAO, '/User/<username>/')
api.add_resource(UserRecommendationFood, '/User/<username>/recommend/food/<location>/<category>')
api.add_resource(UserRecommendationFoodCategories, '/User/<username>/recommend/food/category')
api.add_resource(UserRecommendationActivityCategories, '/User/<username>/recommend/activity/category')
activeUsers = []


