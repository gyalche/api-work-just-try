const mongoose=require('mongoose');

const doner=mongoose.model('doner',{
    username:{
        
        type:String
    },
    address:{
        type:String
    },
    email:{
        type:String
    },
    phoneNumber:{
        type:Number
    },
    password:{
        type:String
    },
    image:{
        type:String
    },
    role: {
        type: String,
        enum: ["doner", "consumer"],
        default: 'doner'
    }
  
})
module.exports=doner;