const schema=require("../model/firstSchema");
const fs=require("fs");
module.exports.login=(req,res)=>{
    res.render("login");
}

module.exports.loginAdmin=async(req,res)=>{
   let admin = await schema.findOne({email:req.body.email}); 
//    console.log(admin);
   if(admin){
    if(admin.password == req.body.password)
    {   
        res.cookie("admin",admin);
        res.redirect("/dashboard");
    }
    else{
        res.redirect("/");
    }
   }
   else{
    res.redirect("/");
   }
}

module.exports.logout=(req,res)=>{
    res.clearCookie("admin");
    res.redirect("/");
}

module.exports.dashboard = (req, res) => { 
    // if (req.cookies.admin) {
        res.render("dashboard");
    // }
    // else {
    //     res.redirect("/");
    // }
}
module.exports.addAdmin=(req,res)=>{
    // if(req.cookies.admin)
    //     {
        res.render("addAdmin");
        // }
        // else{
        //     res.redirect("/");
        // }
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