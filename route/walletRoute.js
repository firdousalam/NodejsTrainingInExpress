const express = require('express')
const router = express.Router()
const userController = require("../controller/walletController")
// middleware that is specific to this router
router.use((req, res, next) => {
   console.log("Wallet API Called ",new Date());
    next()
})
router.post("/addWallet",function(req,res){
   userController.addNewUser(req,res);
})
router.get("/getWallet",function(req,res){
    userController.getAllUser(req,res);
 })
 router.get("/getWallet/:walletId",function(req,res){
   userController.getParticularUser(req,res);
 })
 router.get("/getUserByEmailId",function(req,res){
   userController.getParticularUserByEmail(req,res);
 })
 router.put("/updateUser/:walletId",function(req,res){
    userController.updateUser(req,res);
 })
 router.delete("/deleteUser/:walletId",function(req,res){
    userController.deleteUser(req,res);
 })
module.exports = router;