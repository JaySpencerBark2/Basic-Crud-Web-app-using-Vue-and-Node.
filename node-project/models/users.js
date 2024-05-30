const mongoose = require ('mongoose');
const {Schema, model } = mongoose;
const passportLocalMongoose = require("passport-local-mongoose");


const nameSchema = new Schema({
    ID: mongoose.Types.ObjectId,
    username: String,
    password: String,
});



nameSchema.plugin(passportLocalMongoose);
const userInput = mongoose.model('users', nameSchema);

module.exports  =  userInput;