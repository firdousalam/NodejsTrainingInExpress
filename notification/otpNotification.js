const otpNotification = {
    "loginOTP" : async function(MobileNumber){
        return "login OTP send successfully";
    },
    "resetPasswordOTP" : function(MobileNumber){
        return "reset password OTP send successfully";
    },
    "registrationOTP" : function(MobileNumber){
       return "registration OTP send successfully";
    }
}
module.exports = userController;