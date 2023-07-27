const CONSTANT           = require("../utils/constant");
const validationFunction = require("../validation/userValidation");
const fs                 = require('fs-extra');
var path                 = require("path");
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

        return returnString;
    },
    "generateRandonPID" : function(){
        return Math.floor(Math.random() * 9000000000) + 1;

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
    }
}
module.exports = commonFunction;