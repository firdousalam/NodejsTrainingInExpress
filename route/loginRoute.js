const express = require('express')
const router = express.Router()
const loginController = require("../controller/loginController")
// middleware that is specific to this router
router.use((req, res, next) => {
   console.log("API Called ",new Date());
    next()
})
router.post("/adminLogin",function(req,res){
    loginController.adminLogin(req,res);
})
router.post("/userLogin",function(req,res){
    loginController.userLogin(req,res);
})
router.post("/generateOTPUser",function(req,res){
    loginController.generateOTPUser(req,res);
})
router.post("/generateOTPAdmin",function(req,res){
    loginController.generateOTPAdmin(req,res);
})


router.post("/adminUpdatePassword",function(req,res){
    loginController.adminUpdatePassword(req,res);
})
router.post("/userUpdatePassword",function(req,res){
    loginController.userUpdatePassword(req,res);
})


router.post("/loginAdminUsingOTP",function(req,res){
    loginController.loginAdminUsingOTP(req,res);
})
router.post("/loginUserUsingOTP",function(req,res){
    loginController.loginUserUsingOTP(req,res);
})
module.exports = router;