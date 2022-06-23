const mongoose=require('mongoose');

mongoose.connect('mongodb://127.0.0.1:27017/AssignmentFinal', {
    useNewUrlParser: true,
    useUnifiedTopology : true
}).then((data)=>{
    console.log(`mongodb is connected at:${data.connection.host}`)
})