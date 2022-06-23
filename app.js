
const express=require('express');
const app=express();
const morgan = require("morgan");
require("dotenv").config()

//import corse
const cors=require('cors');
app.use(cors(
    {origin:['http://localhost:3000']}
));
app.use(morgan('dev'));
//databse
const mongoose=require('mongoose');

//to display image
app.use(express.static(__dirname+'/gallary'));

//when data is coming from client
app.use(express.json());
app.use(express.urlencoded({extended:true}));

//database require
require('./database/db')

//calling customer
// const customerRouter=require('./router/customerRouter');
// app.use(customerRouter);

//calling blog route
const blogRouter=require('./router/blogRoute');
app.use(blogRouter);

//calling doner
const donerRouter=require('./router/donerRouter');
app.use(donerRouter)

//calling organizatin
// const organizationRouter=require('./router/organizationRouter');
// app.use(organizationRouter)

// calling product
const dProductRouter=require('./router/dProductRouter');
app.use(dProductRouter);

//calling comment Router
const commentRouter=require('./router/commentRoute');
app.use(commentRouter)

const PORT = 90;
app.listen(PORT,()=>{
    console.log(`server is running at port :${PORT}`)
})
