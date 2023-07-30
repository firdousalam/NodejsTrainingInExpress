const Mongoose  = require("../config/mongoDBConfig")
const userModel = require("../model/userSchema");
const userController = {
    "addNewWallet" : async function(req,res){
        let insertData = {
                            "firstName" : req.body.firstName,
                            "lastName" : req.body.lastName,
                            "password" : req.body.password,
                            "address" : req.body.address,
                            "emailId" : req.body.emailId,
                            "mobileNo" : parseInt(req.body.mobileNo)
                        };
        const user = new userModel(insertData);
       try {
            await user.save(); // save data inside users table 
            res.send(user); //sending user json as response to client
    //        logger.info("User Saved successfully pid=9989888" ) // 7 day 30
        } catch (error) {
      //      logger.error("User Saved Error pid=9989888"+error )
            res.status(500).send(error);
        }
    },
    "getAllwallet" : function(req,res){
        console.log("getting all user");
        userModel.find({}).then((list)=>{
            res.send(list);
          }).catch((err)=>{
            res.status(500).send(err);
          })
    },
    "getParticularwallet" : function(req,res){
        userModel.find({"_id":req.params.walletId}).then((list)=>{
            res.send(list);
        }).catch((err)=>{
            res.send(err);
        })
    },
    "getParticularWalletByEmail" : function(req,res){
       // select firstName from users where emailId= "vvvvvv";
       console.log(req.query.email)
        userModel.find({"emailId":req.query.email}).select({"firstName":1}).then((list)=>{
            res.send(list);
        }).catch((err)=>{
            res.send(err);
        })
    },
    "updateWallet" : function(req,res){
        res.send("hello world from addNewUser")
    },
    "deleteWallet" : function(req,res){
        res.send("hello world from addNewUser")
    }
}
module.exports = userController;