var handlers = {
    videos:{
        get:function(req,res){
            var bdd = ["titi","toto","totu"];
            var videoExist=bdd.indexOf(req.params.videoName);
            if(videoExist!=-1)
                res.status(200).send({item:bdd[videoExist]});
            else
                res.status(404).send({item:"undefined"});
        },
        add:function(req,res){
            res.send("add "+ req.body.url);
        },
        del:function(req,res){
            res.send("delete "+ req.body.url);
        }
    }
};

module.exports = handlers;