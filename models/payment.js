const mongoose=require('mongoose');
const payment=mongoose.model('payment',{
    amount:{
        type:String,
    }
});
module.exports=payment