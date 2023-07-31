
const userModel = require("../model/userSchema");
const adminModel = require("../model/adminSchema");
const adminTypeModel = require("../model/adminTypeSchema");
const CONSTANT  = require("../utils/constant");
const commonFunction = require("../utils/commonFunction");
const SMS           = require("../utils/SMS")
const EmailFun      = require("../utils/email");

const loginController = {
    "userLogin" : async function(req,res){
    
        let emailId = req.body.emailId;
        const validation = commonFunction.loginUserValidation(req.body)
        if(validation.status == true){
            // user exist or not with the email id provided if exist get it details
            userModel.find({emailId: emailId}).then((data) => {
                console.log("getting data",data)
                //let UserData = dat
               if (data.length==0) {//if it do not have any user with given emailId
                    res.status(403).send(CONSTANT.validation.loginUserNotExist);
                } else {
                    let password = req.body.password;
                    // Comparing Encypted Password with Database
                    data[0].comparePassword(password, function(matchError, isMatch) {
                        if (matchError) {// DB Failure
                            res.status(500).send(matchError);
                        } else if (!isMatch) { //if password do not match with given emailId
                            res.status(403).send(CONSTANT.validation.passwordNotMatch);
                        } else {
                            // we are good 
                            // create JWT Token 
                            let payLoad = {
                                email : data[0].emailId,
                                firstName : data[0].firstName
                            }
                            commonFunction.encryptJWT(payLoad,function(err, token) {
                                console.log(err);
                                if (err) {// any JWT Error or Not
                                    res.status(500).send(err);
                                }else{
                                    res.status(200).send({"message" : CONSTANT.validation.loginSuccess,token:token});
                                }
                            });
                        }
                    }) 
                }
            })
        }else{
            logger.warn(`Login API started PID ${PID} and Validation Unsuccessfull`);
            res.status(validation.statusCode).send(validation);
        }   
      
    },
    "adminLogin" : async function(req,res){
        
        let emailId = req.body.emailId;
        const validation = commonFunction.loginUserValidation(req.body)
        if(validation.status == true){
            // user exist or not with the email id provided if exist get it details
            adminModel.find({emailId: emailId}).then((data) => {
                console.log("getting data",data)
                //let UserData = dat
               if (data.length==0) {//if it do not have any user with given emailId
                    res.status(403).send(CONSTANT.validation.loginUserNotExist);
                } else {
                    let password = req.body.password;
                    // Comparing Encypted Password with Database
                    data[0].comparePassword(password, function(matchError, isMatch) {
                        if (matchError) {// DB Failure
                            res.status(500).send(matchError);
                        } else if (!isMatch) { //if password do not match with given emailId
                            res.status(403).send(CONSTANT.validation.passwordNotMatch);
                        } else {
                            // we are good 
                            // create JWT Token 
                            let payLoad = {
                                email : data[0].emailId,
                                firstName : data[0].firstName
                            }
                            commonFunction.encryptJWT(payLoad,function(err, token) {
                                console.log(err);
                                if (err) {// any JWT Error or Not
                                    res.status(500).send(err);
                                }else{
                                    res.status(200).send({"message" : CONSTANT.validation.loginSuccess,token:token});
                                }
                            });
                        }
                    }) 
                }
            })
        }else{
          //  logger.warn(`Login API started PID ${PID} and Validation Unsuccessfull`);
            res.status(validation.statusCode).send(validation);
        } 
    },
    "generateOTPUser" : function(req,res){
        const validation = commonFunction.adminForgotPasswordValidation(req.body)
        if(validation.status == true){
            let updateData = {
                "otp" : commonFunction.generateRandonPID(),
                "otpDateTime" : new Date()
            };
            let condition = '';
            if(req.body.type == CONSTANT.applicationConstant.emailType){
                condition = {"emailId" : req.body.emailId}
            }else{
                condition = {"mobileNo" : req.body.mobileNo} 
            }
            userModel.find(condition).then((list)=>{
                if(list.length==0){
                    res.status(403).send(CONSTANT.validation.adminWithMobileNoOrEmailExist);
                }else{
                    console.log(list[0]._id);
                    if(req.body.type == CONSTANT.applicationConstant.emailType){
                        // you should call email service and send OTP (updateData.otp)
                        EmailFun.sendUserOTP(list[0].emailId,updateData.otp);
                     }else{
                        SMS.sendOTP(list[0].mobileNo,updateData.otp)
                     }
                    
                    userModel.findOneAndUpdate({"_id":list[0]._id},updateData)
                    .then((adminType)=>{
                        res.send({"data" : {"message" : "OTP Send Successfully"},"OTP" : updateData.otp});
                    })
                }
            })
        }else{
            //  logger.warn(`Login API started PID ${PID} and Validation Unsuccessfull`);
              res.status(validation.statusCode).send(validation);
          } 
    },
    "generateOTPAdmin" : function(req,res){
        const validation = commonFunction.adminForgotPasswordValidation(req.body)
        if(validation.status == true){

            let updateData = {
                "otp" : commonFunction.generateRandonPID(),
                "otpDateTime" : new Date()
            };
            let condition = '';
            if(req.body.type == CONSTANT.applicationConstant.emailType){
                condition = {"emailId" : req.body.emailId}
            }else{
                condition = {"mobileNo" : req.body.mobileNo} 
            }
            adminModel.find(condition).then((list)=>{
                if(list.length==0){
                    res.status(403).send(CONSTANT.validation.adminWithMobileNoOrEmailExist);
                }else{
                    if(req.body.type == CONSTANT.applicationConstant.emailType){
                        EmailFun.sendAdminOTP(list[0].emailId,updateData.otp);
                     }else{
                        SMS.sendOTP(list[0].mobileNo,updateData.otp)
                     }
                    console.log(list[0]._id);
                    adminModel.findOneAndUpdate({"_id":list[0]._id},updateData)
                    .then((adminType)=>{
                        res.send({"data" : {"message" : "OTP Send Successfully"},"OTP" : updateData.otp});
                    })
                    
                }
            })
        }else{
            //  logger.warn(`Login API started PID ${PID} and Validation Unsuccessfull`);
              res.status(validation.statusCode).send(validation);
          } 
    },
    "adminUpdatePassword" : function(req,res){
        const validation = commonFunction.adminMatchOTPValidation(req.body)
        if(validation.status == true){
            console.log("old date",commonFunction.getOTPTimeoutTime())
            commonFunction.generateBCryptHash(req.body.password,function(hashPassword){

            
                let updateData = {
                    "otp" : "",
                    "otpDateTime" : "",
                    "password" : hashPassword
                };
                console.log(hashPassword);
                let condition = '';
                if(req.body.type == CONSTANT.applicationConstant.emailType){
                    condition = {"emailId" : req.body.emailId,otp : req.body.otp ,otpDateTime: { 
                                        $gt: commonFunction.getOTPTimeoutTime()
                                    }
                                };
                }else{
                    condition = {"mobileNo" : req.body.mobileNo,otp : req.body.otp ,otpDateTime: { 
                        $gt: commonFunction.getOTPTimeoutTime()} };
                }
                console.log(condition);
                adminModel.find(condition).then((list)=>{
                
                    if(list.length==0){
                        res.status(403).send(CONSTANT.validation.provideValidOTP);
                    }else{
                        console.log(list[0]._id);
                        console.log("updatedData",updateData);
                        adminModel.findOneAndUpdate({"_id":list[0]._id},updateData)
                        .then((adminType)=>{
                            res.send("Password Updated Successfully");
                        })
                        
                    }
                    }).catch((err)=>{
                    res.status(500).send(err);
                })
            })
        }else{
            //  logger.warn(`Login API started PID ${PID} and Validation Unsuccessfull`);
              res.status(validation.statusCode).send(validation);
          } 
    
    },
    "userUpdatePassword" : function(req,res){
        const validation = commonFunction.adminMatchOTPValidation(req.body)
        if(validation.status == true){
            console.log("old date",commonFunction.getOTPTimeoutTime())
            let updateData = {
                "otp" : "",
                "otpDateTime" : "",
                "password" : req.body.password
            };
            let condition = '';
            if(req.body.type == CONSTANT.applicationConstant.emailType){
                condition = {"emailId" : req.body.emailId,otp : req.body.otp ,otpDateTime: { 
                                    $gt: commonFunction.getOTPTimeoutTime()
                                }
                            };
            }else{
                condition = {"mobileNo" : req.body.mobileNo,otp : req.body.otp ,otpDateTime: { 
                    $gt: commonFunction.getOTPTimeoutTime()} };
            }
            console.log("Condition",condition);
            userModel.find(condition).then((list)=>{
                console.log(list);
                if(list.length==0){
                    res.status(403).send(CONSTANT.validation.provideValidOTP);
                }else{
                    console.log(list[0]._id);
                    console.log("updatedData",updateData);
                    userModel.findOneAndUpdate({"_id":list[0]._id},updateData)
                    .then((adminType)=>{
                        res.send("Password Updated Successfully");
                    })
                    
                }
                }).catch((err)=>{
                res.status(500).send(err);
            })
        }else{
            //  logger.warn(`Login API started PID ${PID} and Validation Unsuccessfull`);
              res.status(validation.statusCode).send(validation);
          } 
    
    },
    "loginAdminUsingOTP" : function(req,res){
        const validation = commonFunction.adminOTPLoginValidation(req.body)
        if(validation.status == true){
            let condition = '';
            if(req.body.type == CONSTANT.applicationConstant.emailType){
                condition = {"emailId" : req.body.emailId,otp : req.body.otp ,otpDateTime: { 
                                    $gt: commonFunction.getOTPTimeoutTime()
                                }
                            };
            }else{
                condition = {"mobileNo" : req.body.mobileNo,otp : req.body.otp ,otpDateTime: { 
                    $gt: commonFunction.getOTPTimeoutTime()
                            }
                         };
            }
            console.log(condition);
            adminModel.find(condition).then((data)=>{
                console.log("data",data);
                if(data.length==0){
                    res.status(403).send(CONSTANT.validation.provideValidOTP);
                }else{
                    let payLoad = {
                        email : data[0].emailId,
                        firstName : data[0].firstName,
                        mobileNo : data[0].mobileNo
                    }
                    console.log(payLoad);
                    commonFunction.encryptJWT(payLoad,function(err, token) {
                        console.log("error",err);
                        if (err) {// any JWT Error or Not
                            res.status(500).send(err);
                        }else{
                            res.status(200).send({"message" : CONSTANT.validation.loginSuccess,token:token});
                        }
                    });   
                }
            })
        }else{
            //  logger.warn(`Login API started PID ${PID} and Validation Unsuccessfull`);
              res.status(validation.statusCode).send(validation);
          } 
    },
    "loginUserUsingOTP" : function(req,res){
        const validation = commonFunction.adminOTPLoginValidation(req.body)
        if(validation.status == true){
            let condition = '';
            if(req.body.type == CONSTANT.applicationConstant.emailType){
                condition = {"emailId" : req.body.emailId,otp : req.body.otp ,otpDateTime: { 
                                    $gt: commonFunction.getOTPTimeoutTime()
                                }
                            };
            }else{
                condition = {"mobileNo" : req.body.mobileNo,otp : req.body.otp ,otpDateTime: { 
                    $gt: commonFunction.getOTPTimeoutTime()
                            }
                         };
            }
            console.log(condition);
            userModel.find(condition).then((data)=>{
                console.log("data",data);
                if(data.length==0){
                    res.status(403).send(CONSTANT.validation.provideValidOTP);
                }else{
                    let payLoad = {
                        email : data[0].emailId,
                        firstName : data[0].firstName,
                        mobileNo : data[0].mobileNo
                    }
                    console.log(payLoad);
                    commonFunction.encryptJWT(payLoad,function(err, token) {
                        console.log("error",err);
                        if (err) {// any JWT Error or Not
                            res.status(500).send(err);
                        }else{
                            res.status(200).send({"message" : CONSTANT.validation.loginSuccess,token:token});
                        }
                    });   
                }
            })
        }else{
            //  logger.warn(`Login API started PID ${PID} and Validation Unsuccessfull`);
              res.status(validation.statusCode).send(validation);
          } 
    }
}
module.exports = loginController;