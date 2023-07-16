const CONSTANT = require("../utils/constant");
const validationFunction = require("../validation/userValidation");

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

    }
}
module.exports = commonFunction;