import json


def compareUserActivities(user1, user2):
   
   likenessScore = 0

   for like1 in user1.activityLikes:
      for like2 in user2.activityLikes:
         if like1 == like2:
            likenessScore++
         
   return likenessScore

def compareUserFoods(user1, user2):
   
   likenessScore = 0

   for like1 in user1.foodLikes:
      for like2 in user2.foodLikes:
         if like1 == like2:
            likenessScore++
         
   return likenessScore

def createAgglomerateCluster(users):
   userSimilarities = {}  

   for user1 in users:
      userEntry = {}
      for user2 in users:
         userEntry[user2.username] = {'actiity': compareUserActivities(user1, user2), 
                                      'food': compareUserFoods(user1, user2} 
      userSimilarities[user1.username] = userEntry


def main():
      
