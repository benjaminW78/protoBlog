var request = require("supertest");
var express = require('express');
var should = require("should");
var router = require("../router/routes.js");
var app = express();

app.use(router);
app.listen(8080);

describe('API TESTING', function() {

    it("GET existing Video name",function(done){
        request(app)
        .get('/api/videos/titi')
        .set('Accept', 'application/json')
        .expect('Content-Type', "application/json; charset=utf-8")
        .expect(200)
        .end(function(err,res){
            if(err)
                throw err;
            res.body.should.have.property("item");
            res.body.item.should.equal("titi");

            done();

        });
    });

    it("GET bad Video name",function(done){
        request(app)
        .get('/api/videos/trucmuch')
        .set('Accept', 'application/json')
        .expect('Content-Type', "application/json; charset=utf-8")
        .expect(200)
        .end(function(err,res){
            if(err)
                throw err;
            res.body.should.have.property("item");
            res.body.item.should.equal("trucmuch");

            done();

        });
    });

    it("Post video Url",function(done){
        var youtubeURL = ""

        request(app)
        .post('/api/videos/')
        .send()
        .expect(200)
        .end(function(err,res){
            if(err)
                throw err;
            res.body.should.have.property("item");
            res.body.item.should.equal("titi");

            done();

        });
    });
});