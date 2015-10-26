var passport = require('passport');
var localStrategy = require('passport-local').Strategy;
var dbCo = require("../db/dbConnection.js");
var bcrypt =require('bcrypt-nodejs');

// Configure Passport authenticated session persistence.
//
// In order to restore authentication state across HTTP requests, Passport needs
// to serialize users into and deserialize users out of the session.  The
// typical implementation of this is as simple as supplying the user ID when
// serializing, and querying the user record by ID from the database when
// deserializing.
passport.serializeUser(function(user, cb) {
    console.log("ICI ON SEREALISZE",user);
  cb(null, user.id);
});

passport.deserializeUser(function(id, cb) {
    console.log('ICI ON DESERIALIZE')
  db.users.findById(id, function (err, user) {
    if (err) { return cb(err); }
    cb(null, user);
  });
});

passport.use('local-connect',new localStrategy({
        usernameField: 'email'
},
    function(login,password,callback) {
        var re = new RegExp("[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?");

        if(re.test(login) && password!=="" ){
            var query ="SELECT * FROM site.users WHERE email='"+login+"';";

            dbCo(query, function (poolRealese,err,queryResp) {
                poolRealese(err);

                if(err){
                    console.log("error",err);
                    return callback(null,false,{status:"error",msg:err});
                }

                if(queryResp.rowCount!==1){
                    console.log("account invalid");
                    return callback(null,false,{status:"error",msg:"account or password invalid"});
                }

                if(!bcrypt.compareSync(password,queryResp.rows[0].password)){
                    console.log("password invalid");
                    return callback(null,false,{status:"error",msg:"account or password  invalid"});
                }

                return callback(null,queryResp.rows[0]);
            });
        }
        else{
            return callback(null,false,{status:"error",msg:"invalid email adresse"});
        }
    }
));


module.exports = this;