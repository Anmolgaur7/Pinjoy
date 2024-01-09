const mongoose = require('mongoose');
const Boardschema=new mongoose.Schema({
    UserId:{
        type:String,
        required:true
    },
    Imageurl:{
        type:String,
        required:true
    },
})
module.exports=mongoose.model('board',Boardschema)
