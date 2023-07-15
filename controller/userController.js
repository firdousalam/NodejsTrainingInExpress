const Mongoose  = require("../config/mongoDBConfig")
const userModel = require("../model/userSchema");
const CONSTANT = require("../utils/constant") 
const commonFunction = require("../utils/commonFunction")
const userController = {
    "addNewUser" : async function(req,res){
        // we will call one function and do validation from there
        const validation = commonFunction.userValidation(req.body)
        if(validation.status == true){// is validation successfull
            let insertData = {
                                "firstName" : req.body.firstName,
                                "lastName" : req.body.lastName,
                                "password" : req.body.password,
                                "address" : req.body.address,
                                "emailId" : req.body.emailId,
                                "mobileNo" : parseInt(req.body.mobileNo)
                            };

            console.log((req.body));
            const user = new userModel(insertData);
        
            
            //  it will be save on any page or database and we can see only this logs using splunk or any other tools
            try {
                await user.save(); // save data inside users table 
                res.send(user); //sending user json as response to client
            //        logger.info("User Saved successfully pid=9989888" ) // 7 day 30
            } catch (error) {
            //      logger.error("User Saved Error pid=9989888"+error )
                res.status(500).send(error);
            }
        }else{
            res.status(validation.statusCode).send(validation.message);
        }

    },
    "getAllUser" : function(req,res){
        console.log("getting all user");
        userModel.find({}).then((list)=>{
            res.send(list);
          }).catch((err)=>{
            res.status(500).send(err);
          })
    },
    "getParticularUser" : function(req,res){
        userModel.find({"_id":req.params.userId}).then((list)=>{
            res.send(list);
        }).catch((err)=>{
            res.send(err);
        })
    },
    "getParticularUserByEmail" : function(req,res){
     
        
       console.log(req.query.email)
        userModel.find({"emailId":req.query.email}).select({"firstName":1}).then((list)=>{
            res.send(list);
        }).catch((err)=>{
            res.send(err);
        })
    },
    "updateUser" : function(req,res){
        res.send("hello world from addNewUser")
    },
    "deleteUser" : function(req,res){
        res.send("hello world from addNewUser")
    }
}
module.exports = userController;