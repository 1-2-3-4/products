# Nicole Kuprienko - Full Stack Homework Assignment

## Goal #1: load the product and inventory data into a database

The database is created with SQLite for the benefit of rapid prototyping, and since we are supporting a small and defined dataset and traffic is presumably low. A MySQL DB would be a better bet for a high volume / large traffic scenario.


## Goal #2: make an HTTP API for the data

This project is using Express to create routes and the back-end for an API. The Express app is running on Port 3001 so as not to interfere with the default port for the front-end. This setup allows the front-end and back-end to be decoupled and run separately. Tests are written with Mocha and Chai.


## Goal #3: make a webpage that displays the data

This project is using React (with create-react-app) to fetch data and display the front-end. A proxy to the port for 3001 in package.json sends non static assets traffic to the API. This is chiefly for development purposes. In a production environment, the API could be hosted on it's own subdomain or a "services" or "api" directory on the site's domain. 


## Instructions

* create the db: `cd` to project root folder and run `sqlite3` to enter the shell. run `.read create.sql` to open connection to the db and import the csv files

* start the express app: `cd` to project root folder and run `npm i && npm start`

* start the react app: `cd` to `frontend` folder and run `npm i && npm start`

* run the API test: `cd` to project root folder and run `npm test`