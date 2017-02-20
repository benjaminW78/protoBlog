var handlers = require( "../handlers.js" ),
    fs = require( "fs" ),
    express = require( "express" );
var router = express.Router();
var passport = require( "passport" );

var passportId = require( "../passportStrategies/passportIdentification.js" );
var passportReg = require( "../passportStrategies/passportRegistration.js" );
var VIEWS_PATH = "/../../public/html/back";
var sendToUser = require( "../utils/sendToUser.js" );

// FUNCTION FOR VERIFY ROUTE RIGHT
function loggedRoutes ( req, res, next ) {
    console.log( "req", req.isAuthenticated(), req.path, req.url );
    if ( !req.isAuthenticated() )
        res.status( 401 ).redirect('/' );
    else {
        next();
    }
}

// PRIVATE / LOGGER ROUTES
router.route( "/admin" )
      .get( loggedRoutes, function ( req, res ) {
          console.log( "on est connecté" );
          fs.createReadStream( __dirname + VIEWS_PATH + "/index.html" ).pipe( res );
      } );
router.route('*', function(req, res) {
    res.redirect('/');
});
module.exports = router;