const express = require('express')
const router = express.Router()
const loginController = require("../controller/loginController")
// middleware that is specific to this router
router.use((req, res, next) => {
   console.log("API Called ",new Date());
    //token autheticate
    // anythink
   
    next()
})
router.post("/loginUser",function(req,res){
   loginController.userLogin(req,res);
})
module.exports = router;