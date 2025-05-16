const mongoose=require("mongoose");
const schema=mongoose.Schema({
    fname:{
        type:String,
        require:true
    },
    lname:{
        type:String,
        require:true
    },
    email:{
        type:String,
        require:true
    },
    password:{
        type:Number,
        require:true
    }
})

const firstSchema= mongoose.model("AdminData",schema);
module.exports=firstSchema;