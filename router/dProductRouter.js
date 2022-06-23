const express=require('express');
const auth=require('../auth/auth');
const router=new express.Router();
//importing dPrdocut model
const dProduct=require('../models/dProductModel');
//require mongoose
const mongoose=require('mongoose');
const upload=require("../file/file");

router.post("/product/insert",upload.single('pimage'),auth.verifyDoner, function(req, res){
    const productName=req.body.productName;
    const uid=req.donerInfo._id;
    const pimage=req.file.filename;
    const desc=req.body.desc;
    const donerName=req.body.donerName;
    const category=req.body.category;
    const dData=new dProduct({
        productName:productName,
        uid:uid,
        pimage:pimage,
        // type:type,
        desc:desc,
        category:category,
        donerName:donerName
    })
    dData.save()
    .then(function(){
        res.json({msg:"sucessfully added", success:true})
    })
    .catch(function(e){
         res.json({msg:e})
    })
}),

//product delete
router.delete("/product/delete/:pid", auth.verifyDoner, function(req, res){
    // const uid=req.donerInfo.Id;
    const pid=req.params.pid;
    dProduct.findByIdAndDelete(pid).then(function(req, res){
        res.json({msg:"sucessfully deleted"})
    })
    .catch(function(e){
        res.json({err:e})
    })
})
//view all of my products
router.get("/product/myproduct", auth.verifyDoner, function(req, res){
    // const uid=req.verifyDoner._id;
    dProduct.find({uid:req.donerInfo._id}).then(function(data){
        res.json(data);
    }).catch(function(){
        res.json({msg:"something went wrong"})
    })
})
router.get("/product/allproducts", function(req, res){
    dProduct.find().then(function(data){
        res.json(data);
    }).catch(function(){
        res.json({msg:"something went wrong"})
    })
})
//view single product
router.get("/product/single/:pid", auth.verifyDoner, function(req, res){
    dProduct.find({_id:req.params.pid}).then(function(data){
        res.json(data)
    }).catch(function(){
        res.json({msg:"something went wrong"})
    })
})
//update
router.put("/product/update/:pid", upload.single('uimage'), auth.verifyDoner, function(req, res){
    console.log('safdaskfla')
    const productName=req.body.productName;
    const desc=req.body.desc;
    const uimage=req.file.filename;
    const donerName=req.body.donerName;
    const category=req.body.category;
    const pid=req.params.pid;
        dProduct.findByIdAndUpdate({_id:pid},{
            productName:productName,
            desc:desc,
            pimage:uimage,
            donerName:donerName,
            category:category,
        }).then(()=>{
            res.json({
                success: 'success'
            })
        })

    
   
})
module.exports=router;