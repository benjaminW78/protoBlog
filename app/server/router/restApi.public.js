var handlers = require("../handlers.js"),
fs = require("fs"),
express = require("express");
var router = express.Router();
var passport = require("passport");
var dbCo = require("../db/dbConnection.js");


router.route("/api/users/:user_id")
// .get(function(req,res){
//     handlers.user.get(req,res);
// })
// .put(function(req,res){
//     handlers.user.update(req,res);
// })
// create login account !
.post(function(req,res,next){
    passport.authenticate('local-create-account',function(err,user,info){
        if(err && err.name ==="error"){
            console.log(err.name);
            if(err.code==="23505")
                res.status(409).send({status:"error",msg:"Email already exist"});
        }
        if(user){
            handlers.user.create(req,res);
        }
    })(req, res, next);
});
// .delete(function(req,res){
//     handlers.user.del(req,res);
// });
router.route("/api/blogPosts")
.get(function(req,res){
    handlers.blog.getPosts(req,res);
});
module.exports = router;
