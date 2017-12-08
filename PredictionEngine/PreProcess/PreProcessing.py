# #####################
# # This file to preprocess all the data.
# #This is to Cache
# Creating a new table  which has
# Street Name Direction Day Time  AVG(Number of Vehicles)
# Grouped by Every Street, in both Directions, for All days and All Time
# Write that into a Dataframe
# The server can read it into Memory and just give it out
# #####################

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

def GetGroupedFile():
    print "Spark Job to get Grouped File"
    # Need to read A GIVEN CSV into a DATAFRAME
    # 1. Read data into DF:
    #df= sc.wholeTextFiles('/apps/SmartCommute/DataSets/trafficDataSet.json').flatMap(lambda x:json.loads(x[1])).toDF()
    #newDF = df_new.select(df_new["Street Name"], df_new["Directions"], df_new["Day"], df_new["Time"], df_new["Num of Vehicle"]).groupby("Street Name", "Directions", "Day", "Time").avg().sort(df_new["Street Name"], df_new["Directions"], df_new["Day"], df_new["Time"], ascending=True
    #newDF=newDF.toPandas()
    #out = newDF.to_json(orient='records')[1:-1].replace('},{', '} {')


@app.route('/initialize', methods=['GET'])
def initialize():
    global congestionDF
    for i in range(0, len(days)):
        y = pandas.Series(data=['Casa Verde Street', 'San Jose State University', days[i], id_3[i]],
                          index=congestionDFColumns)
        # x=pandas.DataFrame(data=['Casa Verde Street','San Jose State University',days[i],id_3[i]],columns=cols)
        congestionDF = congestionDF.append(y, ignore_index=True)
        print congestionDF
    for i in range(0, 2):
        y = pandas.Series(data=['Alum Rock Park', 'San Jose State University', days[i], id_2[i]],
                          index=congestionDFColumns)
        congestionDF = congestionDF.append(y, ignore_index=True)
        print congestionDF
        response = app.response_class(response="Cache Initialized", status=200)
        return response



@app.route('/getTravelTimeVsTime', methods=['POST'])
def getTravelTimeVsTime():
    data = json.loads(request.data)
    data["Source"] = Places[data["Source"].lower()]
    print "Source:", data["Source"]
    data["Destination"] = Places[data["Destination"].lower()]
    print "Destination:", data["Destination"]
    data["Day"] = Days[data["Day"].lower()]
    print "Day:", data["Day"]
    command = '/home/student/spark-2.2.0-bin-hadoop2.7/bin/spark-submit --packages org.mongodb.spark:mongo-spark-connector_2.11:2.2.0 travelTimevsTime.py ' + "\'" + \
              data["Source"] + "\' \'" + data["Destination"] + "\' \'" + data["Day"] + "\'" + " \'2\'"
    print command
    commands.getoutput(command)
    try:
        with open("get24HourTravelTime.txt", "r") as f:
            response = f.readlines()
        os.remove("get24HourTravelTime.txt")
        response = ast.literal_eval(response[0])
        response = sorted(response, key=lambda k: k['label'])
        print response
        response = app.response_class(response=json.dumps(response), status=200, mimetype='application/json')
        return (response)
    except:
        response = "<h>404 Not Found<\h>"
        response = app.response_class(response=response, status=404)
        return (response)



@app.route('/getCongestionVsTime', methods=['POST'])
def getCongestionVsTime():
    data = json.loads(request.data)
    print data
    try:
        data["Source"] = Places[data["Source"].lower().strip()]
        print "Source:", data["Source"]
        data["Destination"] = Places[data["Destination"].lower().strip()]
        print "Destination:", data["Destination"]
        data["Day"] = Days[data["Day"].lower().strip()]
        print "Day:", data["Day"]
        response = available(data["Source"], data["Destination"], data["Day"],1,1)
        if (response != -1):
            print "Cache HIT!"
            print response
            response = app.response_class(response=json.dumps(response[0]), status=200, mimetype='application/json')
            return (response)
    except:
        response = "<h>Invalid POST Request</h>"
        response = app.response_class(response=response, status=404)
        return (response)

    command = '/home/student/spark-2.2.0-bin-hadoop2.7/bin/spark-submit --packages org.mongodb.spark:mongo-spark-connector_2.11:2.2.0 travelTimevsTime.py ' + "\'" + \
              data["Source"] + "\' \'" + data["Destination"] + "\' \'" + data["Day"] + "\'" + " \'1\'"
    print command
    commands.getoutput(command)
    try:
        with open("get24HourCongestion.txt", "r") as f:
            response = f.readlines()
        f.close()
        os.remove("get24HourCongestion.txt")
        response = ast.literal_eval(response[0])
        response = list(response)

        response = app.response_class(response=json.dumps(response), status=200, mimetype='application/json')
        return (response)
    except:
        response = "<h>404 Not Found</h>"
        response = app.response_class(response=response, status=404)
        return (response)


