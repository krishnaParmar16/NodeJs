const express=require("express");
const multer=require("../middelware/multer");
const route=express.Router();
const ctl=require("../controller/ctl");


route.get("/",ctl.index);
route.get("/AddMovieForm",ctl.AddMovieForm);
route.post("/addMovieData",multer,ctl.addMovieData);
route.get("/deleteData",ctl.deleteData);
route.get("/editData",ctl.editData);
route.post("/updateMovieData",multer,ctl.updateMovieData);

module.exports=route;