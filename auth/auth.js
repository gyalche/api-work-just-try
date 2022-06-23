//jsonwebtoken require
const jwt=require('jsonwebtoken');
//custome require
const customer=require('../models/receiver');
//mongoose require
const mongoose=require('mongoose');
//doner require
const doner = require('../models/doner');

const res = require('express/lib/response');

module.exports.verifyCustomer=function(req, res, next){
try{
    const token=req.headers.authorization.split(" ")[1];
    const data=jwt.verify(token, "mysecretkey");

    customer.findOne({_id:data.customerId}).then(function(result){
        console.log(result)
        req.customerInfo=result;
        next();
    })
    .catch(function(e){
        res.json({err:e})
    })
}
catch(e){
    res.send({msg:"Invalid token"})
}
   
}

try{
    module.exports.verifyDoner=function(req, res, next){
        const token = req.headers.authorization.split(" ")[1];
        const data=jwt.verify(token, "mysecretkey");
        doner.findOne({_id:data.donerId}).then(function(result){
            req.donerInfo=result;
            // console.log(result);
            next();
        })
        .catch(function(e){
            res.json({err:e})
        })
    }
}
catch{
    res.json({err:"error"});
}
try{
    module.exports.verifyOrganisation=function(req, res, next){
        const token=req.headers.authorization.split(" ")[1];
        const data=jwt.verify(token, "mysecretkey");
    
        organization.findOne({_id:data.organizationId}).then(function(result){
            res.organizationInfo=result;
            next();
        }).catch(function(e){
            res.json({err:e});
        })
        
        
    }
}
catch{
    res.json({err:"err"})
}


