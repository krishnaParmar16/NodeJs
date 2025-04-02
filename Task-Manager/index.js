const e = require("express");
const express=require("express");
const port=2005;
const app=express();

app.set("view engine","ejs")
let data=[];
app.use(express.urlencoded({extended:true}))
app.get("/",(req,res)=>{
    // res.write("server started on the port 2005");
    // res.end()
    res.render("index",{data})
})

app.post("/addData",(req,res)=>{
    req.body.id=data.length+1;
    // console.log(req.body);
    data.push(req.body)
    res.redirect("/")
})

app.get("/deleteData",(req,res)=>{
    // console.log(req.query.id);
    data=data.filter((item)=> item.id != req.query.id)
    res.redirect("/")
})

app.get("/editData",(req,res)=>{
    // console.log(req.query.id);
    let singleData=data.find((item)=>item.id==req.query.id);
    res.render("edit",{singleData})
})

app.post("/updateData",(req,res)=>{
    console.log(req.body);    
    data.forEach((el)=>{
        if(el.id==req.body.id){
            el.task=req.body.task;
            el.priority=req.body.priority;
        }
        else{
            el;
        }
        res.redirect("/")
    })
})
app.listen(port,(err)=>{
    err?console.log(err):console.log("Server started on the port:"+port)
})