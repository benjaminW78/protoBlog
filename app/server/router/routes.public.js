var VIEWS_PATH = "/../../views";

var fs = require("fs"),
express = require("express");

var router = express.Router();
var passport = require("passport");


router.route("/")
.get(function(req,res){
    fs.createReadStream(__dirname+VIEWS_PATH+"/index.html").pipe(res);
});

module.exports = router;
