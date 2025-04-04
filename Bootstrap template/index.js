const express=require("express");
const path=require("path")
const port = 2005;

const app=express();

app.set("view engine","ejs");
app.use(express.static(path.join(__dirname,"public")));

app.get("/",(req,res)=>{
    res.render("index")
})

app.get("/index",(req,res)=>{
    res.redirect("/")
})

app.get("/about",(req,res)=>{
    res.render("about")
})

app.get("/menu",(req,res)=>{
    res.render("menu")
})

app.get("/book",(req,res)=>{
    res.render("book")
})
app.listen(port,(err)=>{
    err?console.log(err):console.log("Server start on the port:"+port);
})