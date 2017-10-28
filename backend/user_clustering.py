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

def main():
   users = [User('chicken', ['chicken'], []),
            User('chicken1', ['chicken', 'running'], []),
            User('natashaeatschickens', ['chicken'], [])]

   user_input = raw_input("Input a user:")
   userSimilarities = createAgglomerateCluster(users)
   (activityUsers, foodUsers) = getHighestComparison(userSimilarities, user_input)

   print activityUsers
   print foodUsers

main()
