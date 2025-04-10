const express=require("express");
const port=2005;

const app=express();
const db=require("./config/db");

app.set("view engine","ejs")
app.use(express.urlencoded({extended:true}))

app.get("/",(req,res)=>{
    res.render("index");
})

app.listen(port,(err)=>{
    err?console.log(err):console.log("server started on the port" +port);
})