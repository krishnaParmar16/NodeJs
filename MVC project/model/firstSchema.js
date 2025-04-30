const mongoose=require("mongoose");
const schema=mongoose.Schema({
    image:{
        type:String,
        require:true
    },
    name:{
        type:String,
        require:true
    },
    catagory:{
        type:String,
        require:true
    },
    rate:{
        type:String,
        require:true
    }
})

const firstSchema=mongoose.model("Movie Detail",schema);

module.exports=firstSchema;