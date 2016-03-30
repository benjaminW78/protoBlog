var passport = require( 'passport' );
var localStrategy = require( 'passport-local' ).Strategy;
var dbCo = require( "../db/dbConnection.js" );
var bcrypt = require( 'bcrypt-nodejs' );
passport.use( 'local-create-account', new localStrategy( {
        passReqToCallback: true,
        usernameField    : 'email'
    },
    function ( req, login, password, callback ) {
        var re = new RegExp( "[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?" );

        if ( re.test( login ) && password !== "" ) {
            var query = "INSERT INTO site.users (email,first_name,last_name,password,access_right,pseudo) VALUES ('" + login + "','" + req.body.firstName + "','" + req.body.lastName + "','" + bcrypt.hashSync( password ) + "','" + 3 + "','" + req.body.pseudo + "') RETURNING *;"
            dbCo( query, function ( poolRealese, err, queryResp ) {
                poolRealese( err );

                if ( err ) {
                    console.log( "error", err );
                    return callback( err, false );
                }
                if ( queryResp.rowCount !== 1 ) {
                    console.log( "account invalid" );
                    return callback( null, false, { status: "error", msg: "account or password invalid" } );
                }

                console.log( queryResp.rows[ 0 ] );

                return callback( null, queryResp.rows[ 0 ] );
            } );
        }
        else {
            return callback( null, false, { status: "error", msg: "invalid email adresse" } );
        }
    }
) );
module.exports = this;