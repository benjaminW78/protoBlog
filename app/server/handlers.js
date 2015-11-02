var fs = require("fs");
var https = require("https");
var mongoose = require("mongoose");


var handlers = {
    user:{
        connect :function(req,res){
            // open bdd user.
            console.log("connect user "+req.isAuthenticated());
            // 
            res.status(200).send('/admin/home');
        },
        create  :function(req,res){
            console.log("on create un user");
            res.status(200);

            // get user name , password, email
            // create user and set it inactive
            // register it in bdd
            // send validation email to active account with custom url (http://monsite.fr/accountActivation?param1,2,3 etc)
            // return validation that account was created and need to be active
        },
        get :function(req,res){
            // get user by name or id
            // return model from bdd
            var currentUser = req.session.passport.user;

            delete currentUser.password;
            delete currentUser.validated_by_admin;
            delete currentUser.email_valid;

            res.send({users:[currentUser]});
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
    blog:{
        editPost:function(req,res){
            res.send("EDIT A existing POST");

        },
        createPost:function(req,res){
            res.send("CREATE A NEW POST");
        },
        getPosts:function(req,res){
            res.send("get posts");
        }
    }
};

module.exports = handlers;