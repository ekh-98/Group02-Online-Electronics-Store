const mongoose =require("mongoose");
mongoose.model("Product",{
    //Title,author,numberPages,Publisher
    title:{
        type:String,
        require:true
    },
    manufacturer:{
        type:String,
        require:true
    },
    price:{
        type:Number,
        require:false
    },
    warranty:{
        type:String,
        require:false
    },
})