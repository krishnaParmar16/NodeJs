const schema=require("../model/catSchema")
module.exports.addCat=(req,res)=>{
    res.render("addCat");
}


module.exports.viewCat = async (req, res) => {
    await schema.find({}).then((data)=>{
        res.render("viewCat",{data});
    })
}

module.exports.addCategoryData=async(req,res)=>{
    // console.log(req.file);
    req.body.image=req.file.path;
    console.log(req.body);
    await schema.create(req.body).then(()=>{
        res.redirect("/category/viewCat")
    })
}

