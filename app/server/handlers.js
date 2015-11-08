var fs = require("fs");
var https = require("https");
var dbCo = require("./db/dbConnection.js");
var sendToUser = require("./sendToUser.js");

var handlers = {
    user:{
        connect :function(req,res){
            // open bdd user.
            console.log("connect user "+req.isAuthenticated());
            res.status(200).send(sendToUser('succes','redirection',{path:'/admin/home'}));
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
            console.log(req.body);
            data=req.body;
            if(data.title===undefined && data.title.length <=0){
                res.status(422).send(sendToUser("error","title is missing"));
            }
            if(data.summary===undefined && data.summary.length <=0){
                res.status(422).send(sendToUser("error","summary is missing"));
            }
            if(data.content==undefined && data.content.length <=0){
                res.status(422).send(sendToUser("error","content is missing"));
            }

            var query = "INSERT INTO ";
            dbCo(query,function(){});
            res.status(200).send("CREATE A NEW POST");
        },
        getPosts:function(req,res){
            res.send("get posts");
        },
        createBlogCategory:function(req,res){
            res.send("create category");
        },
        getCategories:function(req,res){
            var query = 'SELECT id, name FROM site."blogPostCategories";';
            console.log(query);
            dbCo(query,function(query,err,done){
                if(err)
                    res.status(400).send(sendToUser("error","error get categories"));
                else{
                    if(done.rowCount<=0)
                        res.status(400).send(sendToUser("error"," no categories found."));
                    else
                        res.status(200).send(sendToUser('success',"categories found",{categories:done.rows}));
                }
            });
        },
        getPostStatus:function(req,res){
            var query = 'SELECT id, name FROM site."blogPostStatus";';
            console.log(query);
            dbCo(query,function(query,err,done){
                if(err)
                    res.status(400).send(sendToUser("error","error get blogPostStatus"));

                if(done.rowCount<=0)
                    res.status(400).send(sendToUser("error"," no categories found."));
                else
                    res.status(200).send(sendToUser('success',"categories found",{categories:done.rows}));
            });
        }
    }
};

module.exports = handlers;