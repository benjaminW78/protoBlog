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

})
.delete(function(req,res){
    handlers.user.del(req,res);
});

// VIEWS ROUTES
router.route(/\/admin\//)
.get(function(req,res){
    console.log("req",req.isAuthenticated(),req.path,req.url);
    if(req.isAuthenticated())
        res.status(200).send(req.path);
    else
        res.status(500).send('/connection');
})

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
            req.logIn(user,function(err,user){
                if(err){
                    console.log(err,'session start error');
                }
                handlers.user.connect(req,res);
            });
        }
        else{
            res.status(401).send(info);
        }
     })(req, res, next);
 });

module.exports= router;