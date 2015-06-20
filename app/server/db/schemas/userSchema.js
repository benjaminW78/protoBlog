userSchema = {
    name:String,
    password:String,
    actived:Boolean,
    email: String,
    newsletter: Boolean,
    registerDate:{ type: Date, default: Date.now },
    group:{type : String, default:"user"}
};

module.exports=userSchema;
