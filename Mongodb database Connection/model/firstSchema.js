const { name } = require("ejs");
const mongoose=require("mongoose");

const schema=mongoose.Schema({
    name:{
        type:String,
        require:true
    },
    sub:{
        type:String,
        require:true
    },
    city:{
        type:String,
        require:true
    }
})

const firstSchema = mongoose.model("student",schema);

module.exports=firstSchema;