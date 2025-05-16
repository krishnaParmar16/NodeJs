const express=require("express");
const route=express.Router();
const passport=require("../middelware/passport");
const ctl=require("../controller/categoryCtl");
const multer=require("../middelware/multer");

route.get("/addCat",passport.checkAuth,ctl.addCat);
route.get("/viewCat",passport.checkAuth,ctl.viewCat);
route.post("/addCatData",passport.checkAuth,multer,ctl.addCategoryData);
module.exports=route