const schema = require("../model/shema");
const mailer=require("../middelware/mailer");
module.exports.login = (req, res) => {
    res.render("login");
}

module.exports.loginAdmin = async (req, res) => {
    // let admin = await schema.findOne({ email: req.body.email });
    // console.log(admin);
    // if (admin) {
    //     if (req.body.password == admin.password) {
            // console.log("login");            
            // res.cookie("admin", admin);
            req.flash("success","Login Successfully!");
            res.redirect("/dashboard");
    //     }
    //     else {
    //         res.redirect("/")
    //     }
    // }
    // else {
    //     res.redirect("/");
    // }


}

module.exports.logout=(req,res)=>{
    // res.clearCookie("admin");
    req.session.destroy(),
    res.redirect("/");
}

module.exports.dashboard = (req, res) => { 
    // if (req.cookies.admin) {
        res.render("dashboard");
//     }
//     else {
//         res.redirect("/");
//     }
}

module.exports.addAdmin = (req, res) => {
    // if(req.cookies.admin)
    // {
    res.render("addAdmin");
    // }
    // else{
    //     res.redirect("/");
    // }
}

module.exports.viewAdmin = async (req, res) => {
    await schema.find({}).then((data) => {
        res.render("viewAdmin", { data });
    })

}

module.exports.addData = async (req, res) => {
    // console.log(req.body);

    await schema.create(req.body).then(() => {
        res.redirect("/viewAdmin");
    })
}

module.exports.deleteData = async (req, res) => {
    // console.log(req.query.id);
    await schema.findByIdAndDelete(req.query.id).then(() => {
        res.redirect("/viewAdmin");
    })
}

module.exports.editData = async (req, res) => {
    // console.log(req.query.id);
    await schema.findById(req.query.id).then((data) => {
        res.render("editAdmin", { data });
    })
}

module.exports.updateData = async (req, res) => {
    // console.log(req.body);
    await schema.findByIdAndUpdate(req.body.id, req.body).then(() => {
        res.redirect("viewAdmin");
    })
}

module.exports.profile=(req,res)=>{
    res.render("profile");
}

module.exports.changepassword=(req,res)=>{
    res.render("changePassword");
}

module.exports.changePasswordData=async(req,res)=>{
    // console.log(req.body);
    let admin=req.user;
    console.log(admin);

    if(admin.password ==  req.body.oldPassword)
    {
        if(req.body.oldPassword != req.body.newPassword)
        {
            if(req.body.newPassword == req.body.confirmPassword)
            {
                // console.log(newPassword);
                
                await schema.findByIdAndUpdate(admin.id,{password:req.body.newPassword}).then(()=>{
                    res.redirect("/logout");
                })
            }
        }
        else{
            res.redirect("/changePasswordData");
        }
    }
    else{
        res.redirect("/changePasswordData");
    }
}

module.exports.lostPass=async(req,res)=>{
    // console.log(req.body);
    let admin=await schema.findOne({email:req.body.email});

    if(!admin)
    {
        res.redirect("/");
    }

    let otp=Math.floor(Math.random()*100000 +800000)
    // console.log(otp);

    mailer.sendOTP(req.body.email,otp); 
    req.session.adminData=admin;
    req.session.otp=otp;
    res.render("verifyPass");
}

module.exports.verifyPass=async(req,res)=>{
    console.log(req.body);
    let otp=req.session.otp;
    let admin=req.session.adminData;

    if(otp==req.body.otp)
    {
        if(req.body.newPassword == req.body.confirmPassword)
        {   
            await schema.findByIdAndUpdate(admin._id,{password:req.body.newPassword});
            res.redirect("/");
        }
        else{
            req.redirect("/");
        }
    }
    else{
        res.redirect("/");
    }
}   