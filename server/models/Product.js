const mongoose = require("mongoose");

const productSchema =new mongoose.Schema({
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
    sellerName:{
        type:String,
        required:true
    },
    stockQuantity:{
        type:Number,
        required:true
    },
    // status:{
    //     type:String,
    //     enum:[""]
    // }

})

module.exports = mongoose.model("Product",productSchema);