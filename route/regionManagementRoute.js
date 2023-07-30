const express = require('express')
const router = express.Router()
const regionController = require("../controller/regionManagementController")
// middleware that is specific to this router
router.use((req, res, next) => {
   console.log("API Called ",new Date());
   const commonFunction = require("../utils/commonFunction");
   const CONSTANT = require("../utils/constant");
   
   /*
   //token autheticate
  let authenticURL = ['/addAdmin','/getAdmins','/getParticularAdmin','/updateAdmin']
   if(authenticURL.includes(req.path))
   {
     let token = req.headers.authorization;
     commonFunction.decryptJWT(token,function(error,data){
        if(error){
           res.status(403).send(CONSTANT.validation.loginUserNotExist);
        }else{
           next()
        } 
     })
   }else
   {
     next()
   }
   */
    next()
})

 router.post("/addNewRegion",function(req,res){
    regionController.addNewRegion(req,res);
})
router.get("/getAllRegion",function(req,res){
    regionController.getRegion(req,res);
 })
 router.get("/getRegion/:regionId",function(req,res){
    regionController.getParticularRegion(req,res);
 })
 router.post("/updateRegion/:regionId",function(req,res){
    regionController.updateRegion(req,res);
 })
module.exports = router;