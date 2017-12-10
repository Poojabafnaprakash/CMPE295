## WebApplication
To run the front-end part of the application: <br />
&emsp; &emsp;  &emsp;     1) cd CMPE295/ <br />
&emsp; &emsp;  &emsp;     2) cd npm install <br />
&emsp; &emsp;  &emsp;     3) Create an account at https://developers.google.com/maps/ <br />
&emsp; &emsp;  &emsp;     4) Enable Google Maps Directions API key at https://developers.google.com/maps/documentation/directions/ <br />
&emsp; &emsp;  &emsp;     5) Copy the generated key and paste it in directionAPI.js file in CMPE295/CMPE295-WebAppBackend/routes/ folder on line 2. <br />
&emsp; &emsp;  &emsp;     6) Do npm start from terminal <br />
&emsp; &emsp;  &emsp;     7) On browser Navigate to http://localhost:4200/ to view the application.
        
To run the back-end part of the application: <br />
&emsp; &emsp;  &emsp;     1) cd CMPE295/CMPE295-WebAppBackend/ <br />
&emsp; &emsp;  &emsp;     2) npm install <br />
&emsp; &emsp;  &emsp;     3) nodemon start <br />
&emsp; &emsp;  &emsp;     4) The server is running on port 3000 and is available at http://localhost:3000. <br />
        
Configuring MySQL database schema: <br />
&emsp; &emsp;  &emsp;     1) Install MySQL and Sequel Pro or MySQL Workbench <br />
&emsp; &emsp;  &emsp;     2) cd Database/ <br />
&emsp; &emsp;  &emsp;     3) Create a database in MySQL named CMPE295 <br />
&emsp; &emsp;  &emsp;     4) Copy and run all the scripts on Sequel Pro or MySQL Workbench query terminal for the database CMPE295. <br />
&emsp; &emsp;  &emsp;     5) Update the username and password for MySQL in CMPE295/CMPE295-WebAppBackend/routes/mysql.js file on line 7 and 8. <br />    
        
## Prediction server 
## Download the following packages in python virtual env
    1. pip install json
    2. pip install configparser
    3. pip install requests
    4. pip install pandas
    5. pip install pyspark
    6. pip install statsmodels
    7. pip install sklearn

## To run the DataGeneration
	1. Navigate to the smartCommute directory
	2. cd PredictionEngine/DataGeneration
	3. Edit the config.ini file to add more streets
	4. python simulate.py
#### Import script to import data into MFS or MongoDB
    1. python ImportData.py
    If importing data to MapR-FS
        i. Enter the source path 
        ii. Enter the destination path 
    If importing data to MongoDB
        i. Enter only the source path 
        ii. The file will get imported to dataStore Database
            under trafficDataSet collection

## Backend Server
    1. cd PredictionEngine/Server
    2. import FLASK_APP = server.py
    3. flask run -h 0.0.0.0
            
## Preprocessing 
    Ensure your flask server is running.
    1. cd PredictionEngine/Preprocess
    2. python Automation.py
    3. Ensure that Cache.json has the output
   

## Running unit tests 
&emsp; &emsp;  &emsp;     1) cd CMPE295/ <br />
&emsp; &emsp;  &emsp;     2) npm test <br />

## Running Cron Job: 
&emsp; &emsp;  &emsp;     1) Create an account at https://developers.google.com/maps/ <br />
&emsp; &emsp;  &emsp;     2) Enable Google Maps Directions API key at https://developers.google.com/maps/documentation/directions/ <br />
&emsp; &emsp;  &emsp;     3) Copy the generated key and paste it in cronJob.js file in CMPE295/CMPE295-WebAppBackend/routes/ folder on line 2. <br />
&emsp; &emsp;  &emsp;     4) Uncomment line 59 in cronJob.js <br />
&emsp; &emsp;  &emsp;     5) Run the server as described under WebApplication(back-end part) <br />
