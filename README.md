## WebApplication
To run the front-end part of the application: <br />
&nbsp      1) cd CMPE295/ <br />
&emsp       2) cd npm install <br />
&emsp        3) Create an account at https://developers.google.com/maps/ <br />
&emsp        4) Enable Google Maps Directions API key at https://developers.google.com/maps/documentation/directions/ <br />
&emsp        5) Copy the generated key and paste it in directionAPI.js file in CMPE295/CMPE295-WebAppBackend/routes/ folder on line 2. <br />
&emsp        6) Do npm start from terminal <br />
&emsp        7) On browser Navigate to http://localhost:4200/ to view the application.
        
To run the back-end part of the application: <br />
&emsp        1) cd CMPE295/CMPE295-WebAppBackend/ <br />
&emsp        2) npm install <br />
&emsp        3) nodemon start <br />
&emsp       4) The server is running on port 3000 and is available at http://localhost:3000. <br />
        
Configuring MySQL database schema: <br />
&emsp        1) Install MySQL and Sequel Pro or MySQL Workbench <br />
&emsp        2) cd Database/ <br />
&emsp        3) Create a database in MySQL named CMPE295 <br />
&emsp        4) Copy and run all the scripts on Sequel Pro or MySQL Workbench query terminal for the database CMPE295. <br />
&emsp        5) Update the username and password for MySQL in CMPE295/CMPE295-WebAppBackend/routes/mysql.js file on line 7 and 8. <br />    
        
## Prediction server 


## Running unit tests 
&emsp        1) cd CMPE295/ <br />
&emsp        2) npm test <br />

## Running Cron Job: 
&emsp        1) Create an account at https://developers.google.com/maps/ <br />
&emsp        2) Enable Google Maps Directions API key at https://developers.google.com/maps/documentation/directions/ <br />
&emsp        3) Copy the generated key and paste it in cronJob.js file in CMPE295/CMPE295-WebAppBackend/routes/ folder on line 2. <br />
&emsp        4) Uncomment line 59 in cronJob.js
&emsp        5) Run the server as described under WebApplication(back-end part)
