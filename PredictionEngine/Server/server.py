from flask import Flask
from flask import request
import json
import os
import pandas
import ast
import commands
from singleCongestionData import routeCongestionDF
singleCongestionDF = routeCongestionDF
from Congestionvs24hoursCache import congestionDF
import SCGraphAPI
from InitializeCache import singleCongestionCache
from InitializeCache import routesDF

days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']

Places = {
    'mineta san jose international airport': 'Mineta San Jose International Airport',
    'casa verde street': 'Casa Verde Street',
    'avaya stadium': 'Avaya Stadium',
    'san jose state university': 'San Jose State University',
    'dmv san jose': 'DMV San Jose',
    'mapr technologies, 350 holger way': 'MapR Technologies, 350 Holger Way',
    'winchester mystery house': 'Winchester Mystery House',
    'n 1st street':'N 1st Street',
    "santana row":'Santana Row',
    "alum rock park":"Alum Rock Park",
    "costco wholesale, 1709 automation pkwy, san jose, ca 95131":"Costco Wholesale, 1709 Automation Pkwy, San Jose, CA 95131",
    "downtown san jose":"Downtown San Jose",
    "1302,the alameda":"1302,The Alameda"
}

Days = {
    'monday': 'Monday',
    'tuesday': 'Tuesday',
    'wednesday': 'Wednesday',
    'thursday': 'Thursday',
    'friday': 'Friday',
    'saturday': 'Saturday',
    'sunday': 'Sunday'
}


congestionDFColumns = ['Source', 'Destination', 'Day', 'Response']

app = Flask(__name__)
def available(Source, Destination, Day, Type, Time):
    print "Checking Cache"
    global congestionDF
    #global singleCongestionDF
    if Type == 1:
        y = congestionDF[(congestionDF['Source'] == Source) &
                         (congestionDF['Destination'] == Destination) &
                         (congestionDF['Day'] == Day)]
        if y.shape[0] == 1:
            return list(y['Response'])
        else:
            return -1
    if Type == 2:
        #print singleCongestionCache
        tempDF = singleCongestionCache[(singleCongestionCache['Source'] == Source) &
                                    (singleCongestionCache['Destination'] == Destination) &
                                    (singleCongestionCache['Day'] == Day) &
                                    (singleCongestionCache['Time'] == Time)]
        print tempDF
        if tempDF.shape[0] > 0:
            print tempDF['Response']
            return tempDF['Response'].iloc[0]
        else:
            return -1


@app.route('/getCongestion', methods=['POST'])
def getCongestion():
    data = json.loads(request.data)
    print type(data)
    data['Source'] = Places[data['Source'].lower()]
    data['Destination'] = Places[data['Destination'].lower()]
    data['Day']=Days[data['Day'].lower()]
    print "Checking Cache"
    storedCache=available(data['Source'],data['Destination'],data['Day'],2,data['Time'])
    print "Stored:",storedCache
    if storedCache != -1:
        response = app.response_class(response=json.dumps(storedCache), status=200, mimetype='application/json')
        return (response)
    else:
        print "Executing spark process"
        command = '/home/student/spark-2.2.0-bin-hadoop2.7/bin/spark-submit --packages ' \
                  'org.mongodb.spark:mongo-spark-connector_2.11:2.2.0 pysparkArima.py ' + "\'" + \
                  data['Source'] + "\' \'" + data["Destination"] + "\' \'" + data["Time"] + "\' \'" + data["Day"] + "\'"
        print commands.getoutput(command)
        try:
            with open('Congestionresult.json', 'r') as f:
                print "Opened Successfully"
                response = f.readlines()
            f.close()
            os.remove('Congestionresult.json')
            print response
            response = ast.literal_eval(response[0])
            response = list(response)
            print "This is the response we are trying to send"
            print response
            response = app.response_class(response=json.dumps(response), status=200, mimetype='application/json')
            return (response)
        except:
            response = "<h>404 Not Found</h>"
            response = app.response_class(response=response, status=404)
            return (response)

