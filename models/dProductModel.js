const mongoose=require('mongoose');
// const upload = require('../file/file');

const dProduct=new mongoose.Schema({

    uid:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'doner'
    },
    desc:{
        type:String
    },
    productName:{
        type:String
    },
    pimage:{
        type:String
    },
    category:{
        type:String
    },
    donerName:{
        type:String
    }

    
});
module.exports=mongoose.model("dproduct", dProduct)