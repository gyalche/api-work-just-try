const express = require('express')
const mongoose = require('mongoose')
const payment=require("../models/payment")
//auth require
const auth=require('../auth/auth')
const Router=new express.Router();
const stripe=require("stripe")(process.env.STRIPE_SECRET_TEST)

Router.post('/payment', verifyCustomer, function(req, res){
    let {amount, id}=req.body
    try {
        const payment=await stripe.paymentIntents.create({
            amount,
            currency:"USD",
            description:"thrift store",
            payment_method:id,
            confirm:true
        })
        console.log("payment", payment)
        res.json({
            message:"Payment successful",
            success:true
        })

    }catch (err) {
        console.log("error", err)
        res.json({
            msg:"payment failed",
            success:false
        })
    }
})
module.exports=Router;