const mongoose=require('mongoose');
const Blog = new mongoose.Schema({
    blogtitle:{
        type: String
    },
    blogdescription:{
        type: String
    },
    bimage:{
        type: String
    },
    uid:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'doner'
    },
    blogger:{
        type: String
    },

})
module.exports = mongoose.model("Blog", Blog)