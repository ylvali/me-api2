
/*jshint esversion: 6 */

var express = require('express');
var router = express.Router();

router.get('/', function(req, res) {
    var dataContent;

    dataContent = "I am Ylva Sjölin";
    dataContent = "I enjoy creating with web programming teqniques like JavaScript & PHP.";
    dataContent += "And have previously completed 3.5 years in total.";
    dataContent += "of information system studies & web technology.";

    const data = {
        data: {
            msg: "Hello",
            pres2: dataContent
        }
    };

    res.json(data);
});

module.exports = router;
