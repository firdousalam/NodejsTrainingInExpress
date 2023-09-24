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
            let condition = "";
            if(typeof req.body.emailId != 'undefined' && req.body.emailId != ''){
                condition = { $or:[ {'emailId':req.body.emailId}, {'mobileNo': parseInt(req.body.mobileNo)} ]}
            }
            else
            {
                condition =  {'mobileNo': parseInt(req.body.mobileNo)};
            }
            console.log(condition);
            userModel.find(condition).then((userList)=>{
                console.log(userList);
                if(userList.length==0){
                    const user = new userModel(insertData);
                    //  it will be save on any page or database and we can see only this logs using splunk or any other tools
                    try {
                        user.save(); // save data inside users table 
                    
                        res.send(user); //sending user json as response to client
                    //        logger.info("User Saved successfully pid=9989888" ) // 7 day 30
                    } catch (error) {
                    //      logger.error("User Saved Error pid=9989888"+error )
                    //    logger.error(`addNewUser API started PID ${PID} and it Return Catch Error ${error}`);
                        res.status(500).send(error);
                    }
                }else{
                    // logger.warn(`addNewUser API started PID ${PID} and Validation Unsuccessfull`);
                    res.status(403).send(CONSTANT.validation.adminWithMobileNoOrEmailExist);
                 }
            })
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
    "updateUser" : function(req,res){
        
        let updateData = {
            "firstName" : req.body.firstName,
            "lastName" : req.body.lastName,
            "address" : req.body.address,
            "emailId" : req.body.emailId,
            "mobileNo" : parseInt(req.body.mobileNo)
        };
        userModel.find({"status" : CONSTANT.applicationConstant.activeStatus,
                $or:[ {'emailId':req.body.emailId}, {'mobileNo': parseInt(req.body.mobileNo)} ],
                '_id': {$ne :  req.params.userId}}).then((list)=>{
                if(list.length>0){
                    res.status(403).send(CONSTANT.validation.adminWithMobileNoOrEmailExist);
                }else{
                    userModel.findOneAndUpdate({"_id":req.params.userId},updateData)
                    .then((adminType)=>{
                        res.send(updateData);
                    })
                }
              }).catch((err)=>{
                res.status(500).send(err);
              })
    }
}
module.exports = userController;