const mongoose=require("mongoose")

mongoose.model("Order",{
    CustomerID:{
        type:mongoose.SchemaTypes.ObjectId,
        required: true
    },
    productID:{
        type:mongoose.SchemaTypes.ObjectId,
        required: true
    },
    initialDate:{
        type:Date,
        require:true
    },
    deliveryDate:{
        type:Date,
        required:true
    }
})