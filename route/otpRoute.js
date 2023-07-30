const express = require('express')
const router = express.Router()
const userController = require("../controller/priceManagementController")
// middleware that is specific to this router
router.use((req, res, next) => {
   console.log("API Called ",new Date());
    next()
})
router.post("/addUser",function(req,res){
   userController.addNewUser(req,res);
})
router.get("/getUsers",function(req,res){
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