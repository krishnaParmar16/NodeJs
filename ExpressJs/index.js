const express=require("express");
const port = 2005;

const app=express();

app.set("view engine","ejs");
const student=[
    {id:1, name:"Krishna", sub:"Node"}
]
app.get("/",(req,res)=>{
    res.render("index",{student})
    // res.write("<h1>Server started on the port : 2005 </h1> ")
    // res.end()
})

app.listen(port,(err)=>{
    err?console.log(err):console.log("Server start on port:"+port);    
})