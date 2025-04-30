const e = require("express");
const schema=require("../model/firstSchema");
const fs=require("fs");
module.exports.index=async(req,res)=>{

    await schema.find({}).then((data)=>{
        // console.log(data);
        
        res.render("index",{data})
    })
}
module.exports.AddMovieForm=(req,res)=>{
    res.render("form");
}

module.exports.addMovieData=async(req,res)=>{
    // console.log(req.body);
    // console.log(req.file.path);
    req.body.image = req.file.path;
    await schema.create(req.body).then(()=>{
        res.redirect("/");
    });
}

module.exports.deleteData=async(req,res)=>{
    // console.log(req.query.id);
    let singalData=await schema.findById(req.query.id);
    fs.unlinkSync(singalData.image)
    await schema.findByIdAndDelete(req.query.id).then(()=>{
        res.redirect("/");
    })
}

module.exports.editData=async(req,res)=>{
    // console.log(req.query.id);
    await schema.findById(req.query.id).then((data)=>{
        res.render("edit",{data});
    })   
}

module.exports.updateMovieData=async(req,res)=>{
    // console.log(req.body);

    let singalData= await schema.findById(req.body.id);
    let img="";
    if(req.file)
    {
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
}