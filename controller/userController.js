const Mongoose  = require("../config/mongoDBConfig")
const userModel = require("../model/userSchema");
const userController = {
    "addNewUser" : async function(req,res){
        // validation will be your homework 
      //  logger.info("add user process started pid=9989888" )
      //  logger.info("save User Data pid=9989888", req.body )
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
       // select firstName from users where emailId= "vvvvvv";
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