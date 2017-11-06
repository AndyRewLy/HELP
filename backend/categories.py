import json
from dbConnector import *
from pprint import pprint

def getJsonFromFile(fileName):
   with open(fileName) as data_file:
      data = json.load(data_file)

   return data

def categoriesToDB (foodObjects, activeObjects):
    for x in foodObjects:
        putFood(x.get("name"), x.get("alias"), x.get("weights"))
    for x in activeObjects:
        putActivity(x.get("name"), x.get("alias"), x.get("weights"))
    return

def getCategories():
       fileName = "categories.json"
       jsonData = getJsonFromFile(fileName)

       activeParents = ["active", "art"]
       foodParents = ["food", "restaurants"]

       activeCategories = []
       foodCategories = []

       for category in jsonData:
          alias = category["alias"]
          title = category["title"]

          categoryObject = {"alias": alias, "name": title}

          parents = category["parents"]

          for parent in parents:
             if parent in activeParents:
                activeCategories.insert(0, categoryObject)
             elif parent in foodParents:
                foodCategories.insert(0, categoryObject)

       activeObjects = []
       foodObjects = []

       for category1 in activeCategories:
          alias = category1["alias"]
          name = category1["name"]
          relationList = []

          for category2 in activeCategories:
              newRelation = {category2["alias"]: 0, "name": category2["name"]}
              relationList.insert(0, newRelation)

          activeObjects.insert(0, {"alias": alias, "name" : name, "weights": relationList})

       for category1 in foodCategories:
          alias = category1["alias"]
          name = category1["name"]
          relationList = []

          for category2 in foodCategories:
              newRelation = {category2["alias"]: 0, "name": category2["name"]}

              relationList.insert(0, newRelation)

          foodObjects.insert(0, {"alias": alias, "name": name, "weights": relationList})
          return (foodObjects, activeObjects)
