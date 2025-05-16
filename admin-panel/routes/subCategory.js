const express=require("express");
const route=express.Router();
const ctl=require("../controller/subCatCtl");
const passport=require("../middelware/passport");

route.get("/addSubCat",passport.checkAuth,ctl.addSubCat)
route.get("/viewSubCat",passport.checkAuth,ctl.viewSubCat)

module.exports=route;