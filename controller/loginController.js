
const UserModel = require("../model/userSchema");
const CONSTANT = require("../utils/constant") 
const commonFunction = require("../utils/commonFunction");
const logger = require("../config/loggerConfig");

const userController = {
    "userLogin" : async function(req,res){
        const PID = commonFunction.generateRandonPID(); // unique number
        logger.info(`Login API started PID ${PID} and Provided Data `+JSON.stringify(req.body));

        let emailId = req.body.emailId;
        const validation = commonFunction.loginUserValidation(req.body)
        logger.info(`Login API started PID ${PID} and Validation Complete and it return `+JSON.stringify(validation));
        
        if(validation.status == true){
            // user exist or not with the email id provided if exist get it details
            UserModel.find({emailId: emailId}).then((data) => {
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
    }
}
module.exports = userController;