var handlers = require( "../handlers.js" ),
    fs = require( "fs" ),
    express = require( "express" );
var router = express.Router();
var sendToUser = require( "../utils/sendToUser.js" );

// FUNCTION FOR VERIFY ROUTE RIGHT
function loggedRoutes ( req, res, next ) {
    console.log( "req", req.isAuthenticated(), req.path, req.url );
    if ( !req.isAuthenticated() )
        res.status( 401 ).send( 'Unauthorized' );
    else {
        next();
    }
}
// Log out function from session
router.route( "/api/logout" )
      .get( loggedRoutes, function ( req, res ) {
          req.session.destroy();
          res.status( 200 ).send( sendToUser( 'succes', 'redirection', { path: '/' } ) );
      } );

router.route( "/api/users/:user_id" )
      .get( loggedRoutes, function ( req, res ) {
          handlers.user.get( req, res );
      } )
      .put( loggedRoutes, function ( req, res ) {
          handlers.user.update( req, res );
      } )
      .delete( loggedRoutes, function ( req, res ) {
          handlers.user.del( req, res );
      } );

router.route( "/api/blogPosts" )
      .post( loggedRoutes, function ( req, res ) {
          handlers.blog.createPost( req, res );
      } );

router.route( "/api/blogPosts/:blogPostId" )
      .put( loggedRoutes, function ( req, res ) {
          handlers.blog.editPost( req, res );
      } );

router.route( "/api/categories" )
      .get( loggedRoutes, function ( req, res ) {
          handlers.blog.getCategories( req, res );
      } );

router.route( "/api/postStatus" )
      .get( loggedRoutes, function ( req, res ) {
          handlers.blog.getPostStatus( req, res );
      } );

router.route( "/api/images" )
      .post( loggedRoutes, function ( req, res ) {
          handlers.blog.uploadImages( req, res );
      } )
      .get( loggedRoutes, function ( req, res ) {
          handlers.blog.getAllImages( req, res );
      } );
module.exports = router;
