var fs = require("fs");
var https = require("https");

var handlers = {
    user:{
        // connect :function(req,res){
        //     // open bdd user.
        //     // check if user exist by name and password
        //     // if set user connected
        //     // if not send to create page.
        // },
        create  :function(req,res){
            // get user name , password, email
            // create user and set it inactive
            // register it in bdd
            // send validation email to active account with custom url (http://monsite.fr/accountActivation?param1,2,3 etc)
            // return validation that account was created and need to be active
        },
        get :function(req,res){
            // get user by name or id
            // return model from bdd 
        },
        update :function(req,res){
            // get current user id 
            // test if exist in bdd
            // update it inside bdd
            // return ok update
        },
        del :function(req,res){
            //get user id by function getUser.
            //delete user by id from bdd if user password ok twice
        }
    },
    videos:{
        get:function(req,res){
            var bdd = ["titi","toto","totu"];

            var videoExist=bdd.indexOf(req.params.videoName);

            if(videoExist!=-1)
                res.status(200).send({item:bdd[videoExist]});
            else
                res.status(404).send({item:"undefined"});

        },
        del:function(req,res){
            res.send("delete "+ req.body.url);
        }
    }
};

module.exports = handlers;