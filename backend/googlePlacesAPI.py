import requests, googleplaces
from Place import Place 

#APIKey location - MUST CHANGE THIS TO YOUR FILE DIRECTORY
googlePlacesKeyFile = "/Users/nlcortez/Documents/SchoolWork/2017-2018/Fall2017/CPE480/HELP/googlePlacesAPIKey.txt"
googlePlacesFile = open(googlePlacesKeyFile, "r") 
token = googlePlacesFile.readline()
key_text = "&key=" + token 

#URLS
textSearchAPIBase = "https://maps.googleapis.com/maps/api/place/textsearch/json?"
nearbySearchAPIBase = "https://maps.googleapis.com/maps/api/place/nearbysearch/json?"
placeAPIBase = "https://maps.googleapis.com/maps/api/place/details/json?"

#AAuthorization token and header
headers = {'Authorization': 'Bearer ' + token}

'''
	Function that gets information of a specific 
	place based on its id 
'''
def getPlace(placeId): 
	url = placeAPIBase + "placeid=" + placeId + key_text

	response = requests.get(url) 

	placeJson = response.json() 
	placeInfo = Place(placeJson["result"]["url"], 
					  placeJson["result"]["id"],
					  placeJson["result"]["name"], 
					  "TEST")
	placeInfo.toString()

	return placeInfo

'''
	Function that returns the latitude and longitued 
	of the user's current location 
'''
def getCurrentLocation(query):
	url = textSearchAPIBase + "query=" + space_to_plus(query) + key_text

	response = requests.get(url)

	placeJson = response.json()
	latitude = placeJson["results"][0]["geometry"]["location"]["lat"]
	longitude = placeJson["results"][0]["geometry"]["location"]["lng"]
	return str(latitude) + ", " + str(longitude)

'''
	Function that return nearby places
'''
def getNearbyPlaces(location):
	places = []
	curLocation = getCurrentLocation(location)
	url = nearbySearchAPIBase + "location=" + curLocation + "&radius=5000" +  key_text

	response = requests.get(url)

	placesJson = response.json() 
	for place in placesJson["results"]:
		places.append(place["place_id"])

	return places

def space_to_plus(query): 
	new_query = query 
	new_query.replace(' ', '+')
	return query

def main():
   print "Enter a location"
   location = raw_input()
   
   #getPlace(placeId)   
   getNearbyPlaces(location)
   return 1

main()