const express =require("express");
const route=express.Router();
const ctl=require("../controller/ctl");
const passport=require("../middelware/passport");

route.get("/",ctl.login);
route.post("/login",passport.authenticate("local",{failureRedirect:"/"}),ctl.loginAdmin);
route.get("/logout",ctl.logout);
route.get("/dashboard",passport.checkAuth,ctl.dashboard);
route.get("/addAdmin",passport.checkAuth,ctl.addAdmin);
route.get("/viewAdmin",passport.checkAuth,ctl.viewAdmin);
route.post("/addData",passport.checkAuth,ctl.addData);
route.get("/deleteData",passport.checkAuth,ctl.deleteData);
route.get("/editData",passport.checkAuth,ctl.editData);
route.post("/updateData",passport.checkAuth,ctl.updateData);
route.get("/profile",passport.checkAuth,ctl.profile)
route.get("/changePassword",passport.checkAuth,ctl.changepassword)
route.post("/changePasswordData",passport.checkAuth,ctl.changePasswordData);
route.post("/lostPass",ctl.lostPass);
route.post("/verifyPass",ctl.verifyPass);

module.exports=route;              