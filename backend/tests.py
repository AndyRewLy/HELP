from user import User 
from user_clustering import compareUserActivities, compareUserFoods, createAgglomerateCluster
import unittest 

class TestUserClustering(unittest.TestCase):
    def testCompareUserActivitiesMatch(self):
    	user1 = User("user1", ["hiking", "swimming", "eating"], ["Italian", "Mexican", "dessert"])
    	user2 = User("user2", ["swimming", "crafts", "dinnertheater"], ["Japanese", "Chinese"])

    	likenessScore = 1
        self.assertEqual(likenessScore, compareUserActivities(user1, user2))

    def testCompareUserActivitiesMultipleMatches(self):
    	user1 = User("user1", ["hiking", "swimming", "skydiving", "dinnertheater"], ["Italian", "Mexican", "dessert"])
    	user2 = User("user2", ["swimming", "skydiving", "crafts", "dinnertheater"], ["Japanese", "Chinese"])

    	likenessScore = 3
        self.assertEqual(likenessScore, compareUserActivities(user1, user2))

    def testCompareUserActivitiesNoMatch(self):
    	user1 = User("user1", ["hiking", "swimming", "eating"], ["Italian", "Mexican", "dessert"])
    	user2 = User("user2", ["lacrosse", "crafts", "dinnertheater"], ["Japanese", "Chinese"])

    	likenessScore = 0
        self.assertEqual(likenessScore, compareUserActivities(user1, user2))

    def testCompareUserFoodsMatch(self):
    	user1 = User("user1", ["hiking", "swimming", "eating"], ["Italian", "Mexican", "dessert"])
    	user2 = User("user2", ["swimming", "crafts", "dinnertheater"], ["Italian", "Japanese", "Chinese"])

    	likenessScore = 1
        self.assertEqual(likenessScore, compareUserFoods(user1, user2))

    def testCompareUserFoodsMulitpleMatches(self):
    	user1 = User("user1", ["hiking", "swimming", "eating"], ["Italian", "Mexican", "dessert"])
    	user2 = User("user2", ["swimming", "crafts", "dinnertheater"], ["Italian", "Japanese", "Mexican", "Chinese"])

    	likenessScore = 2
        self.assertEqual(likenessScore, compareUserFoods(user1, user2))

    def testCompareUserFoodsNoMatch(self):
    	user1 = User("user1", ["hiking", "swimming", "eating"], ["Italian", "Mexican", "dessert"])
    	user2 = User("user2", ["swimming", "crafts", "dinnertheater"], ["Mediterranean", "Chinese"])

    	likenessScore = 0
        self.assertEqual(likenessScore, compareUserFoods(user1, user2))

    def testCreateAgglomerateCluster(self):
    	user1 = User("user1", ["hiking", "swimming", "skydiving", "dinnertheater"], ["Italian", "Mexican", "dessert"])
    	user2 = User("user2", ["swimming", "skydiving", "crafts", "dinnertheater"], ["Japanese", "Mexican", "Chinese"])

    	userSimilarities = {'user2': {'user1': {'food': 1, 'activity': 3}}, 
    						'user1': {'user2': {'food': 1, 'activity': 3}}}
    	self.assertDictEqual(userSimilarities, createAgglomerateCluster([user1, user2]))


if __name__ == "__main__":
    unittest.main()
