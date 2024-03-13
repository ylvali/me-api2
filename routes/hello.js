/*jshint esversion: 6 */

var express = require('express');
var router = express.Router();

router.get('/', function(req, res) {
    const data = {
        data: {
            msg: "Hello World2"
        }
    };

    res.json(data);
});

module.exports = router;
