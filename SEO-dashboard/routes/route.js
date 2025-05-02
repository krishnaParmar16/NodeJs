const express=require("express");
const multer=require("../middelware/multer");
const route=express.Router();
const ctl=require("../controller/ctl");


route.get("/",ctl.login);
route.post("/loginAdmin",ctl.loginAdmin);
route.get("/logout",ctl.logout);
route.get("/dashboard",ctl.dashboard);
route.get("/addAdmin",ctl.addAdmin);
route.get("/viewAdmin",ctl.ViewAdmin);
route.post("/adddata",multer,ctl.adddata);
route.get("/deleteData",ctl.deleteData)
route.get("/editData",ctl.editData)
route.post("/updateData",multer,ctl.updateData)

module.exports=route;