@app.route('/getCongestionVsTime', methods=['POST'])
def getCongestionVsTime():
    data = json.loads(request.data)
    data["Source"] = Places[data["Source"].lower()]
    data["Destination"] = Places[data["Destination"].lower()]
    data["Day"] = Days[data["Day"].lower()]
    print data

    try:
        response=SCGraphAPI.main(data,"Congestion")
        response = app.response_class(response=json.dumps(response), status=200, mimetype='application/json')
        return response
    except:
        response = "<h>404 Not Found</h>"
        response = app.response_class(response=response, status=404)
        return (response)



@app.route('/getTravelTimeVsTime', methods=['POST'])
def getTravelTimeVsTime():
    data = json.loads(request.data)
    data["Source"] = Places[data["Source"].lower()]
    data["Destination"] = Places[data["Destination"].lower()]
    data["Day"] = Days[data["Day"].lower()]
    print data

    try:
        response=SCGraphAPI.main(data,"Time")
        response = app.response_class(response=json.dumps(response), status=200, mimetype='application/json')
        return response
    except:
        response = "<h>404 Not Found</h>"
        response = app.response_class(response=response, status=404)
        return (response)


Directions = {"north": "North", "south": "South", "east": "East", "west": "West"}

@app.route('/CongestionPerStreet', methods=['POST'])
def CongestionPerStreetTime():
    data = json.loads(request.data)
    print data
    print type(data)
    data["Street"] = data["Street"].lower()
    data["Direction"] = Directions[data["Direction"].lower()]
    print data
    try:
        response=SCGraphAPI.main(data,"StreetCongestion")
        response = app.response_class(response=json.dumps(response), status=200, mimetype='application/json')
        return response
    except:
        response = "<h>404 Not Found</h>"
        response = app.response_class(response=response, status=404)
        return (response)

def getRoute(Source,Destination):
    temp=routesDF[(routesDF['Source'] == Source) &
                         (routesDF['Destination'] == Destination)]
    return temp['Steps'].values[0]

@app.route('/CongestionBlockView', methods=['POST'])
def CongestionBlock():
    data = json.loads(request.data)
    data["Source"] = Places[data["Source"].lower()]
    data["Destination"] = Places[data["Destination"].lower()]
    data["Day1"] = Days[data["Day1"].lower()]
    data["Day2"] = Days[data["Day2"].lower()]
    print data
    streetName = []
    Direction = []
    CongestionRate = []

    try:
        route = getRoute(data["Source"],data["Destination"])
        print route
        for item in route:
            streetName.append(item["Street"])
            Direction.append(item["Direction"])
        print streetName
        print Direction
        resp1=[]
        resp2=[]
        response1=available(data["Source"],data["Destination"],data["Day1"],2,data["Time1"])
        for item in response1:
            resp1.append(item["CongestionRate"])
        response2=available(data["Source"],data["Destination"],data["Day2"],2,data["Time2"])
        for item in response2:
            resp2.append(item["CongestionRate"])
        finalResponse=[]
        response={}
        response["streetName"] = streetName
        response["direction"] = Direction
        response["congestionRate"] = resp1
        print response
        finalResponse.append(response.copy())
        response["congestionRate"] = resp2
        finalResponse.append(response.copy())
        print finalResponse
        response = app.response_class(response=json.dumps(finalResponse), status=200, mimetype='application/json')
        return response
    except:
        response = "<h>404 Not Found</h>"
        response = app.response_class(response=response, status=404)
        return (response)



@app.route('/testSingleCache', methods=['GET'])
def TestSingleCache():
    print singleCongestionCache
    if(singleCongestionCache.shape[0]!=0):
        return "Cache Initialized"
    else:
        return "Check Cache"

if __name__ == "__main__":
    app.run()





