const express = require("express");
const port = 2005;

const app = express();
const db = require("./config/db");
const schema = require("./model/schema");
const multer = require("./Middleware/multer");
// core module for show the image
const path = require("path");
// for handle file system use fs (core module)
const fs=require("fs");
app.use(express.urlencoded({ extended: true }));
app.use("/Images", express.static(path.join(__dirname, 'Images')));
app.set("view engine", "ejs")

app.get("/", async (req, res) => {
    await schema.find({}).then((data) => {
        // console.log(data);
        res.render("index", { data });
    })
})

app.post("/addData", multer, async (req, res) => {
        // console.log(req.body);
        // console.log(req.file);
    req.body.image = req.file.path;
    await schema.create(req.body).then(() => {
        res.redirect("/")
    })
})

app.get("/deleteData",async(req,res)=>{
    // console.log(req.query.id);
    let singalData=await schema.findById(req.query.id);
    // we are manage file 
    fs.unlinkSync(singalData.image)
    
    await schema.findByIdAndDelete(req.query.id).then(()=>{
        res.redirect("/");
    })
})

app.get("/editData",async(req,res)=>{
    // console.log(req.query.id);
    await schema.findById(req.query.id).then((data)=>{
        res.render("edit",{data});
    })
})

app.post("/updateData",multer,async(req,res)=>{
    // console.log(req.body);
    // console.log(req.file);

    let singalData=await schema.findById(req.body.id);
    let img="";
    
    if(req.file){
        img=req.file.path;
        fs.unlinkSync(singalData.image);
    }
    else{
        img=singalData.image;
    }
    req.body.image=img;

    await schema.findByIdAndUpdate(req.body.id,req.body).then(()=>{
        res.redirect("/");
    })

})

app.listen(port, (err) => {
    err ? console.log(err)
        : console.log("server started on the port: " + port);
})