const express=require("express");
const port =2005;

const app=express();
const db=require("./config/db");
const schema=require("./model/firstSchema");

app.set("view engine","ejs");
app.use(express.urlencoded({extended:true}));

app.get("/",async(req,res)=>{
    // let student=await schema.find({})
    // res.render("index",{student});
    await schema.find({}).then((student)=>{
        res.render("index",{student})
    })
})

app.post("/addData",async(req,res)=>{
    // console.log(req.body);
    // let data=await schema.create(req.body)
    // data && res.redirect("/");
    await schema.create(req.body).then(()=>{
        res.redirect("/");
    })
})

app.get("/deleteData",async(req,res)=>{
    // console.log(req.query.id);
    await schema.findByIdAndDelete(req.query.id).then(()=>{
        res.redirect("/");
    })
})

app.get("/editdata",async(req,res)=>{
    // console.log(req.query.id);
    await schema.findById(req.query.id).then((data)=>{
        res.render("edit",{data});
    })  
})

app.post("/updateData",async(req,res)=>{
    // console.log(req.body);
    await schema.findByIdAndUpdate(req.body.id,req.body).then(()=>{
        res.redirect("/")
    })
    
})
app.listen(port,(err)=>{
    err?console.log(err):console.log("Server startrd on the port: "+port);
})