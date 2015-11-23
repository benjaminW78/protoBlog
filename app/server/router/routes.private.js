var handlers = require("../handlers.js"),
fs = require("fs"),
express = require("express");
var router = express.Router();
var passport = require("passport");

var passportId = require("../passportStrategies/passportIdentification.js");
var passportReg = require("../passportStrategies/passportRegistration.js");
var VIEWS_PATH = "/../../views";

// Log out function from session
router.route("/admin/logout")
.get(function(req,res){
    req.session.destroy();
            res.status(200).send('/admin/home');
});
router.route("/isAuthenticated")
.get(function(req,res){
    if(!req.isAuthenticated())
        res.status(401);
    else{
        res.status(200);
    }
})
// FUNCTION FOR VERIFY ROUTE RIGHT
function loggedRoutes(req,res,next){
    console.log("req",req.isAuthenticated(),req.path,req.url);
    if(!req.isAuthenticated())
        res.status(401).redirect('/connection');
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