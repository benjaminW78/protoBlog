var app_root = __dirname,
express = require("express"),
path = require("path"),
request = require("request"),
bodyParser = require("body-parser"),
route = require("./router/routes.js"),
mongoose = require("mongoose");

//server init

var app = express();
app.use( bodyParser.json() );       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
  extended: true
}));

app.use(route);

//server start listening 

app.listen(80);

// Database

//var db = mongoose.connect("mongodb://localhost/YoutubeProject");



