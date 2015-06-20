var handlers = require("../handlers.js"),
fs = require("fs"),
express = require("express");
var router = express.Router();
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
    fs.createReadStream(__dirname+VIEWS_PATH+"/index.html").pipe(res);
});

router.route("/admin/connection")
.get(function(req,res){
    fs.createReadStream(__dirname+VIEWS_PATH+"/admin/connection.html").pipe(res);
});



module.exports = router;