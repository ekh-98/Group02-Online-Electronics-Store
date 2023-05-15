const express =require("express")
const app=express()
const mongoose=require("mongoose")
const bodParser=require("body-parser")
const bodyParser = require("body-parser")
var bcrypt = require('bcrypt')
var crypto = require('crypto'); 
const { Console } = require("console")
const jwt = require('jsonwebtoken');
const saltRounds = 10;
//var CustomerModel = require('Customer')

app.use(bodyParser.json());

mongoose.connect("mongodb+srv://eherath1998:94FMzcWjeAnm9d8m@customer.r3gfa1c.mongodb.net/CustomersService?retryWrites=true&w=majority", () => {
    console.log("Database connected -Customer Service")
})
require("./Customer")
const Customer=mongoose.model("Customer")

app.post("/create_customer",(req,res)=>{

    var inUserPassword = req.body.password
    //console.log("inUserPassword " + inUserPassword)
    var hashedPassword = ""
    
    bcrypt.genSalt(saltRounds, function (err, salt) {
        if (err) {
            return next(err);
        }

        //bcrypting password and hashing
        else{
            hashedPassword = ""
            var newCustomer={
                name:req.body.name,
                age:req.body.age,
                address:req.body.address,
                email:req.body.email,
                password:hashedPassword
            }
            bcrypt.hash(inUserPassword, salt, function (err, hash) {
                if (err) {
                    return err;
                }
                //console.log(hash);
                hashedPassword = hash;
                //console.log("Hashed Pw " +hash);
                //next();

                newCustomer.password = hash;
                

                var customer=new Customer(newCustomer)
            
                //console.log("Customer " +customer.name);
                customer.save().then(()=>{
                    console.log(newCustomer)
                    res.send("Customer created")
                }).catch((err)=>{
                    if(err){
                        throw err
                    }
                })


            })
        }
        
    })

    
})

app.post("/authenticate",(req,res)=>{

    var email = req.body.email
    var password = req.body.password


    Customer.findOne({
        email: req.body.email
    }, function (err, user) {
        console.log(user);
        if (err){
            return res.status(500).send(err);
        }
        if (!user) {
            res.status(403).send({ success: false, msg: 'Authentication Failed, User not found' })
        }

        else {

            bcrypt.compare(password, user.password, function (err, isMatch) {
                if (err) {
                    console.log("Compare Error");
                    return res.status(500).send(err);
                }
                
                if (isMatch === true) {
                    // create a JWT token and send it to the client
                    console.log("Password Match Successful");
                    
                    const token = jwt.sign({ email: email }, 'App-Secret');
                    console.log("Token : "+ token);

                    return res.status(200).send({ token: token });
                  } 
                  else 
                  {
                    console.log("Invalid Credentials");
                    //return res.status(401).send({ success: false, msg: 'Invalid credentials' })
                    const msg = 'Invalid credentials' ;
                    return res.status(401).json({ msg});

                  }

                
            })


            
        }
    }

    )
    
})

app.get("/customers",(req,res)=>{
    Customer.find().then((customers)=>{
        res.json(customers)
    }).catch((err)=>{
        if(err){
            throw err
        }
    })
})


app.get("/customer/:id",(req,res)=>{
    Customer.findById(req.params.id).then((customer)=>{
        if(customer){
            res.json(customer)
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

app.delete("/customer/:id",(req,res)=>{
    Customer.findByIdAndDelete(req.params.id).then(()=>{
        res.send("Customer deleted with success!")
    }).catch((err)=>{
        if(err){
            throw err
        }
    })
})

app.listen("5555",()=>{
    console.log("Up and running - Customer service")
})