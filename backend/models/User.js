// creating a schema for users--> used for providing validation,etc
const mongoose = require('mongoose');
 
const {Schema}=mongoose;
const UserSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    location:{
        type: String,
        required: true
    },
    email:{
        type: String,
        required: true
    }
    ,password:{
        type: String,
        required: true
    }
    ,date:{
        type: Date,
        default:Date.now
    }
   
});
// data insertion 
module.exports = mongoose.model('User',UserSchema);
