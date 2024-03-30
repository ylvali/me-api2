<img src="https://scrutinizer-ci.com/g/ylvali/me-api2/badges/quality-score.png?b=main" alt='quality score'><img src="https://scrutinizer-ci.com/g/ylvali/me-api2/badges/coverage.png?b=main" alt='coverage'><img src="https://scrutinizer-ci.com/g/ylvali/me-api2/badges/build.png?b=main" alt='scrutinizer'><img src="https://app.travis-ci.com/ylvali/me-api2.svg?token=zbGBcfgSpBchF7HShAt4&branch=main" alt='travis pass'>

Backend Me-API 
BTH Blekinge technical institute


#JS Application : RESTAPI and framework:
Frontend: https://jsframeworks.ysojs.se/ 
- Angular 

Backend: http://wwww.me-api.ysojs.se 
- Express & Nodejs
- Socket.io 
- Sqlite3 

Previous edition:
https://github.com/ylvali/jsramverk2023edition

New edition frontend: https://github.com/ylvali/jsframeworkProject2024BTHv2
New edition backend: https://github.com/ylvali/jsframeworkProject2024BTH


## Backend 
Backend Nodejs & express
routes/	: in-depth functionality (register users, reports)
app.js 	: base application 

### Install & Run
Install all via npm
npm install
Run the app 
npm start 

## Run via a process manager 
That is kept open without interruption.
pm2 process manager
pm2 start app.js --name me-api

### KEY
Must set a key for the environment : 
$ export JWT_SECRET='secretKey' : or some functionality will not work. 
Can be set in the code as well. 

TOKEN & acces to some features 
To do some updates you need the token as a x-access-token. 
This token is renewed and can be fetched with: 
GET /token (on your running server node app.js).
In for example PostMan use the headers section.
Enter key: x-access-token : value token .
In the code set it as a headers param - x-access-token. 

// Example:
// localhost:8333/users/allUsers
// me-api.ysojs.se/users/allLoggedOn


GET
/ 		            : intro
/hello      	    : hello world
/hello/msg		    : test

/token 		        : token
/reports/week/:nr	: reports per week
/reports/all		: all reports

POST
/report/add		    : add new report (header token & params title & data)
/report/edit		: edit report (header token & params title & data)
/users/allUsers	    : show all users
/users/allLoggedOn	: show all logged on
/users/logout		: logs out all users
/users/register	    : register a new user (body email, password, name, birthday)
/users/login		: login (body email & password)
/verifyToken        : verify the token (header, token)

-- frontendBTH directory --
Frontend Angular
Angular works with components & services, a practical & easy to learn way. Where each page of the website is an own component with a separate file for functionality (ts files), style (css file) and structure (html file). A basic application is created and edited in the src catalog, and new components can be generated with all the code through the CLI command. To the components functionality available to different components (such as AJAX or connecting to an API / database – server). These can be created as services and then dependency injected into a component which makes the functionality available. Angular documentation: 
Src/app 		: application scripts for edit
/about 		    : presentation file
/api-connect	: connect to the api
/form		    : registration through form
/login		    : login component
/report-api		: report-api : fetch the reports in the database
User.ts		    : object for user read in the components
api-call.service: dependency injection for calling the api
login.service 	: dependency injection for login
app.component	: the router view
app.module 		: base application 



