const schema=require("../model/firstSchema");
const fs=require("fs");

module.exports.login=(req,res)=>{
    res.render("login");
}

module.exports.loginAdmin=async(req,res)=>{
        res.redirect("/dashboard");
}

module.exports.logout=(req,res)=>{
    req.session.destroy(),
    res.redirect("/");
}

module.exports.dashboard = (req, res) => { 
        res.render("dashboard");
}

module.exports.addAdmin=(req,res)=>{
        res.render("addAdmin");    
}
module.exports.ViewAdmin=async(req,res)=>{
    await schema.find({}).then((data)=>{
    res.render("ViewAdmin",{data});
    })
}
module.exports.adddata=async(req,res)=>{
    // console.log(req.body);
    // console.log(req.file.path);
    req.body.image=req.file.path;
    await schema.create(req.body).then(()=>{
        res.redirect("/ViewAdmin");
    })
}

module.exports.deleteData=async(req,res)=>{
    // console.log(req.query.id);
    let singalData=await schema.findById(req.query.id);
    fs.unlinkSync(singalData.image);
    await schema.findByIdAndDelete(req.query.id).then(()=>{
        res.redirect("/ViewAdmin")
    })
}

module.exports.editData=async(req,res)=>{
    // console.log(req.query.id);
    await schema.findById(req.query.id).then((data)=>{
        res.render("edit",{data});
    })
}
module.exports.updateData=async(req,res)=>{
    // console.log(req.body);
    // console.log(req.file.path);
    let singalData= await schema.findById(req.body.id);
    let img = " ";
    if(req.file)
    {
        console.log(req.file.path);
        img=req.file.path;
        fs.unlinkSync(singalData.image)
        // fs.unlinkSync(singalData.image);
    }
    else{
        img=singalData.image;
        // console.log(img);
        
    }
    req.body.image=img;
    await schema.findByIdAndUpdate(req.body.id,req.body).then(()=>{
        res.redirect("/ViewAdmin")
    })
}