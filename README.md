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
        
## Prediction server <br />
## Download the following packages in python virtual env <br />
&emsp; &emsp;  &emsp;     1. pip install json <br />
&emsp; &emsp;  &emsp;     2. pip install configparser <br />
&emsp; &emsp;  &emsp;     3. pip install requests <br />
&emsp; &emsp;  &emsp;     4. pip install pandas <br />
&emsp; &emsp;  &emsp;     5. pip install pyspark <br />
&emsp; &emsp;  &emsp;     6. pip install statsmodels <br />
&emsp; &emsp;  &emsp;     7. pip install sklearn <br />

## To run the DataGeneration <br />
&emsp; &emsp;  &emsp; 	1. Navigate to the smartCommute directory <br />
&emsp; &emsp;  &emsp; 	2. cd PredictionEngine/DataGeneration <br />
&emsp; &emsp;  &emsp; 	3. Edit the config.ini file to add more streets <br />
&emsp; &emsp;  &emsp; 	4. python simulate.py <br />
#### Import script to import data into MFS or MongoDB <br />
&emsp; &emsp;  &emsp;     1. python ImportData.py <br />
&emsp; &emsp;  &emsp;     If importing data to MapR-FS <br />
&emsp; &emsp;  &emsp; &emsp;        i. Enter the source path  <br />
&emsp; &emsp;  &emsp; &emsp;       ii. Enter the destination path <br />
&emsp; &emsp;  &emsp;     If importing data to MongoDB <br />
&emsp; &emsp;  &emsp; &emsp;       i. Enter only the source path <br />
&emsp; &emsp;  &emsp; &emsp;       ii. The file will get imported to dataStore Database <br />
&emsp; &emsp;  &emsp; &emsp;           under trafficDataSet collection <br />

## Backend Server
&emsp; &emsp;  &emsp;     1. cd PredictionEngine/Server <br />
&emsp; &emsp;  &emsp;     2. import FLASK_APP = server.py <br />
&emsp; &emsp;  &emsp;     3. flask run -h 0.0.0.0 <br />
            
## Preprocessing 
&emsp; &emsp;  &emsp;     Ensure your flask server is running. <br />
&emsp; &emsp;  &emsp;     1. cd PredictionEngine/Preprocess <br />
&emsp; &emsp;  &emsp;     2. python Automation.py <br />
&emsp; &emsp;  &emsp;     3. Ensure that Cache.json has the output <br />
   

## Running unit tests 
&emsp; &emsp;  &emsp;     1) cd CMPE295/ <br />
&emsp; &emsp;  &emsp;     2) npm test <br />

## Running Cron Job: 
&emsp; &emsp;  &emsp;     1) Create an account at https://developers.google.com/maps/ <br />
&emsp; &emsp;  &emsp;     2) Enable Google Maps Directions API key at https://developers.google.com/maps/documentation/directions/ <br />
&emsp; &emsp;  &emsp;     3) Copy the generated key and paste it in cronJob.js file in CMPE295/CMPE295-WebAppBackend/routes/ folder on line 2. <br />
&emsp; &emsp;  &emsp;     4) Uncomment line 59 in cronJob.js <br />
&emsp; &emsp;  &emsp;     5) Run the server as described under WebApplication(back-end part) <br />
