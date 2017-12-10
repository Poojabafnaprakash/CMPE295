## WebApplication
To run the front-end part of the application:
        1) cd CMPE295/ <br />
        2) cd npm install <br />
        3) Create an account at https://developers.google.com/maps/ <br />
        4) Enable Google Maps Directions API key at https://developers.google.com/maps/documentation/directions/ <br />
        5) Copy the generated key and paste it in directionAPI.js file in CMPE295/CMPE295-WebAppBackend/routes/ folder on line 2. <br />
        6) Do npm start from terminal <br />
        7) On browser Navigate to http://localhost:4200/ to view the application.
        
To run the back-end part of the application:
        1) cd CMPE295/CMPE295-WebAppBackend/ <br />
        2) npm install <br />
        3) nodemon start <br />
        4) The server is running on port 3000 and is available at http://localhost:3000. <br />
        
Configuring MySQL database schema:
        1) Install MySQL and Sequel Pro or MySQL Workbench <br />
        2) cd Database/ <br />
        3) Create a database in MySQL named CMPE295 <br />
        4) Copy and run all the scripts on Sequel Pro or MySQL Workbench query terminal for the database CMPE295. <br />
        5) Update the username and password for MySQL in CMPE295/CMPE295-WebAppBackend/routes/mysql.js file on line 7 and 8. <br />    
        
## Prediction server


## Running unit tests
        1) cd CMPE295/ <br />
        2) npm test <br />

## Running Cron Job:
        1) Create an account at https://developers.google.com/maps/ <br />
        2) Enable Google Maps Directions API key at https://developers.google.com/maps/documentation/directions/ <br />
        3) Copy the generated key and paste it in cronJob.js file in CMPE295/CMPE295-WebAppBackend/routes/ folder on line 2. <br />
        4) Uncomment line 59 in cronJob.js
        5) Run the server as described under WebApplication(back-end part)
