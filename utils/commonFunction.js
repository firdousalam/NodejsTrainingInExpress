const CONSTANT = require("../utils/constant");
const validationFunction = require("../validation/userValidation");
const jwt                 = require("jsonwebtoken");
const bcrypt              = require("bcrypt");             
require('dotenv').config()
let secretKey           = process.env.JWT_SECRET_KEY;

const commonFunction = {
    "userValidation" : function(body){
        let returnString = {"status" : true,"statusCode":"","message" : "success"}
       /*
       "firstName" : req.body.firstName,
        "lastName" : req.body.lastName,
        "password" : req.body.password,
        "address" : req.body.address,
        "emailId" : req.body.emailId,
        "mobileNo" : parseInt(req.body.mobileNo)
        */
       // checking Body //
       if(!validationFunction.blankCheck(body)){
            returnString.status = false;
            returnString.statusCode = CONSTANT.responseCode.validation;
            returnString.message = CONSTANT.validation.blankCommonMessage;
            return returnString;

       }
       // Validating First Name //
       if(!validationFunction.blankCheck(body.firstName)){
            returnString.status = false;
            returnString.statusCode = CONSTANT.responseCode.validation;
            returnString.message = CONSTANT.validation.blankFirstName;
            return returnString;
        }
        if(!validationFunction.maxCharacterLengthCheck(body.firstName,CONSTANT.validation.maxNameLength)){
            returnString.status = false;
            returnString.statusCode = CONSTANT.responseCode.validation;
            returnString.message = CONSTANT.validation.MaxNameLengthMessage;
            return returnString;
        }
        // validating Password //
        if(!validationFunction.blankCheck(body.mobileNo)){
            returnString.status = false;
            returnString.statusCode = CONSTANT.responseCode.validation;
            returnString.message = CONSTANT.validation.blankMobileNo;
            return returnString;
        }
        

        return returnString;
    },
    "adminValidation" : function(body){
        let returnString = {"status" : true,"statusCode":"","message" : "success"}
       /*
       "firstName" : req.body.firstName,
        "lastName" : req.body.lastName,
        "password" : req.body.password,
        "address" : req.body.address,
        "emailId" : req.body.emailId,
        "mobileNo" : parseInt(req.body.mobileNo)
        */
       // checking Body //
       if(!validationFunction.blankCheck(body)){
            returnString.status = false;
            returnString.statusCode = CONSTANT.responseCode.validation;
            returnString.message = CONSTANT.validation.blankCommonMessage;
            return returnString;

       }
       // Validating First Name //
       if(!validationFunction.blankCheck(body.firstName)){
            returnString.status = false;
            returnString.statusCode = CONSTANT.responseCode.validation;
            returnString.message = CONSTANT.validation.blankFirstName;
            return returnString;
        }
        if(!validationFunction.maxCharacterLengthCheck(body.firstName,CONSTANT.validation.maxNameLength)){
            returnString.status = false;
            returnString.statusCode = CONSTANT.responseCode.validation;
            returnString.message = CONSTANT.validation.MaxNameLengthMessage;
            return returnString;
        }
        // validating Password //
        if(!validationFunction.blankCheck(body.password)){
            returnString.status = false;
            returnString.statusCode = CONSTANT.responseCode.validation;
            returnString.message = CONSTANT.validation.blankFirstName;
            return returnString;
        }
        if(!validationFunction.maxCharacterLengthCheck(body.password,CONSTANT.validation.passwordMaxLength)){
            returnString.status = false;
            returnString.statusCode = CONSTANT.responseCode.validation;
            returnString.message = CONSTANT.validation.blankFirstName;
            return returnString;
        }
        if(!validationFunction.blankCheck(body.adminType)){
            returnString.status = false;
            returnString.statusCode = CONSTANT.responseCode.validation;
            returnString.message = CONSTANT.validation.blankAdminType;
            return returnString;
        }
        return returnString;
    },
    "generateRandonPID" : function(){
        return Math.floor(Math.random() * 900000) + 1;

    },
    "cleanLoggerFile" : function(){
        const errorLogFile =  path.resolve(__dirname, "../logger/errorLogger.log");
        const infoLogFile =  path.resolve(__dirname, "../logger/infoLogger.log");
        const warningLogFile =  path.resolve(__dirname, "../logger/warningLogger.log");
       
        fs.writeFile(errorLogFile, "", err => {
            if (err) {
              console.error(err);
            }
            console.log("error log has been cleaned")
          });
          fs.writeFile(infoLogFile, "", err => {
            if (err) {
              console.error(err);
            }
            console.log("infoLogFile has been cleaned")
          });
          fs.writeFile(warningLogFile, "", err => {
            if (err) {
              console.error(err);
            }
            // file written successfully
            console.log("warningLogFile has been cleaned")
          });
    },
    loginUserValidation : function(body){
      let returnString = {"status" : true,"statusCode":"","message" : "success"}
      if(!validationFunction.blankCheck(body)){
        returnString.status = false;
        returnString.statusCode = CONSTANT.responseCode.validation;
        returnString.message = CONSTANT.validation.blankCommonMessage;
        return returnString;

      }
      if(!validationFunction.blankCheck(body.emailId)){
        returnString.status = false;
        returnString.statusCode = CONSTANT.responseCode.validation;
        returnString.message = CONSTANT.validation.blankEmailMessage;
        return returnString;
      }
      if(!validationFunction.blankCheck(body.password)){
        returnString.status = false;
        returnString.statusCode = CONSTANT.responseCode.validation;
        returnString.message = CONSTANT.validation.blankPasswordMessage;
        return returnString;
      }
      return returnString;
    },
    "encryptJWT" : function(data,callback){
     
      jwt.sign(data, secretKey, {
        "algorithm": CONSTANT.algorithm,
        "expiresIn": CONSTANT.expireTime // expires in 24 hours
      }, function(err, token) {
        callback(err,token);
      });

    },
    "decryptJWT" : function(token,callback){
      jwt.verify(token, secretKey, function(err, decoded) {
        callback(err,decoded);
      });
    }, 
    "adminForgotPasswordValidation" : function(body){
      let returnString = {"status" : true,"statusCode":"","message" : "success"}
      if(!validationFunction.blankCheck(body)){
        returnString.status = false;
        returnString.statusCode = CONSTANT.responseCode.validation;
        returnString.message = CONSTANT.validation.blankCommonMessage;
        return returnString;
      }
      if(!validationFunction.blankCheck(body.type)){
        returnString.status = false;
        returnString.statusCode = CONSTANT.responseCode.validation;
        returnString.message = CONSTANT.validation.blankValidCheckType;
        return returnString;
      }
      if(!(CONSTANT.applicationConstant.typeCheck).includes(body.type)){
          returnString.status = false;
          returnString.statusCode = CONSTANT.responseCode.validation;
          returnString.message = CONSTANT.validation.blankValidCheckType;
          return returnString;
      }
      if(body.type == CONSTANT.applicationConstant.emailType){
        if(!validationFunction.blankCheck(body.emailId)){
          returnString.status = false;
          returnString.statusCode = CONSTANT.responseCode.validation;
          returnString.message = CONSTANT.validation.blankEmailMessage;
          return returnString;
        }
      }
      if(body.type == CONSTANT.applicationConstant.phoneType){
        if(!validationFunction.blankCheck(body.mobileNo)){
          returnString.status = false;
          returnString.statusCode = CONSTANT.responseCode.validation;
          returnString.message = CONSTANT.validation.blankPasswordMessage;
          return returnString;
        }
      }
      return returnString
    },
    "adminMatchOTPValidation" : function(body){
      let returnString = {"status" : true,"statusCode":"","message" : "success"}
      if(!validationFunction.blankCheck(body)){
        returnString.status = false;
        returnString.statusCode = CONSTANT.responseCode.validation;
        returnString.message = CONSTANT.validation.blankCommonMessage;
        return returnString;
      }
      if(!validationFunction.blankCheck(body.type)){
        returnString.status = false;
        returnString.statusCode = CONSTANT.responseCode.validation;
        returnString.message = CONSTANT.validation.blankValidCheckType;
        return returnString;
      }
      if(!(CONSTANT.applicationConstant.typeCheck).includes(body.type)){
          returnString.status = false;
          returnString.statusCode = CONSTANT.responseCode.validation;
          returnString.message = CONSTANT.validation.blankValidCheckType;
          return returnString;
      }
      if(body.type == CONSTANT.applicationConstant.emailType){
        if(!validationFunction.blankCheck(body.emailId)){
          returnString.status = false;
          returnString.statusCode = CONSTANT.responseCode.validation;
          returnString.message = CONSTANT.validation.blankEmailMessage;
          return returnString;
        }
      }
      if(body.type == CONSTANT.applicationConstant.phoneType){
        if(!validationFunction.blankCheck(body.mobileNo)){
          returnString.status = false;
          returnString.statusCode = CONSTANT.responseCode.validation;
          returnString.message = CONSTANT.validation.blankPasswordMessage;
          return returnString;
        }
      }
      if(!validationFunction.blankCheck(body.otp)){
        returnString.status = false;
        returnString.statusCode = CONSTANT.responseCode.validation;
        returnString.message = CONSTANT.validation.blankOTP;
        return returnString;
      }
      if(!validationFunction.blankCheck(body.password)){
        returnString.status = false;
        returnString.statusCode = CONSTANT.responseCode.validation;
        returnString.message = CONSTANT.validation.blankPasswordMessage;
        return returnString;
      }
      return returnString
    },
    "adminOTPLoginValidation" : function(body){
      let returnString = {"status" : true,"statusCode":"","message" : "success"}
      if(!validationFunction.blankCheck(body)){
        returnString.status = false;
        returnString.statusCode = CONSTANT.responseCode.validation;
        returnString.message = CONSTANT.validation.blankCommonMessage;
        return returnString;
      }
      if(!validationFunction.blankCheck(body.type)){
        returnString.status = false;
        returnString.statusCode = CONSTANT.responseCode.validation;
        returnString.message = CONSTANT.validation.blankValidCheckType;
        return returnString;
      }
      if(!(CONSTANT.applicationConstant.typeCheck).includes(body.type)){
          returnString.status = false;
          returnString.statusCode = CONSTANT.responseCode.validation;
          returnString.message = CONSTANT.validation.blankValidCheckType;
          return returnString;
      }
      if(body.type == CONSTANT.applicationConstant.emailType){
        if(!validationFunction.blankCheck(body.emailId)){
          returnString.status = false;
          returnString.statusCode = CONSTANT.responseCode.validation;
          returnString.message = CONSTANT.validation.blankEmailMessage;
          return returnString;
        }
      }
      if(body.type == CONSTANT.applicationConstant.phoneType){
        if(!validationFunction.blankCheck(body.mobileNo)){
          returnString.status = false;
          returnString.statusCode = CONSTANT.responseCode.validation;
          returnString.message = CONSTANT.validation.blankPasswordMessage;
          return returnString;
        }
      }
      if(!validationFunction.blankCheck(body.otp)){
        returnString.status = false;
        returnString.statusCode = CONSTANT.responseCode.validation;
        returnString.message = CONSTANT.validation.blankOTP;
        return returnString;
      }
      return returnString
    },
    getOTPTimeoutTime : function(){
      return  new Date().getTime() - 1000 * 60 * CONSTANT.applicationConstant.OTPTimeout;
    },
    generateBCryptHash : function(data,cb){
      bcrypt.genSalt(10, function (saltError, salt) {
        console.log(saltError,"saltError")
          bcrypt.hash(data, salt, function(hashError, hash) {
            console.log("hashError",hashError)
            console.log(hash)
             cb(hash);
          })
      })
    }
}
module.exports = commonFunction;