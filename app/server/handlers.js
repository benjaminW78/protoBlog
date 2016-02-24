var fs = require("fs");
var https = require("https");
var dbCo = require("./db/dbConnection.js");
var sendToUser = require("./utils/sendToUser.js");

var handlers = {
    user:{
        connect :function(req,res){
            // open bdd user.
            console.log("connect user "+req.isAuthenticated());
            res.status(200).send(sendToUser('succes','redirection',{path:'/admin'}));
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

            var query = 'INSERT INTO site."blogPosts" (title, content, author_email,creation_date, summary, status, category_id) VALUES (\''+
                data.title+'\',\''+
                data.content+'\',\''+
                req.user.email+'\',\''+
                data.timeStamp+'\',\''+
                data.summary+'\',\''+
                data.postStatusId+'\',\''+
                data.categoryId
                +'\') RETURNING *;';
            console.log(query)
            dbCo(query,function(poolRealese,err,queryResp){
                poolRealese(err);
                if(err)
                {
                    console.log(err);
                    res.status(400).send(sendToUser("error","error create new post."));
                }
                 else{
                    if(queryResp.rowCount<=0)
                        res.status(400).send(sendToUser("error"," impossible to create new post."));
                    else
                        res.status(200).send(sendToUser('success',"blog post successfully created.",{post:queryResp.rows[0]}));
                }
            });
        },
        getPosts:function(req,res){

            var query = 'SELECT * INTO site."blogPosts" WHERE status="1"';
            console.log(query);
            dbCo(query,function(poolRealese,err,queryResp){
                poolRealese(err);
                if(err)
                {
                    console.log(err);
                    res.status(400).send(sendToUser("error","error create new post."));
                }
                 else{
                    if(queryResp.rowCount<=0)
                        res.status(400).send(sendToUser("error"," impossible to create new post."));
                    else
                        res.status(200).send(sendToUser('success',"blog post successfully created.",queryResp.rows));
                }
            });
        },
        createBlogCategory:function(req,res){
            res.send("create category");
        },
        getCategories:function(req,res){
            var query = 'SELECT id, name FROM site."blogPostCategories"  ORDER BY id ASC;';
            console.log(query);
            dbCo(query,function(poolRealese,err,queryResp){
                poolRealese(err);
                if(err)
                    res.status(400).send(sendToUser("error","error get categories"));
                else{
                    console.log(queryResp.rows)
                    if(queryResp.rowCount<=0)
                        res.status(400).send(sendToUser("error"," no categories found."));
                    else
                        res.status(200).send(sendToUser('success',"categories found",{categories:queryResp.rows}));
                }
            });
        },
        getPostStatus:function(req,res){
            var query = 'SELECT id, name FROM site."blogPostStatus" ORDER BY id ASC;';
            console.log(query);
            dbCo(query,function(poolRealese,err,queryResp){
                poolRealese(err);
                if(err)
                    res.status(400).send(sendToUser("error","error get blogPostStatus"));
                else{
                    console.log(queryResp.rows)
                    if(queryResp.rowCount<=0)
                        res.status(400).send(sendToUser("error"," no categories found."));
                    else
                        res.status(200).send(sendToUser('success',"categories found",{postStatus:queryResp.rows}));
                }
            });
        },
        uploadImages:function(req,res){
            console.log(req.files);
            var fstream;
            req.pipe(req.busboy);
            req.busboy.on('file', function (fieldname, file, filename) {
                console.log("Uploading: " + filename); 
                fstream = fs.createWriteStream(__dirname + '/files/' + filename);
                file.pipe(fstream);
                fstream.on('close', function () {
                    res.redirect('back');
                });
            });
        }
    }
};

module.exports = handlers;