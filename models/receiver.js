const mongoose=require('mongoose');
const receiver=mongoose.model('receiver',{
    username:{
        type:String
        
    },
    address:{
        type:String
    },
    phoneNumber:{
        type:String
    },
    gender:{
        type:String
    },
    email:{
        type:String
    },
    password:{
        type:String
    },
    image:{
        type:String
        
    }

})
module.exports=receiver;