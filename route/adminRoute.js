const express = require('express')
const router = express.Router()
const adminController = require("../controller/adminController");
const commonFunction = require("../utils/commonFunction");
const CONSTANT = require("../utils/constant");
// middleware that is specific to this router
router.use((req, res, next) => {
   console.log("API Called ",new Date());
   // RBAC
   //token autheticate
  let authenticURL = ['/addAdmin','/getParticularAdmin','/updateAdmin']
   if(authenticURL.includes(req.path))
   {
     let token = req.headers.authorization;
     commonFunction.decryptJWT(token,function(error,data){
        if(error){
           res.status(403).send(CONSTANT.validation.loginUserNotExist);
        }else{
            if(data.type == 'super'){
               next()
            }
            else
            {
               res.status(403).send(CONSTANT.validation.loginUserNotExist);
            }
        } 
     })
   }else
   {
     next()
   }
   
  // next()
})
router.post("/addAdmin",function(req,res){
   console.log("adding new admin ");
   adminController.addAdmin(req,res);
})
router.get("/getAdmins",function(req,res){
   adminController.getAdmins(req,res);
 })
 router.get("/getParticularAdmin/:adminId",function(req,res){
   adminController.getParticularAdmin(req,res);
 })
 router.post("/updateAdmin/:adminId",function(req,res){
   adminController.updateAdmin(req,res);
})

module.exports = router;