var mongoose = require("mongoose");

var db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function (callback) {
    console.log("db Connected "+db.name);
});

mongoose.connect("mongodb://localhost/Blog");

mongoose.model("users",new mongoose.Schema(require("./schemas/userSchema.js")));

module.exports = mongoose;