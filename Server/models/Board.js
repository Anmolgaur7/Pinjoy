const mongoose = require('mongoose');
const Boardschema=new mongoose.Schema({
    Userid:{
        type:String,
        required:true
    },
    Description:{
        type:String,
        required:true
    },
    Imageurl:{
        type:String,
        required:true
    },
    Comments:{
        type:Array,
        default:[]
    },
    likes:{
        type:Number,
        default:0
    }
})
module.exports=mongoose.model('board',Boardschema)
