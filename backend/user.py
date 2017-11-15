class User():
   """A User representation of the class"""

   def __init__(self, username, activityLikes, foodLikes):
      self.username = username
      self.activityLikes = activityLikes
      self.foodLikes = foodLikes


def userJSON(user):
   return {'username': user.username,
   	       'activityLikes': user.activityLikes,
   	       'foodLikes': user.foodLikes}

def jsonToUser(userJson):
	return User(userJson["username"], userJson["activityLikes"], userJson["foodLikes"])
