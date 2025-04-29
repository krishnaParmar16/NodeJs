const multer=require("multer");

const Storage=multer.diskStorage({
    destination:(req,file,cb)=>{
        cb(null,"Images/")
    },
    filename:(req,file,cb)=>{
        cb(null,file.fieldname+"-"+Date.now())
    }
})

const image=multer({storage:Storage}).single("image")

module.exports=image;