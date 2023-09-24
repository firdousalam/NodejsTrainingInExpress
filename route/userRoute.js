const express = require('express')
const router = express.Router()
const userController = require("../controller/userController")
// middleware that is specific to this router
router.use((req, res, next) => {
   console.log("API Called ",new Date());
    next()
})
router.post("/addUser",function(req,res,next){
   userController.addNewUser(req,res);
   next();
})
router.get("/getUsers",function(req,res){
    userController.getAllUser(req,res);
 })
 router.get("/getUser/:userId",function(req,res){
   userController.getParticularUser(req,res);
 })
 router.post("/updateUser/:userId",function(req,res){
    userController.updateUser(req,res);
 })
module.exports = router;