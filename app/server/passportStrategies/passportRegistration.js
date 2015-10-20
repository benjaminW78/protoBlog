var passport = require('passport');
var localStrategy = require('passport-local').Strategy;
var dbCo = require("../db/dbConnection.js");

passport.use('create-account', new localStrategy({
        passReqToCallback : true
    },
    function(req,login,password,callback) {
        console.log(req);
        // var re = new RegExp("[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?");

        // if(re.test(login) && password!=="" ){
        //     var query ="SELECT * FROM site.users WHERE email='"+login+"';";

        //     dbCo(query, function (poolRealese,err,queryResp) {
        //         poolRealese(err);

        //         if(err){
        //             console.log("error",err);

        //             return callback(null,false,{status:"error",msg:err});
        //         }

        //         if(queryResp.rowCount!==1){
        //             console.log("account invalid");
        //             return callback(null,false,{status:"error",msg:"account or password invalid"});
        //         }
        //             console.log(queryResp.rows[0]);

        //         if(queryResp.rows[0].password !== password){
        //             console.log("password invalid");
        //             return callback(null,false,{status:"error",msg:"account or password  invalid"});
        //         }

        //         return callback(null,queryResp.rows[0]);
        //     });
        // }
        // else{
            return callback(null,false,{status:"error",msg:"invalid email adresse"});
        // }
    }
));
module.exports = this;