/*jshint esversion: 6 */

var express = require('express');
var router = express.Router();

// Enable to send req.body (request body) med POST
// till exempel via Postman
// Parse the extra params with PUT/POST/DELETE
const bodyParser = require("body-parser");
router.use(bodyParser.json()); // for parsing application/json
router.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

// Use database & run it
//const sqlite3 = require('sqlite3').verbose();
//const db = new sqlite3.Database('./db/tests.sqlite');

// Use a testdb if in test mode 
const db = require("../db/database.js");
// console.log(db);


// Crypting passwords
const bcrypt = require('bcryptjs');
const saltRounds = 5; // The more rounds, the more difficult password

/* Available routes 
/               - register a user
/allUsers       - show all users
/allLoggedOn    - show all logged on users
/logOut         - Log out all
/register       - register a user 
    (required: email & password | optional: name & birthday)
/login          - login a user: email & password
    (required: email & password 
*/


// Show all users
// Guide & inspiration: https://developerhowto.com/2018/12/29/build-a-rest-api-with-node-js-and-express-js/
router.post('/allUsers', function(req, res, next) {
    console.log('Show all users');
    var theSql;
    var params;

    theSql = 'SELECT * FROM users';
    params = [];
    db.all(theSql, params, (err, rows)=> {
    if (err) {
        res.status(400).json({"error":err.message});
        return;
        }
        console.log('Success: '+rows);

        const data = {
        data: {
            msg: 'Success',
            data: rows
        }
        };

        res.json(data);
    });
});

// All LoggedOn
router.post('/allLoggedOn', function(req, res) {
    console.log('Show all logged on users');
    var theSql;
    var params;

    theSql = 'SELECT * FROM loggedOn';
    params = [];
    db.all(theSql, params, (err, rows)=> {
    if (err) {
        res.status(400).json({"error":err.message});
        return;
        }
        console.log('Success, logged on: '+rows);

        const data = {
        data: {
            msg: 'Success. Logged on:',
            data: rows
        }
        };

        res.json(data);
    });
});

// LogOUt all users
router.post('/logOut', function(req, res) {
    console.log('Log out all');
      var theSql;
      var params;

      theSql = 'DELETE FROM loggedOn';
      params = [];
      db.all(theSql, params, (err, rows)=> {
        if (err) {
            res.status(400).json({"error":err.message});
            return;
          }
          console.log('Success: '+rows);

          const data = {
            data: {
                msg: 'Success',
                data: rows
            }
           };

            res.json(data);
      });
});

// Take body params for user registration
// email & password
// Use password hashing 
// Save a user to the database 
router.post('/register', function(req, res, next) {
    console.log('Register a user');
    //console.log(req.body);
    console.log('Req body email: '+req.body.email);
    console.log('Req body password: '+req.body.password);
    console.log('Req body name: '+req.body.name);
    console.log('Req body birthday: '+req.body.birthday);
    var theSql; // SQL for database
    var params; // Params for database

    if (!req.body.email || !req.body.password) {
        res.status(400).json({"error":'no email / password'});
        return;
    }

    // Hash the password
    const myPlainPassword = req.body.password;
    // var hashPsw = '';

    // Using password encryption
    bcrypt.hash(myPlainPassword, saltRounds, function(err, hash) {
        // spara lösenord i databasen.
        console.log('Hash password created for the new user');

        // Database insertion of new user
        theSql = 'INSERT INTO users (email, password, name, birthday) VALUES (?, ?, ?, ?)';
        params = [req.body.email, hash, req.body.name, req.body.birthday];
        db.all(theSql, params, (err, rows)=> {
        if (err) {
            console.log('Error: '+err.message);
            res.status(400).json({"error":err.message});
            return;
            }
            console.log('Success: '+rows);

            const data = {
            data: {
                msg: 'Success',
                data: rows
            }
            };

            res.json(data);
        });
    });
});

// Login a user with username & password 
// Control that the user exists in the database
router.post('/login', 
    (req, res, next) => userOnline(req, res, next),
    (req, res, next) => checkPassword(req, res, next),
    (req, res) => logOnUser(req, res));
    //console.log('Login a user');

    function userOnline(req, res, next) {
            // Check if a user is logged on 
            console.log('Req body email: '+req.body.email);
            // console.log('Req body password: '+req.body.password);

            if (!req.body.email) {
                res.status(400).json({"error":'no email'});
                return;
            }
            var theSql;
            var params;
            theSql = 'SELECT COUNT(*) AS found FROM loggedOn WHERE email = ? ';
            params = [req.body.email];

            db.all(theSql, params, (err, rows)=> {
            if (err) {
                console.log('Error: '+err.message);
                res.status(400).json({"error":err.message});
                return;
            }            
            console.log ('Found: '+rows[0].found);
            console.log('Sucess: '+rows[0]);

            // If no user was found, send on to login
            if (rows[0].found > 0) {
                
                // If the user was online, message it
                const data = {
                data: {
                    msg: 'User online',
                }
               };
                res.json(data);
                return;
            }

            // If no user was found, send on to login
            if (rows[0].found == 0) {
                console.log('User not online');
                next();
            }
            
            });
        }

    function checkPassword(req, res, next) {
        // Log in user
        console.log('Check password');
        console.log('Req body email: '+req.body.email);
        console.log('Req body password: '+req.body.password);
        var userInput; // password entered
        var dbPass; // password from database

        if (!req.body.email || !req.body.password) {
            res.status(400).json({"error":'no email / password'});
            return;
        }
        // Save input password
        userInput = req.body.password;

        // Check if the password is correct
        // Get the user & extract the password
        // Run password hash bcrypt to see if it is correct
        var theSql = "SELECT * FROM users WHERE email = ?;";
        var params;
        params = [req.body.email];

        db.all(theSql, params, (err, rows)=> {
            if (err) {
                console.log('Error: '+err.message);
                res.status(400).json({"error":err.message});
                return;
            }

            console.log(rows[0]);

            if (typeof rows[0] == 'undefined') {
                res.status(400).json({"error":"No user found"});
                return false;
            }

            console.log('User: '+rows[0].email+' '+rows[0].password);
            dbPass = rows[0].password;

            // Check with decryption
            // Control password with password hash
            valid = bcrypt.compareSync(userInput, dbPass); 

            console.log('Valid: '+valid);

            if (valid) {
                next();
            }

            if (!valid) {
                const data = {
                    data: {
                        msg: 'Password incorrect',
                    } 
                };
                res.json(data);
                return;
            }       
        });
    }

    function logOnUser(req, res) {

        // Log in user
        console.log('Log on the user');
        console.log('Req body email: '+req.body.email);
        // console.log('Req body password: '+req.body.password);

        if (!req.body.email) {
            res.status(400).json({"error":'no email / password'});
            return;
        }

        var theSql = "INSERT INTO loggedOn (email) VALUES (?);";
        var params;
        params = [req.body.email];

        db.all(theSql, params, (err, rows)=> {
             if (err) {
                console.log('Error: '+err.message);
                res.status(400).json({"error":err.message});
                return;
              }

              if (rows) {
                console.log (rows);
                console.log('Success');
                
                const data = {
                  data: {
                      msg: 'Success: user logged on',
                      data: rows
                  }
                 };
                 res.json(data);

              }
    
          });
    }

module.exports = router;