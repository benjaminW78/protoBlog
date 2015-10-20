var handlers = require("../handlers.js"),
fs = require("fs"),
express = require("express");
var router = express.Router();
var passport = require("passport");

var passportId = require("../passportStrategies/passportIdentification.js");
var passportReg = require("../passportStrategies/passportRegistration.js");
var VIEWS_PATH = "/../../views";

router.route("/api/users/:user_id")
.get(function(req,res){
    handlers.user.get(req,res);
})
.put(function(req,res){
    handlers.user.update(req,res);
})
.post(function(req,res,next){
    console.log("YOLOOOo");
    passport.authenticate('create-account',function(err,user,info){
        if(err){
            res.status(err.status).send(err);
        }
        if(user){
            handlers.user.create(req,res);
        }
        console.log("toto");
    });
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
    fs.createReadStream(__dirname+VIEWS_PATH+"/index.html").pipe(res);
});

router.route("/connection")
.get(function(req,res){
    fs.createReadStream(__dirname+VIEWS_PATH+"/connection.html").pipe(res);
});
router.route("/admin/home")
.get(function(req,res){
    fs.createReadStream(__dirname+VIEWS_PATH+"/admin/home.html").pipe(res);
});
router.route("/admin/account")
.get(function(req,res){
    fs.createReadStream(__dirname+VIEWS_PATH+"/admin/account.html").pipe(res);
});

router.route("/login")
.get(function(req, res, next) {
    passport.authenticate('local-connect',function(err,user,info){
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