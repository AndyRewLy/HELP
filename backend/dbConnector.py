import boto3

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
'''
def putUser(username, activityLikes, foodLikes):
    table = dynamodb.Table('HELPusers')

    table.put_item(
       Item = {
            'username': username,
            'activityLikes': activityLikes,
            'foodLikes' : foodLikes
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
  
    #print(item)
    return getResponseItem(response)

'''
Accepts a cateogryName as a string, categoryAlias as a string, and a list of maps of other category preferences
map exaple: {'swim' : 3, 'kayak : 4'}
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

    #print(item)
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

    #print(item)
    return getResponseItem(response)

def getResponseItem(response):
    if 'Item' in response.keys():
       item = response['Item']
       print(item)
    else:
        item = {}
    return item