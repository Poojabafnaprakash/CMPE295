#this code uses an ensemble of different algorithms
# here we will import the libraries used for machine learning

import json
import re
import pymongo
import urllib
from pymongo import MongoClient
warnings.filterwarnings("ignore", category=DeprecationWarning)
from flask import Flask, render_template, json, request

app = Flask(__name__)

@app.route("/")
def main():
    return render_template('index.html')

@app.route('/find_streets',methods=['POST'])
def streetFinder():
    _from = request.form['from']
    _to = request.form['to']
    #code to get the streets directions grom google api
    #Pooja's code
    #sample json response: 
    json_data = {"Steps":[{"distance":23,"duration":2,"start_location":{"lat":37.3323574,"lng":-121.9122916},"end_location":{"lat":37.2223574,"lng":-121.94522916},"intersection":"W Julian St/W Julian St"},{"distance":23,"duration":2,"start_location":{"lat":37.3323574,"lng":-121.9122916},"end_location":{"lat":37.2223574,"lng":-121.94522916},"intersection":"W Julian St/W James St"}]}
    find_intersect(json_data)

def find_intersect(sample_json):

    json_str = json.dumps(json_string)
    parsed_json = json.loads(json_str)
    steps = parsed_json['Steps']
    for step in steps:
        start_location = step['start_location']
        end_location = step['end_location']
        street_name_main = step['intersection']
        print(street_name_main)
        uri = 'mongodb://dbuser:dbpass@ds127034.mlab.com:27034/smart_route'
        client = MongoClient(uri)
        db = client.get_database()
        node_log = db['Node_lookup']

        street_name_main = street_name_main.split('/')
        street_name_o = street_name_main[1]
        commWord = ['W', 'E', 'S', 'N','ST']
        street_name_o = ' '.join(i for i in street_name_o.upper().split() if i not in commWord)
        street_name_o = street_name_o.strip()
        result = node_log.find({'Intersection': {'$regex' : re.compile('.*(%s)' %street_name_o.upper())}})
        for doc in result:
            print ('Doc is %s ' %(doc['Intersection']))

        # TODO: decide format and add return

if __name__ == "__main__":
    app.run()


