var app_root = __dirname,
express = require("express"),
path = require("path"),
bodyParser = require("body-parser"),
route = require("./router/routes.js"),
expressSession = require("express-session"),
serveStatic = require("serve-static");
var passport = require('passport');
var cookieParser = require('cookie-parser')
//server init

var app = express();
app.use( bodyParser.json() );       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
  extended: true
}));

app.use(function(req,res,next){
    console.log("request path : "+req.url);
    next();
});

//create front acces to vendors and css folder
app.use("/vendors/",serveStatic(app_root+"/../vendors/"));
app.use("/css/",serveStatic(app_root+"/../css/"));

app.use(expressSession({ secret: 'supercalifragilisticexpialidocious' }));
app.use(cookieParser('supercalifragilisticexpialidocious'));

//start passport setting
app.use(passport.initialize());

// passport.session middleware is a Passport Strategy which will load the user object onto req.
// user if a serialised user object was found in the server.
app.use(passport.session());

app.use(route);
//server start listening 

app.listen(8080);

// Database
