const mongoose=require("mongoose")
var bcrypt = require('bcrypt')
var Schema = mongoose.Schema;

var userSchema = new Schema({
    name:{
        type:String,
        require:true
    },
    age:{
        type:Number,
        require:true
    },
    address:{
        type:String,
        require:true
    },
    email: {
        type: String,
        require: true
    },
    password: {
        type: String,
        require: true
    }
})



  module.exports = mongoose.model("Customer", userSchema)