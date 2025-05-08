const express=require("express");
const passport=require("../middelware/passport");
const multer=require("../middelware/multer");
const route=express.Router();
const ctl=require("../controller/ctl");

route.get("/",ctl.login);
route.post("/loginAdmin",passport.authenticate("local",{failureRedirect:"/"}),ctl.loginAdmin);
route.get("/logout",ctl.logout);
route.get("/dashboard",passport.check,ctl.dashboard);
route.get("/addAdmin",passport.check,ctl.addAdmin);
route.get("/viewAdmin",passport.check,ctl.ViewAdmin);
route.post("/adddata",multer,ctl.adddata);
route.get("/deleteData",ctl.deleteData)
route.get("/editData",ctl.editData)
route.post("/updateData",multer,ctl.updateData)

module.exports=route;