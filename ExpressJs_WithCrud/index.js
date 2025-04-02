const express = require("express");
const port=2004;

const app =express();
app.set("view engine","ejs");
let student=[
    {id:1,name:"Krishna",sub:"Node"}
]
app.get("/",(req,res)=>{
    // res.write("<h1>Server started on port: 2004</h1>");
    // res.end()
    res.render("index",{student})
})

app.use(express.urlencoded({extended:true}));

app.post("/addData",(req,res)=>{
    // console.log(req.body);
    req.body.id=student.length+1;
    student.push(req.body)
    res.redirect("/")
})
app.get("/deleteData",(req,res)=>{
    // console.log(req.query.id);
    student=student.filter((el)=>{
        return el.id!=req.query.id;
    });
    res.redirect("/")
})

app.get("/editData/:id",(req,res)=>{
    // console.log(req.params);
    let singleData=student.find((el)=>
        el.id==req.params.id
    )
    res.render("edit",{singleData})    
})

app.post("/updateData",(req,res)=>{
    // console.log(req.body);
    student.forEach((el)=>{
        if(el.id==req.body.id){
            el.name=req.body.name;
            el.sub=req.body.sub;
        }
        else{
            el;
        }
        res.redirect("/")
    })
})

app.listen(port,(err)=>{
    err?console.log(err):console.log("Server started on the port:"+port);
})

