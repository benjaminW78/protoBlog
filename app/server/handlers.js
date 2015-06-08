var fs = require("fs");
var https = require("https");
var filepath = path.join(dir, 'youtube-dl');

var handlers = {
    videos:{
        get:function(req,res){
            var bdd = ["titi","toto","totu"];
            var videoExist=bdd.indexOf(req.params.videoName);
            if(videoExist!=-1)
                res.status(200).send({item:bdd[videoExist]});
            else
                res.status(404).send("je vois pas de quoi tu parle");
        },
        add:function(req,res){
            console.log(req.body);
            https.get(req.body.videoUrl,function(res){
                if(res.statusCode != 200){
                    console.log("ERROR FAUSSE URL 404");
                    res.status(404).send("c'est caca ton url");
                }
                fs.createFile(filepath);
            })
            res.send("add "+ req.body.videoUrl);
        },
        del:function(req,res){
            res.send("delete "+ req.body.url);
        }
    }
};

module.exports = handlers;