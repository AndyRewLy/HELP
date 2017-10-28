class Place(object):
  
   def __init__(self, url, placeId, name, location): 
      self.url = url
      self.placeId = placeId
      self.name = name
      self.location = location

   def toString(self):
      print "{"
      print " url=" + self.url + ","
      print " placeId=" + self.placeId + ","
      print " name=" + self.name + ","
      print " location=" + self.location
      print "}"
