var app_root = __dirname,
    express = require( "express" ),
    bodyParser = require( "body-parser" ),
    routePriv = require( "./router/routes.private.js" ),
    routePub = require( "./router/routes.public.js" ),
    restApiPub = require( "./router/restApi.public.js" ),
    restApiPriv = require( "./router/restApi.private.js" ),
    expressSession = require( "express-session" ),
    serveStatic = require( "serve-static" );

var https = require( "https" );
var passport = require( 'passport' );
var cookieParser = require( 'cookie-parser' );
var fs = require( 'fs' );
//server init

var options = {
    key : fs.readFileSync( __dirname + '/httpKeys/hacksparrow-key.pem' ),
    cert: fs.readFileSync( __dirname + '/httpKeys/hacksparrow-cert.pem' )
};

var app = express();
app.use( bodyParser.json() );       // to support JSON-encoded bodies
app.use( bodyParser.urlencoded( {     // to support URL-encoded bodies
    extended: true
} ) );

app.use( function ( req, res, next ) {
    console.log( "request path : " + req.url );
    next();
} );
//create front acces to vendors and css folder
app.use( "/js/", serveStatic( app_root + "/../public/js/" ) );
app.use( "/css/", serveStatic( app_root + "/../public/css/" ) );
app.use( "/html/", serveStatic( app_root + "/../public/html/" ) );

app.use( expressSession( { secret: 'supercalifragilisticexpialidocious', resave: false, saveUninitialized: true } ) );
app.use( cookieParser( 'supercalifragilisticexpialidocious' ) );

//start passport setting
app.use( passport.initialize() );

// passport.session middleware is a Passport Strategy which will load the user object onto req.
// user if a serialised user object was found in the server.
app.use( passport.session() );

app.use( restApiPub );
app.use( restApiPriv );
app.use( routePub );
app.use( routePriv );

// https test
https.createServer( options, app ).listen( 8000 );
