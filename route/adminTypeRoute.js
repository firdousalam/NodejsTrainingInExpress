const express = require('express')
const router = express.Router()
const adminTypeController = require("../controller/adminTypeController");
const commonFunction = require("../utils/commonFunction");
const CONSTANT = require("../utils/constant");
// middleware that is specific to this router
router.use((req, res, next) => {
   console.log("API Called ",new Date());
   /*
   //token autheticate
  let authenticURL = ['/getUsers','/getUser','/updateUser']
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
router.post("/addAdminType",function(req,res){
   console.log("adding new admin type");
   adminTypeController.addAdminType(req,res);
})
router.get("/getAdminType",function(req,res){
   adminTypeController.getAdminType(req,res);
 })
 router.get("/getParticularAdminType/:adminTypeId",function(req,res){
   adminTypeController.getParticularAdminType(req,res);
 })
 router.post("/updateAdminType/:adminTypeId",function(req,res){
   adminTypeController.updateAdminType(req,res);
})

module.exports = router;