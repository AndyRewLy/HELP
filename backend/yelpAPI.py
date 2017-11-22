import requests
from .business import Business

#APIKey location - MUST CHANGE THIS TO YOUR FILE DIRECTORY
yelpKeyFile = "/Users/nlcortez/Documents/SchoolWork/2017-2018/Fall2017/CPE480/HELP/yelpAPIKey.txt"
yelpFile = open(yelpKeyFile, "r")
token = yelpFile.readline()

#VAPI URLs
searchAPIBase = "https://api.yelp.com/v3/businesses/search?"
businessAPIBase = "https://api.yelp.com/v3/businesses"

#AAuthorization token and header
headers = {'Authorization': 'Bearer ' + token}

'''Function that gets information of a specific
   business based on their id
'''
def getBusiness(restaurantId):
   url = businessAPIBase + "/" + restaurantId
   
   response = requests.get(url, headers=headers)

   businessJson = response.json()
   businessInfo = Business(businessJson["url"], 
                           businessJson["id"],
                           businessJson["name"],
                           businessJson["image_url"],
                           businessJson["price"],
                           businessJson["rating"],
                           businessJson["categories"],
                           " ".join(businessJson["location"]["display_address"]))
   businessInfo.toString()

   return businessInfo 

''' Function that prints out the business id of
    all businesses basd on location and category
'''
def getSearch(location, categories, longitude = None, latitude = None):
   limit = 50
   url = searchAPIBase + "location=" + location + "&limit=5&categories=" + categories[0]
   r = requests.get(url , headers=headers)
   businessIds = []
   
   for business in r.json()["businesses"]:
      businessCategories = business["categories"]
      
      for category in businessCategories:
         
         if category["alias"] in categories:
            businessIds.append(business["id"])

   return businessIds