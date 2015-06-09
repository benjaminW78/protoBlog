var app_root = __dirname,
express = require("express"),
path = require("path"),
request = require("request"),
bodyParser = require("body-parser"),
route = require("./router/routes.js"),
serveStatic = require("serve-static"),
mongoose = require("mongoose");

//server init

var app = express();
app.use( bodyParser.json() );       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
  extended: true
}));

console.log(app_root+"/../vendors/");
app.use("/vendors/",serveStatic(app_root+"/../vendors/"));
app.use(route);
//server start listening 

app.listen(8080);

// Database

// var db = mongoose.connect("mongodb://localhost/YoutubeProject");



