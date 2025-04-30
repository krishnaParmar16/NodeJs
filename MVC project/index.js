const express=require("express");
const port=2005;

const app=express();
const db=require("./config/db")
const path=require("path")
app.set("view engine","ejs");
app.use(express.urlencoded({extended:true}));
app.use("/",require("./routes/route"));
app.use("/upload",express.static(path.join(__dirname,"upload")));

app.listen(port,(err)=>{
    err?console.log(err):console.log("server started on the port:"+port);
})