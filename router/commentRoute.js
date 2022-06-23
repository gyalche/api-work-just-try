const express=require('express');
const auth=require('../auth/auth');
const router=new express.Router();
//require mongoose
const mongoose=require('mongoose');
const comment = require('../models/comment')

router.post("/comment/insert",auth.verifyCustomer, function(req, res){
    const Comment=req.body.Comment;
    const uid=req.verifyCustomer._id;
    

    const cmtData=new Blog({
        Comment:Comment,
        uid:uid,
       
    })
    cmtData.save()
    .then(function(){
        res.json({msg:"Replied", success:true})
    })
    .catch(function(){
         res.json({msg: "something went wrong"})
    })
});
module.exports=router;