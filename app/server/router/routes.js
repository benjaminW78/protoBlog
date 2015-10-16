var handlers = require("../handlers.js"),
fs = require("fs"),
express = require("express");
var router = express.Router();
var passportId= require("../passportIdentification.js");
var passport= require("passport");
var VIEWS_PATH = "/../../views";

router.route("/api/users/:user_id")
.get(function(req,res){
    handlers.user.get(req,res);
})
.put(function(req,res){
    handlers.user.update(req,res);
})
.post(function(req,res){
    handlers.user.create(req,res);
})
.delete(function(req,res){
    handlers.user.del(req,res);
});
router.route("/backoffice/connect")
.post(function(req,res){
    handlers.backOffice.connect(req,res);
});
// VIEWS ROUTES
router.route("/")
.get(function(req,res){
    console.log("indexxxx");
    fs.createReadStream(__dirname+VIEWS_PATH+"/index.html").pipe(res);
});

router.route("/admin/connection")
.get(function(req,res){
    fs.createReadStream(__dirname+VIEWS_PATH+"/admin/connection.html").pipe(res);
});
router.route("/admin/backoffice")
.get(function(req,res){
    fs.createReadStream(__dirname+VIEWS_PATH+"/admin/connection.html").pipe(res);
});

router.route("/login")
.get(function(req, res, next) {
    passport.authenticate('local',function(err,user,info){
        console.log(arguments)
        if(err)
            res.status(err.status).send(err);
        if(user){

            console.log("ici login call");
            handlers.user.connect(req,res);
        }
        else{
            res.status(401).send(info);
        }
     })(req, res, next);
 });

module.exports = router;