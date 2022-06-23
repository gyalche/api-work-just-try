const mongoose=require('mongoose');
const comment = new mongoose.Schema({
    reply:{
        type:String
    },
    uid:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'receiver'
    }

})
module.exports = mongoose.model("Comment", comment)