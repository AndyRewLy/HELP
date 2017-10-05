import requests

searchAPIBase = "https://api.yelp.com/v3/businesses/search"
businessAPIBase = "https://api.yelp.com/v3/businesses"

token = "rxJdZ0OGS4CqJ2rpiUym1jJiMylojKD0s-g8zbPbOB2cOkKJL53k5VV849XzcGkM5u8_YH37lFdY2wZvaq5esz7Xr_BBNE9T8aS-luUiPb2yqrDPEy6Pz0ONywDVWXYx"

headers = {'Authorization': 'Bearer ' + token}

def getSearch(location, categories):
   r = requests.get(searchAPIBase + "?location=" + location, headers=headers)
   print searchAPIBase + "?location=" + location

   for business in r.json()["businesses"]:
      businessCategories = business["categories"]
      
      for category in businessCategories:
         
         if category["alias"] in categories:
            print business["id"]

   #print r.json()["businesses"]

def main():

   getSearch("San Luis Obispo", ["coffee"]) 
   print searchAPIBase
   print businessAPIBase
   return 1

main()
