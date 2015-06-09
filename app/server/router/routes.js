var handlers = require("../handlers.js"),
fs = require("fs"),
express = require("express");
var router = express.Router();

router.route("/api/videos/:videoName")
.get(function(req,res){
    handlers.videos.get(req,res);
})
.delete(function(req,res){
    handlers.videos.del(req,res);
});

router.route("/api/users/:user_id")
.get(function(req,res){
    handler.user.get(req,res);
})
.put(function(req,res){
    handler.user.update(req,res);
})
.post(function(req,res){
    handler.user.create(req,res);
})
.delete(function(req,res){
    handler.user.del(req,res);
});

router.route("/")
.get(function(req,res){
    fs.createReadStream(__dirname+"/../../views/index.html").pipe(res);
})

module.exports = router;