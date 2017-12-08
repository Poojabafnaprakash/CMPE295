#####################
# This file is used to call Make POST calls to the server and Store the Response.
#This is to Cache
#####################

import json
import requests
data = open('detailedRoutes.json')
routes = json.load(data)
print routes
with open("Cache.json", "w") as myfile:
    myfile.write("[")
myfile.close()

days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday','Sunday']
time=["00:00:00","07:00:00","09:00:00","14:00:00","17:00:00","19:00:00","21:00:00"]
for route in routes:
    body={}
    body["Source"]=route['Source']
    body["Destination"]=route['Destination']
    for day in days:
        body["Day"]=day
        for hour in time:
            body["Time"]=hour
            print body
            resp = requests.post("http://130.65.159.175:5000/getCongestion",json=body)
            body["Response"]=json.loads(resp.content)
            with open("Cache.json", "a") as myfile:
                json.dump(body, myfile)
                myfile.write(",")
            myfile.close()

with open("Cache.json", "a") as myfile:
    myfile.write("]")
myfile.close()


