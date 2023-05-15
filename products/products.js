const express =require("express");
const app=express();
const bodyParser=require("body-parser");
app.use(bodyParser.json());

const mongoose=require("mongoose");
require("./Product");

const Product=mongoose.model("Product");

mongoose.connect("mongodb+srv://myFirstDatabase?retryWrites=true&w=majority",()=>{
    
    console.log("Database is connected");
});

app.get('/',(req,res)=>{
    res.send("This is products service");
})
//Create functionality
app.post("/products",(req,res)=>{
    //This is our create function
    var newProduct={
        title:req.body.title,
        manufacturer:req.body.manufacturer,
        price:req.body.price,
        warranty:req.body.warranty
    }
    
    //Create a new product
    var product=new Product(newProduct)
   
    product.save().then(() => {
        console.log("New product created!");
        res.status(201).send("A new product created with success");
      }).catch((err) => {
        console.error(err);
        res.status(500).send("Failed to create new product");
      });
    //res.send("A new product created with success");
    console.log(req.body);
})

app.get("/products",(req,res)=>{
    Product.find().then((products)=>{
        res.json(products);
       
    }).catch((err) => {
        if(err){
            throw err;
        }
      });
  })

app.get("/product/:id",(req,res)=>{

    if(mongoose.Types.ObjectId.isValid(req.params.id)){
        Product.findById(req.params.id).then((product)=>{
        if(product){
            res.json(product)
        }
        else{
                res.sendStatus(404);
        }
    }).catch((err) => {
        if(err){
            throw err;
        }
      })
    }
})

app.delete("/product/:id",(req,res)=>{
    Product.findByIdAndDelete(req.params.id).then(()=>{
        res.send("product removed with success!")
    }).catch(err=>{
        if(err){
            throw err;
        }
    })
})

app.listen(4545,()=>{
    console.log("Up and running!--This is our products services");
})
