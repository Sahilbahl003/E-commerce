const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({

title:{
type:String,
required:true
},

description:{
type:String,
required:true
},

price:{
type:Number,
required:true
},

image:{
type:String
},

category:{
type:mongoose.Schema.Types.ObjectId,
ref:"Category",
required:true
},

seller:{
type:mongoose.Schema.Types.ObjectId,
ref:"User",
required:true
},

stockQuantity:{
type:Number,
required:true
}

},{timestamps:true})

module.exports = mongoose.model("Product",productSchema)