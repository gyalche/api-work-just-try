const express=require('express');
const auth=require('../auth/auth');
const router=new express.Router();
//importing dPrdocut model
const Blog=require('../models/blog');
//require mongoose
const mongoose=require('mongoose');
const upload=require("../file/file");


router.post("/blog/insert",upload.single('bimage'),auth.verifyDoner, function(req, res){
    const blogtitle=req.body.blogtitle;
    const uid=req.donerInfo._id;
    const bimage=req.file.filename;
    const blogdescription=req.body.blogdescription;
    const blogger=req.body.blogger;

    const blogData=new Blog({
        blogtitle:blogtitle,
        uid:uid,
        bimage:bimage,
        blogdescription:blogdescription,
        blogger:blogger
    })
    blogData.save()
    .then(function(){
        res.json({msg:"Blog added", success:true})
    })
    .catch(function(){
         res.json({msg: "something went wrong"})
    })
});
// to show the doner dashboard
router.get("/blog/show", function(req, res){
    Blog.find().then(function(data){
        res.json({data});
    }).catch(function(){
        res.json({msg:"something went wrong"})
    })
})
//product delete
router.delete("/blog/delete/:pid", auth.verifyDoner, function(req, res){
    const uid=req.donerInfo.Id;
    const pid=req.params.pid;
    Blog.findByIdAndDelete(pid).then(function(req, res){
        res.json({msg:"sucessfully deleted"})
    })
    .catch(function(e){
        res.json({err:e})
    })
})
module.exports=router;