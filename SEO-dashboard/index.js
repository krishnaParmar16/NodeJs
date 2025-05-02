const express=require("express");
const port=2005;

const app=express();
const db=require("./config/db");
const path=require("path")
const cookie=require("cookie-parser");

app.set("view engine","ejs");
app.use(express.urlencoded({extended:true}));
app.use(express.static(path.join(__dirname,"public")))
app.use("/image",express.static(path.join(__dirname,"image")))
app.use(cookie());
app.use("/",require("./routes/route"));

app.listen(port,(err)=>{
    err?console.log(err):console.log("server started on the port:"+port);
})