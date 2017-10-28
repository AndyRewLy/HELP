import json
from user import User

def compareUserActivities(user1, user2):
   
   likenessScore = 0

   for like1 in user1.activityLikes:
      for like2 in user2.activityLikes:
         if like1 == like2:
            likenessScore+=1
         
   return likenessScore

def compareUserFoods(user1, user2):
   
   likenessScore = 0

   for like1 in user1.foodLikes:
      for like2 in user2.foodLikes:
         if like1 == like2:
            likenessScore+=1
         
   return likenessScore

def createAgglomerateCluster(users):
   userSimilarities = {}  

   for user1 in users:
      userEntry = {}
      for user2 in users:
         if user1.username != user2.username:
            userEntry[user2.username] = {'activity': compareUserActivities(user1, user2), 
                                         'food': compareUserFoods(user1, user2)} 
      userSimilarities[user1.username] = userEntry

   return userSimilarities

def getHighestComparison(userSimilarities, username):

   matchedActivityUsers = []
   activityMax = 0
   matchedFoodUsers = []
   foodMax = 0
   highestMatch = userSimilarities[username]

   for key, value in highestMatch.items():
      activityValue = value['activity']

      if activityValue > activityMax:
         matchedActivityUsers = [key]
         activityMax = activityValue
      elif activityValue == activityMax and activityValue != 0:
         matchedActivityUsers.append(key)

   for key, value in highestMatch.items():
      foodValue = value['food']

      if foodValue > foodMax:
         matchedFoodUsers = [key]
         foodMax = foodValue
      elif foodValue == foodMax and foodValue != 0:
         matchedFoodUsers.append(key)

   return (matchedActivityUsers, matchedFoodUsers)

#Takes in users (user objects) and activityUsers(usernames only)
def recommendActivities(users, activityUsers, currUser):
   activities = []
   currActivities = []
   for user in users:
      if user.username == currUser:
          currActivities = user.activityLikes
          break
   
   for user in users:
      username = user.username
      if username in activityUsers:
         for activity in user.activityLikes:
            if activity not in activities and activity not in currActivities:
               activities.append(activity)
      
   print activities
   return activities
   
def recommendFoods(users, foodUsers, currUser):
   foods = []
   currFoods = []
   for user in users:
      if user.username == currUser:
          currFoods = user.foodLikes
          break
   
   for user in users:
      username = user.username
      if username in foodUsers:
         for food in user.foodLikes:
            if food not in foods and food not in currFoods:
               foods.append(food)
      
   print foods
   return foods

def main():
   users = [User('chicken', ['eating'], ['chinese', 'japanese']),
            User('chicken1', ['eating', 'running'], ['chinese', 'bolivian']),
            User('natashaeatschickens', ['eating', 'fighting'], ['chinese', 'japanese', 'mac'])]

   user_input = raw_input("Input a user:")
   userSimilarities = createAgglomerateCluster(users)
   (activityUsers, foodUsers) = getHighestComparison(userSimilarities, user_input)

   recommendActivities(users, activityUsers, user_input)
   recommendFoods(users, foodUsers, user_input)
main()
