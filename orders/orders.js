const express=require("express")
const app=express()
const bodyParser=require("body-parser")
const mongoose=require("mongoose")

const axios =require("axios")

app.use(bodyParser.json())

mongoose.connect("mongodb+srv://OrdersService?retryWrites=true&w=majority",()=>{
    console.log("Database connected -Orders")
})

require("./Order")
const Order=mongoose.model("Order")
//create new order
app.post("/order",(req,res)=>{
    var newOrder={
        CustomerID:mongoose.Types.ObjectId(req.body.CustomerID),
        productID: mongoose.Types.ObjectId(req.body.productID),
        initialDate:req.body.initialDate,
        deliveryDate:req.body.deliveryDate
    }
    var order=new Order(newOrder)
    order.save().then(()=>{
        res.send("Order created with success")
    }).catch((err)=>{
        if(err){
            throw err
        }
    })
})

app.get("/orders",(req,res)=>{
    Order.find().then((products)=>{
        res.json(products)
    }).catch((err)=>{
        if(err){
            throw err
        }
    })
})

app.get("/order/:id",(req,res)=>{
    console.log("skkkkkkkkkkkkkk")
    Order.findById(req.params.id).then((order)=>{
        if(order){
            axios.get("http://localhost:5555/customer/"+order.CustomerID).then((response)=>{
                var orderObject={customerName:response.data.name,productTitle:""}
            axios.get("http://localhost:4545/product/"+order.productID).then((response)=>{
                orderObject.productTitle=response.data.title
                res.json(orderObject)
            })    
            })
        
        }
        else{
            res.send("Invalid ID")
        }
    }).catch((err)=>{
        if(err){
            throw err
        }
    })
})

app.delete("/order/:id",(req,res)=>{
    Order.findByIdAndDelete(req.params.id).then(()=>{
        res.send("Order deleted with success!")
    }).catch((err)=>{
        if(err){
            throw err
        }
    })
})




app.listen("7777",()=>{
    console.log("Up and running-Orders service")
})
