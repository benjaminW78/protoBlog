var handlers = require("../handlers.js"),
fs = require("fs"),
express = require("express");
var router = express.Router();
var passport = require("passport");

var passportId = require("../passportStrategies/passportIdentification.js");
var passportReg = require("../passportStrategies/passportRegistration.js");
var VIEWS_PATH = "/../../views";



// create a session
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

// Log out function from session
router.route("/admin/logout")
.get(function(req,res){
    req.session.destroy();
            res.status(200).send('/admin/home');
});

// FUNCTION FOR VERIFY ROUTE RIGHT
function loggedRoutes(req,res,next){
    console.log("req",req.isAuthenticated(),req.path,req.url);
    if(!req.isAuthenticated())
        res.redirect('/connection');
    else{
        next();
    }
}

// PRIVATE / LOGGER ROUTES
router.route("/admin/home")
.get(loggedRoutes,function(req,res){
    fs.createReadStream(__dirname+VIEWS_PATH+"/admin/home.html").pipe(res);
});
router.route("/admin/account")
.get(loggedRoutes,function(req,res){
     fs.createReadStream(__dirname+VIEWS_PATH+"/admin/account.html").pipe(res);
});
router.route("/admin/CreateBlogPost")
.get(loggedRoutes,function(req,res){
     fs.createReadStream(__dirname+VIEWS_PATH+"/admin/createBlogPost.html").pipe(res);
});


module.exports = router;