const express = require("express");
const port=2005;

const app=express();
const path=require("path");
const db=require("./config/db");
const cookie=require("cookie-parser");
const passport=require("passport");
const session=require("express-session");
const connectFlash=require("connect-flash");
const flash=require("./middelware/flash");

app.set("view engine","ejs");
app.use(express.urlencoded({extended:true}))
app.use(express.static(path.join(__dirname,"public")));
app.use("/uploads",express.static(path.join(__dirname,"uploads")));
app.use(cookie());

app.use(session({
    name:"local",
    secret:"krishna",
    resave:true,
    saveUninitialized:false,
    cookie:{maxAge:100*100*60}
}))

app.use(passport.session());
app.use(passport.initialize());

app.use(connectFlash());
app.use(flash.setFlash);

app.use("/",require("./routes/route"));
app.use("/category",require("./routes/category"));
app.use("/subCategory",require("./routes/subCategory"));

app.listen(port,(err)=>{
    err?console.log(err):console.log("server started on the port:"+port);
})