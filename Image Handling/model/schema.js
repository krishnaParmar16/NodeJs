const mongoose=require("mongoose");

const schema=mongoose.Schema({
    name:{
        type:String,
        require:true
    },
    image:{
        type:String,
        require:true
    }
})

const firstSchema=mongoose.model("Data",schema);

module.exports=firstSchema;
