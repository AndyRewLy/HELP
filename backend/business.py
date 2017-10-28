class Business(object):
  
   def __init__(self, url, busId, name, image_url, price, rating, categories, location): 
      self.url = url
      self.busId = busId
      self.name = name
      self.image_url = image_url
      self.price = price
      self.rating = rating
      self.categories = categories
      self.location = location

   def toString(self):
      print "{"
      print " url=" + self.url + ","
      print " busId=" + self.busId + ","
      print " name=" + self.name + ","
      print " image_url=" + self.image_url + ","
      print " price=" , self.price, ","
      print " rating=" , self.rating, ","
      print " categories=", self.categories,","
      print " location=" + self.location
      print "}"
