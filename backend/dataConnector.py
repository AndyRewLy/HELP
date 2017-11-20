import csv
from .dbConnector import putUser

def putUsersFromData():
    users = []
    foodPrefs = []
    activePrefs = []

    with open('AIData.csv', newline='') as csvfile:
        dataReader = csv.reader(csvfile)
        for row in dataReader:
            activePrefs = row[2].split(",")
            foodPrefs = row[3].split(",")
            users.append([row[1], activePrefs, foodPrefs])

    for user in users:
        putUser(user[0], user[1], user[2])
