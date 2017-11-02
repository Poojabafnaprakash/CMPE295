from flask import Flask
from flask import request
import json
import os
import commands

app = Flask(__name__)
@app.route('/')
def hello_world():
    jsonBody = {
    "Summary":{
    "Start": "3700 Casa Verde Street",
     "End" : "San Jose State University",
     "Time": "30 mins",
     "Start Time": "10:00:00"
    },
    "steps":[
             {
                    "Street Name":"E Tasmen Drive",
                    "Direction":"West",
                    "Time":"10:00:00",
                    "Distance Covered":"2.4 mi",
                    "Time taken":"3 mins"
            },
            {
                    "Street Name":"N first street",
                    "Direction":"South",
                    "Distance Covered":"4 mi",
                    "Time taken":"10 mins",
                    "Time":"10:03:00"

            },
            {
                    "Street Name":"87 S",
                    "Direction":"South",
                    "Time":"10:13:00",
                    "Distance Covered":"7 mi",
                    "Time taken":"10 mins"
            }
            ]
    }

    if request.method == "GET":
        print type(jsonBody)
        return str(jsonBody)
    else:
        if request.method == "POST":
            content = request.json
            return content


@app.route('/traffic', methods=['POST'])
def test():
    resp=[{"W Julian St":"65%"},{"W St James St":"34%"},{"N 7th St":"34%"},{"E San Fernando St":"53%"}]
    print type(request.json)
    print request.json
    if request.headers['Content-Type'] == 'application/json':
        return "JSON Message: " + json.dumps(resp)

@app.route('/getCongestion', methods=['POST'])
def getCongestion():
    print type(request.json)
    print request.json
    #print commands.getoutput('sudo /opt/mapr/spark/spark-2.1.0/bin/spark-submit /home/mapr/testdb/pysparkArima.py')
    with open('/home/mapr/testdb/Congestionresult.json', 'r') as fp:
        data = json.load(fp)
    print json.dumps(data)
    if request.headers['Content-Type'] == 'application/json':
        return json.dumps(data)


