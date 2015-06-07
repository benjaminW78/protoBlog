var handlers = require("../Handlers.js"),
fs = require("fs"),
express = require("express");

var router = express.Router();

router.route("/api/videos/:videoName")
.get(function(req,res){
    handlers.videos.get(req,res);
})
.post(function(req,res){
    handlers.videos.add(req,res);
})
.delete(function(req,res){
    handlers.videos.del(req,res);
});

router.route("/")
.get(function(req,res){
    console.log(__dirname);
    fs.createReadStream(__dirname+"/../../html/index.html").pipe(res);
});

module.exports = router;