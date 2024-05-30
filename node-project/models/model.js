const mongoose = require ('mongoose');
const {Schema, model } = mongoose;


const nameSchema = new Schema({
    firstname: String,
    lastname: String,
    email: String,
});




const nameInput = model('nameInput', nameSchema);

module.exports  =  nameInput;


