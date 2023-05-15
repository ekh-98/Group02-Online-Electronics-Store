const express =require("express");
const app=express();
const bodyParser=require("body-parser");
app.use(bodyParser.json());

const mongoose=require("mongoose");
require("./Book");

const Book=mongoose.model("Book");

mongoose.connect("mongodb+srv://eherath1998:94FMzcWjeAnm9d8m@customer.r3gfa1c.mongodb.net/myFirstDatabase?retryWrites=true&w=majority",()=>{
    
    console.log("Databse is connected");
});
app.get('/',(req,res)=>{
    res.send("This is books service");
})
//Create functionality
app.post("/books",(req,res)=>{
    //This is our create function
    var newBook={
        title:req.body.title,
        author:req.body.author,
        numberPages:req.body.numberPages,
        publisher:req.body.publisher
    }
    //Create a new Book
    var book=new Book(newBook)
    book.save().then(() => {
        console.log("New book created!");
        res.status(201).send("A new book created with success");
      }).catch((err) => {
        console.error(err);
        res.status(500).send("Failed to create new book");
      });
    //res.send("A new book created with success");
    console.log(req.body);
})

app.get("/books",(req,res)=>{
    Book.find().then((books)=>{
        res.json(books);
       
    }).catch((err) => {
        if(err){
            throw err;
        }
      });
  })

app.get("/book/:id",(req,res)=>{

    if(mongoose.Types.ObjectId.isValid(req.params.id)){
        Book.findById(req.params.id).then((book)=>{
        if(book){
            res.json(book)
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

app.delete("/book/:id",(req,res)=>{
    Book.findByIdAndDelete(req.params.id).then(()=>{
        res.send("Book removed with success!")
    }).catch(err=>{
        if(err){
            throw err;
        }
    })
})

app.listen(4545,()=>{
    console.log("Up and running!--This is our Books services");
})