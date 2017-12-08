import pandas
import json

singleCongestionCache=pandas.DataFrame()

def ImportData():
    print "Importing Single Route Destination Congestion Cache"
    with open("Data/CongestionCache.json",'r') as fp:
        data=json.load(fp)
        return data

def ImportRoute():
    print "Importing Single Route Destination Congestion Cache"
    with open("Data/detailedRoutes.json",'r') as fp:
        data=json.load(fp)
        return data


if __name__:
    data=ImportData()
    singleCongestionCache=pandas.DataFrame(data=data)
    routes=ImportRoute()
    routesDF=pandas.DataFrame(data=routes)
    print routesDF
    print singleCongestionCache



