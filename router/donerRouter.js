const express=require('express');
const mongoose=require('mongoose');
const doner=require('../models/doner');
//password bcrypt
const bcryptjs=require('bcryptjs')
//now we will work on token
const jwt=require('jsonwebtoken');
//import auth
const auth=require('../auth/auth');
const router=new express.Router();
//upload import
const upload=require('../file/file');

router.post("/doner/register", function(req, res){
    console.log(req.body)
    const username=req.body.username;
    const role = req.body.role;
    const address=req.body.address;
    const email=req.body.email;
    const phoneNumber=req.body.phoneNumber;
    const password=req.body.password;
    // const image=req.file.filename;
    console.log(username)

    //MUST TO REGISTER
    doner.findOne({username:username}).then(function(donerData){
        if(donerData!=null){
            return res.status(401).json({msg:"already exist"});
            
        }
        bcryptjs.hash(password, 10, function(e, hashedPassword){
            const donerData=new doner({
                username:username,
                address:address,
                email:email,
                phoneNumber:phoneNumber,
                password:hashedPassword,
                role: role
                // image:image
            })
    
            donerData.save()
            .then(function(){
             res.json({msg:"sucessfully ", success:true})
            })
            .catch(function(e){
                res.json({err:e});
            })
        });
    })


   
    
})
//TESTING
router.post("/doner/test", function(req, res){
    const username=req.body.username;
    doner.findOne({username:username}).then(function(donerData){
        if(donerData!=null){
            res.json({donerData});
        }
        else{
            res.status(401).json({msg:"invalid username"});
        }
    })
});

//DONER LOGIN
router.post("/doner/login", function(req, res){
    const username=req.body.username;
     doner.findOne({username:username}).then(function(donerData){
         if(donerData==null){
             return res.json({msg:"invalid login credintal"})
         }
         //if username matches
         const password=req.body.password;
         bcryptjs.compare(password, donerData.password).then(function(err, result){
            if(result==false){
                return res.status(401).json({msg:"invalid password"});
            }

            //IF  USERNAME AND PASSWORD MATCHES

            const token=jwt.sign({donerId:donerData._id}, "mysecretkey");
            res.json({token:token, donerData, msg:"token given"});
         })
     })
})
//To upload profile
router.put("/doner/profile", upload.single('profile'),auth.verifyDoner, function(req, res){

    if(req.file==undefined){
        res.json({msg:"invalid format"})
    }else{
        doner.findOneAndUpdate({_id: req.donerInfo._id}, {
            image: req.file.filename
        }).then((data) => {
            res.json({msg:"sucessfully updated", data})
        })
    }


})
//DELETE LOGIN
router.delete("/doner/delete",auth.verifyDoner, function(req, res){
    doner.deleteOne({_id: req.donerInfo._id}).then(() => {
        res.json({msg:"sucessfully deleted doner"})
    })
})
// to show the doner dashboard
router.get("/doner/show", auth.verifyDoner, function(req, res){
    res.json({
        id: req.donerInfo._id,
        username:req.donerInfo.username,
        address:req.donerInfo.address,
        email:req.donerInfo.email,
        phoneNumber:req.donerInfo.phoneNumber,
        image:req.donerInfo.image,
    })
})
//to update doner info
router.put("/doner/update", upload.single("profile"), auth.verifyDoner, function(req, res){
    const username=req.body.username;
    const address=req.body.address;
    const email=req.body.email;
    const phoneNumber=req.body.phoneNumber;
    const image=req.file.filename;
    const password=req.body.password;
    const role=req.body.role

    bcryptjs.hash(password, 10, function(err, passwordHashed){
        doner.findOneAndUpdate({_id:req.donerInfo._id},{
            username:username,
            address:address,
            email:email,
            phoneNumber:phoneNumber,
            image:image,
            password:passwordHashed,
            role:role,
        }).then((userdata) => {
            res.json({
                success: "Updated Successfully",
                userdata
            })
        })
    })
   
})
module.exports=router;