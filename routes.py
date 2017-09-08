#this code uses an ensemble of different algorithms
# here we will import the libraries used for machine learning
import re
import numpy as np
import pandas as pd
import urllib

from pymongo import MongoClient

# Convert text to vector
from sklearn.feature_extraction.text import CountVectorizer
import warnings
warnings.filterwarnings("ignore", category=DeprecationWarning)

from flask import Flask, render_template, json, request
app = Flask(__name__)

# read the posted values from the UI
#_from = request.form['from']
#_to = request.form['to']

# uri to connect mongodb
json_string = {"Steps":[{"distance":23,"duration":2,"start_location":{"lat":37.3323574,"lng":-121.9122916},"end_location":{"lat":37.2223574,"lng":-121.94522916},"intersection":"W Julian St/W Julian St"},{"distance":23,"duration":2,"start_location":{"lat":37.3323574,"lng":-121.9122916},"end_location":{"lat":37.2223574,"lng":-121.94522916},"intersection":"W Julian St/W James St"}]}

import json
import re
import pymongo
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
	speed_info = db['Speed_Info']
	node_log = db['Node_lookup']
	street_name = 'BYINGTON'
	street_name_main = street_name_main.split('/')
	street_name_o = street_name_main[1]
	print('now name is %s' %street_name_main)
	commWord = ['W', 'E', 'S', 'N','ST']
	street_name_o = ' '.join(i for i in street_name_o.upper().split() if i not in commWord)
	street_name_o = street_name_o.strip()
	result = node_log.find({'Intersection': {'$regex' : re.compile('.*(%s)' %street_name_o.upper())}})
	for doc in result:
		print ('Doc is %s ' %(doc['Intersection']))

	#print(single_street(start_location, end_location, street_name))

def single_street(start_location, end_location, street_name):

	uri = 'mongodb://dbuser:dbpass@ds127034.mlab.com:27034/smart_route'
	client = MongoClient(uri)
	db = client.get_default_database()
	speed_info = db['Speed_Info']
	node_log = db[' Node_lookup']
	result = node_log.find({"Intersection" : /*SANTA*/i});

	cursor = speed_info.find({'OBJECTID': {'$lte': 4}}).sort('OBJECTID', 1)

	for doc in cursor:
		print ('Doc is %s ' %(doc['STREET']))
