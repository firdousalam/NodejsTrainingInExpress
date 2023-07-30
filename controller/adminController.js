const Mongoose  = require("../config/mongoDBConfig")
const adminModel = require("../model/adminSchema");
const CONSTANT  = require("../utils/constant");
const commonFunction = require("../utils/commonFunction");

let deepPopulateAdmin = {
    path : 'adminType',
    populate : {
      path : 'region'
    }
  };
const userController = {
    "addAdmin" : function(req,res){

        // we will call one function and do validation from there
        const validation = commonFunction.adminValidation(req.body)
       
        if(validation.status == true){// is validation successfull
            
            let insertData = {
                                "firstName" : req.body.firstName,
                                "lastName" : req.body.lastName,
                                "password" : req.body.password,
                                "address" : req.body.address,
                                "emailId" : req.body.emailId,
                                "mobileNo" : parseInt(req.body.mobileNo),
                                "adminType" : req.body.adminType
                            };

            console.log((req.body));
            adminModel.find( { $or:[ {'emailId':req.body.emailId}, {'mobileNo': parseInt(req.body.mobileNo)} ]}).then((adminList)=>{
                if(adminList.length==0){
                    const admin = new adminModel(insertData);
                    //  it will be save on any page or database and we can see only this logs using splunk or any other tools
                    try {
                      admin.save(); // save data inside users table 
                    
                        res.send(admin); //sending user json as response to client
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
           // logger.warn(`addNewUser API started PID ${PID} and Validation Unsuccessfull`);
           console.log("i am here");
           
           res.status(validation.statusCode).send(validation.message);
        }
    },
    "getAdmins" : function(req,res){
        adminModel.find({"status" : CONSTANT.applicationConstant.activeStatus})
            .populate(deepPopulateAdmin)
            .then((list)=>{
            res.send(list);
          }).catch((err)=>{
            res.status(500).send(err);
          })
    },
    "getParticularAdmin" : function(req,res){
        adminModel.find({"_id":req.params.adminId})
        .populate(deepPopulateAdmin)
        .then((list)=>{
            res.send(list);
        }).catch((err)=>{
            res.send(err);
        })
    },
    "updateAdmin" : function(req,res){
       // select firstName from users where emailId= "vvvvvv";
       let updateData = {
            "firstName" : req.body.firstName,
            "lastName" : req.body.lastName,
            "address" : req.body.address,
            "emailId" : req.body.emailId,
            "mobileNo" : parseInt(req.body.mobileNo),
            "adminType" : req.body.adminType
        };
        adminModel.find({"status" : CONSTANT.applicationConstant.activeStatus,
                $or:[ {'emailId':req.body.emailId}, {'mobileNo': parseInt(req.body.mobileNo)} ],
                '_id': {$ne :  req.params.adminId}}).then((list)=>{
                if(list.length>0){
                    res.status(403).send(CONSTANT.validation.adminWithMobileNoOrEmailExist);
                }else{
                    adminModel.findOneAndUpdate({"_id":req.params.adminId},updateData)
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