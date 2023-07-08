const express = require('express')
const router = express.Router()
// middleware that is specific to this router
router.use((req, res, next) => {
   
    //token autheticate
    // anythink
    next()
})
router.get("/",function(req,res){
   res.send("hello world");
})
router.get("/second",function(req,res){
    res.send("hello world from second class");
 })
module.exports = router;