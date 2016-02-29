var conf = require('./conf.js'),
ENV = require('../utils/env.js'),
dbConf = conf[ENV],
LargeObjectManager = require('pg-large-object').LargeObjectManager,
LargeObject = require('pg-large-object').LargeObject,
pg = require('pg');

var conString = "postgres://"+dbConf.DB_SUPERUSER+":"+dbConf.DB_SUPERPASSWORD+"@"+dbConf.DB_HOST+"/"+dbConf.DB_NAME;

var connection = {
    handleError : function(err) {
        // no error occurred, continue with the request
        if(!err) return false;

        // An error occurred, remove the client from the connection pool.
        // A truthy value passed to done will remove the connection from the pool
        // instead of simply returning it to be reused.
        // In this case, if we have successfully received a client (truthy)
        // then it will be removed from the pool.
        if(client){
            done(client);
        }
        res.writeHead(500, {'content-type': 'text/plain'});
        res.end('An error occurred');
        return true;
    },
    request:function(obj){
        var that = this;
        pg.connect(conString, function(err, client, done) {

            if(that.handleError(err)) return;

            var man = new LargeObjectManager(client);

            // When working with Large Objects, always use a transaction
            client.query('BEGIN', function(err, result)
            {
                    if (err)
                {
                        done(err);
                        return client.emit('error', err);
                }

                // If you are on a high latency connection and working with
                // large LargeObjects, you should increase the buffer size
                var bufferSize = 16384;
                if(obj.method ==='load')
                    man.openAndReadableStream(obj.oid,bufferSize,obj.cb.bind(this,done,client));
                else if(obj.method ==='write')
                    man.createAndWritableStream(bufferSize,obj.cb.bind(this,done,client));

            });
        });
    },
    load:function(oid,callback){
        this.request({
            method:'load',
            oid:oid,
            cb:function(done,client,err, size, stream)
            {
                if (err)
                {
                        done(err);
                        return console.error('Unable to read the given large object', err);
                }
                console.log('Streaming a large object with a total size of ', size);
                stream.on('end', function()
                {
                            done();
                            client.query('COMMIT',callback.bind(this,fileStream));
                });
                // Store it as an image
                var fileStream = require('fs').createWriteStream('my-file.png');
                stream.pipe(fileStream);
           }
        });
    },
    save:function(file,callback){
        this.request({
            method:'write',
            cb:function(done,client,err, oid, stream)
            {
                // console.log(arguments)
                if (err)
                {
                        done(err);
                        return console.error('Unable to create a new large object', err);
                }

                // The server has generated an oid
                console.log('Creating a large object with the oid ', oid);
                stream.on('finish', function()
                {
                        // Actual writing of the large object in DB may
                        // take some time, so one should provide a
                        // callback to client.query.
                        done();
                        client.query('COMMIT',callback.bind(this,oid));
                });

                // Upload an image
                var fileStream = require('fs').createReadStream(file.path);
                fileStream.pipe(stream);
            }
        });
    }
};

module.exports = connection;