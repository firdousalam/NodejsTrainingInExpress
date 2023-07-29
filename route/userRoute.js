const express = require('express')
const router = express.Router()
const userController = require("../controller/userController")
const commonFunction = require("../utils/commonFunction");
const CONSTANT = require("../utils/constant");
// middleware that is specific to this router
router.use((req, res, next) => {
   console.log("API Called ",new Date());
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
})
router.post("/addUser",function(req,res){
   userController.addNewUser(req,res);
})
router.get("/getUsers",function(req,res){
  // console.log(req);
    userController.getAllUser(req,res);
 })
 router.get("/getUser/:userId",function(req,res){
   userController.getParticularUser(req,res);
 })
 router.get("/getUserByEmailId",function(req,res){
   userController.getParticularUserByEmail(req,res);
 })
 router.put("/updateUser/:userId",function(req,res){
    userController.updateUser(req,res);
 })
 router.delete("/deleteUser/:userId",function(req,res){
    userController.deleteUser(req,res);
 })
module.exports = router;