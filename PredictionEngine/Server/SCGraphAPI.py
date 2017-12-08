import json
import pandas
def getID(jsonRequest):
    #with open('/Users/Anushavijay/PycharmProjects/smartRoute-ARIMA/SmartCommute/detailedRoutes.json') as fp:
    with open('Data/detailedRoutes.json') as fp:
        routeDetails = json.load(fp)
        fp.close()
    RouteDetails = pandas.DataFrame(data=routeDetails)
    print jsonRequest["Source"]
    print jsonRequest["Destination"]
    x = RouteDetails[(RouteDetails["Source"] == jsonRequest["Source"]) & (RouteDetails["Destination"] == jsonRequest["Destination"])]
    print x
    if (len(x) == 0):
        exit(-1)
    return int(x['Id'])

def getRoute(id):
    #with open('/Users/Anushavijay/PycharmProjects/smartRoute-ARIMA/SmartCommute/detailedRoutes.json') as fp:
    with open('Data/detailedRoutes.json') as fp:
        routeDetails = json.load(fp)
        fp.close()
    RouteDetails = pandas.DataFrame(data=routeDetails)
    x = RouteDetails[(RouteDetails["Id"] == id)]
    print x
    if (len(x) == 0):
        exit(-1)
    print (x['Steps'])
    return x['Steps'].values[0]


def getTravelTime(id):
    #with open('/Users/Anushavijay/PycharmProjects/smartRoute-ARIMA/SmartCommute/detailedRoutes.json') as fp:
    with open('Data/detailedRoutes.json') as fp:
        routeDetails = json.load(fp)
        fp.close()
    RouteDetails = pandas.DataFrame(data=routeDetails)
    x = RouteDetails[(RouteDetails["Id"] == id)]
    print x
    if (len(x) == 0):
        exit(-1)
    print (x['Travel Time'])
    print x['Travel Time'].values[0]
    print str(x['Travel Time'])
    return str(x['Travel Time'].values[0])


def filterGraph(jsonBody,type,df):
    if(type==1):
        print "Getting Congestion Rate for 24hours"



def get24HourCongestion(route,day):
    #with open('/Users/Anushavijay/PycharmProjects/smartRoute-ARIMA/SmartCommute/htw.json', 'r') as fp:
    with open('Data/htw.json') as fp:
        avgdata = json.load(fp)
    fp.close()
    columns = ['Street Name', 'Directions', 'Day', 'Time', 'avg(Num of Vehicle)']
    GraphCongestionData = pandas.DataFrame(data=avgdata, columns=columns)
    print GraphCongestionData.shape
    if (GraphCongestionData.shape[0] > 0):
        print "Import Finished and Cached"
    else:
        print "Something Went Wrong. Try Again"

    response={}
    dfRoutes = GraphCongestionData
    for i in range(0,24):
        if(i<10):
            key="0"+str(i)+":00:00"
        else:
            key = str(i) + ":00:00"
        response[key]=0.0
    for item in route:
        streetName = item["Street"]
        direction = item["Direction"]
        streetDF = dfRoutes[(dfRoutes["Street Name"] == streetName.lower()) & (dfRoutes["Directions"] == direction) & (dfRoutes["Day"] == day)]
        rows=streetDF[["Time","avg(Num of Vehicle)"]]
        rows=[tuple(x) for x in rows.to_records(index=False)]
        for row in rows:
            x = ((response[row[0]]+row[1])/2)
            response[row[0]] = round(x,2)
    print response
    temp={}
    x=[]
    for k, v in response.iteritems():
        temp["label"] = k[0:2]
        temp["value"] = v
        x.append(temp.copy())
    x = sorted(x, key=lambda k: k['label'])
    print x
    return x




def get24HourTravelTime(route,day,travelTime):
    #with open('/Users/Anushavijay/PycharmProjects/smartRoute-ARIMA/SmartCommute/htw.json', 'r') as fp:
    with open('Data/htw.json') as fp:
        avgdata = json.load(fp)
    fp.close()
    columns = ['Street Name', 'Directions', 'Day', 'Time', 'avg(Num of Vehicle)']
    GraphCongestionData = pandas.DataFrame(data=avgdata, columns=columns)
    print GraphCongestionData.shape
    if (GraphCongestionData.shape[0] > 0):
        print "Import Finished and Cached"
    else:
        print "Something Went Wrong. Try Again"

    response={}
    dfRoutes = GraphCongestionData
    for i in range(0,24):
        if(i<10):
            key="0"+str(i)+":00:00"
        else:
            key = str(i) + ":00:00"
        response[key]=0.0
    for item in route:
        streetName = item["Street"]
        direction = item["Direction"]
        streetDF = dfRoutes[(dfRoutes["Street Name"] == streetName.lower()) & (dfRoutes["Directions"] == direction) & (dfRoutes["Day"] == day)]
        rows=streetDF[["Time","avg(Num of Vehicle)"]]
        rows=[tuple(x) for x in rows.to_records(index=False)]
        for row in rows:
            x = ((response[row[0]]+row[1])/2)
            response[row[0]] = round(x,2)
    print response
    travelTime = [int(s) for s in travelTime.split() if s.isdigit()]
    travelTime = travelTime[0]
    for k, v in response.iteritems():
        t = travelTime
        if (v > 50.00):
            t = travelTime + ((v / 100) * t)
        response[k] = round(t, 2)
    temp={}
    x=[]
    for k, v in response.iteritems():
        temp["label"] = k[0:2]
        temp["value"] = v
        x.append(temp.copy())
    x = sorted(x, key=lambda k: k['label'])
    print x
    return x


def getCongestionPerStreet(request):
    print request
    print request["Time"]
    response=[]
    dayResponse={}
    #with open('/Users/Anushavijay/PycharmProjects/smartRoute-ARIMA/SmartCommute/htw.json', 'r') as fp:
    with open('Data/htw.json') as fp:
        avgdata = json.load(fp)
    fp.close()
    columns = ['Street Name', 'Directions', 'Day', 'Time', 'avg(Num of Vehicle)']
    dfRoutes = pandas.DataFrame(data=avgdata, columns=columns)
    Days = ['Sunday', 'Monday','Tuesday','Wednesday','Thursday','Friday','Saturday']
    for day in Days:
        streetDF = dfRoutes[
            (dfRoutes["Street Name"] == request["Street"].lower()) &
            (dfRoutes["Directions"] == request["Direction"]) &
            (dfRoutes["Day"] == day)&
            (dfRoutes["Time"] == request["Time"])
        ]
        print streetDF[["Day","avg(Num of Vehicle)"]]
        dayResponse["value"] = (round(streetDF["avg(Num of Vehicle)"].values[0],2))
        dayResponse["label"] = day
        response.append(dayResponse.copy())
    print response
    return response



def main(request,type):
    print "Importing Preprocessed Data for Graph API's"
    if(type=='Congestion'):
        id = getID(request)
        Steps = getRoute(id)
        response = get24HourCongestion(Steps,request["Day"])
        return response
    elif (type=='Time'):
        id = getID(request)
        Steps = getRoute(id)
        travelTime=getTravelTime(id)
        response = get24HourTravelTime(Steps,request["Day"],travelTime)
        return response
    else:
        response=getCongestionPerStreet(request)
        return response








