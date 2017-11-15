import boto3
from .user import User, jsonToUser
from .categories import *
from collections import namedtuple

dynamodb = boto3.resource('dynamodb')

'''
Function that creates the HELPusers table
Should not be called after the first time
'''
def createTable():
    newtable = dynamodb.create_table(
        TableName='HELPusers',
        KeySchema=[
            {
                'AttributeName': 'username',
                'KeyType': 'HASH'
            }
        ],
        AttributeDefinitions=[
            {
                'AttributeName': 'username',
                'AttributeType': 'S'
            }
        ],
        ProvisionedThroughput={
            'ReadCapacityUnits': 1,
            'WriteCapacityUnits': 1
        }
    )

    newtable.meta.client.get_waiter('table_exists').wait(TableName='HELPusers')
    print(newtable.item_count)

'''
Accepts a username as a string, as well as a map of preferences
map example: {'swim' : 3, 'kayak' : 4}
If only a username is provided, all preferences will default to zero
'''
def putUser(username, activityLikes = None, foodLikes = None):
    from categories import getCategories
    table = dynamodb.Table('HELPusers')

    if (activityLikes is None and foodLikes is None):
        activityLikes = []
        foodLikes = []
        #(activeCategories, foodCategories) = getCategories()
        #(activityLikes, foodLikes) = getPreferences(activeCategories, foodCategories)

    table.put_item(
       Item = {
            'username': username,
            'activityLikes': activityLikes,
            'foodLikes': foodLikes
        }
    )

'''
Returns the user from the username given in a json array
'''
def getUser(username):
    table = dynamodb.Table('HELPusers')

    response = table.get_item (
       Key = {
            'username': username,
        }
    )

    responseItem = getResponseItem(response)
    if (bool(responseItem)):
       print(jsonToUser(responseItem))

    return responseItem

'''
Returns all possible users in the database
There is a memory limit on this so if there are too many users,
all users may not be returned --> WIP
'''
def getAllUsers():
    table = dynamodb.Table('HELPusers')

    response = table.scan()
    responseItem = getResponseItems(response)
    users = []

    for user in responseItem:
        users.append(jsonToUser(user))

    return responseItem


'''
To intialize all the preferences in the database
'''
def categoriesToDB (foodObjects, activeObjects):
    for x in foodObjects:
        putFood(x.get("name"), x.get("alias"), x.get("weights"))
    for x in activeObjects:
        putActivity(x.get("name"), x.get("alias"), x.get("weights"))
    return


'''
Accepts a cateogryName as a string, categoryAlias as a string, and a list of maps of other category preferences
map example: {'swim' : 3, 'kayak : 4'}
'''
def putActivity(categoryName, categoryAlias, categoryWeights):
    table = dynamodb.Table('Actvities')

    table.put_item (
        Item = {
            'Name' : categoryName,
            'categoryAlias' : categoryAlias,
            'categoryWeights' : categoryWeights
        }
    )

def getActivity(categoryName, categoryAlias, categoryWeights):
    table = dynamodb.Table('Activities')

    response = table.get_item (
        Key = {
            'categoryName' : categoryName
        }
    )

    return getResponseItem(response)

def putFood(categoryName, categoryAlias, categoryWeights):
    table = dynamodb.Table('Foods')

    table.put_item (
        Item = {
            'Name' : categoryName,
            'categoryAlias' : categoryAlias,
            'categoryWeights' : categoryWeights
        }
    )

def getFood(categoryName, categoryAlias, categoryWeights):
    table = dynamodb.Table('Foods')

    response = table.get_item (
        Key = {
            'categoryName' : categoryName
        }
    )

    return getResponseItem(response)

def getResponseItem(response):
    if 'Item' in response.keys():
       item = response['Item']
    else:
        item = {}

    return item

def getResponseItems(response):
    if 'Items' in response.keys():
       items = response['Items']
    else:
        items = []

    return items
