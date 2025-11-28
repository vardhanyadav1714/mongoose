let express=require('express');
let moongoose=require('mongoose');
let UserEnquiryModel=moongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true       
    },
    message:{
        type:String,
        required:true
    }           


});
let enquiryModel=moongoose.model("userenquiry",UserEnquiryModel);
module.exports=enquiryModel;