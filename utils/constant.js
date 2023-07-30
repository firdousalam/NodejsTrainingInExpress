const constant = {
    validation : {
        "blankuserName"             : "User Name Cannot be Blank",
        "mobileNumberLength"        : "Mobile Number Should be equal to 10 Digits",
        "blankFirstName"            : "First Name Cannot be Blank",
        "maxNameLength"             : 20,
        "MaxNameLengthMessage"      : "Name should be of Maximum 20 Character",
        "minNameLength"             : 20,
        "mobileNumberLength"        : 10,
        "passwordMaxLength"         : 20,
        "passwordMinLength"         : 8,
        "blankCommonMessage"        : "connot be blank",
        "blankAdminType"            : "Please Provide Admin Type",
        "loginUserNotExist"         : "User Not Exist, Please Register And Try Again",
        "passwordNotMatch"          : "Password Not Match",
        "loginSuccess"              : "Login Successful",
        "regionAlreadyExist"        : "Region Name Already Exist","blankCommonMessage" : "connot be blank",
        "blankEmailMessage"         : "EmailId Connot be Blank",
        "blankPasswordMessage"      : "Please Provide Your Password",
        "blankMobileNo"             : "Mobile No Cannot Be Blank",
        "blankData"                 : "Please Provide Valid Data",
        "adminTypeAlreadyExist"     : "Admin Type Already Exist",
        "blankAdminTypeID"          : "Please Provide AdminType ID",
        "adminWithMobileNoOrEmailExist" : "Admin With Same Mobile No or Email Id Already Exist",
        "blankValidCheckType"       : "Please Provide Valid Check",
        "blankOTP"                  : "Please Provide 6 digits OTP",
        "provideValidOTP"           : "Please Provide Valid 6 Digits OTP"
    },
    responseMessage : {
        "userCreatedSuccess" : "User Created Successfully"
    },
    errorMessage : {
        "emailDuplicate" : "emailId Already Exist"
    },
    responseCode : {
        "success" : 200,
        "notExist" : 404,
        "error"    : 500,
        "validation" : 403
    },
    applicationConstant : {
        activeStatus : "ACTIVE",
        inActiveStatus : "INACTIVE",
        statusEnum : ["ACTIVE","INACTIVE"],
        typeCheck  : ['email','phone'],
        emailType   : "email",
        phoneType   : "phone",
        OTPTimeout  : 10
    },
    JWT : {
        privateKey : "VVVVBBBVBVBVVB",
        algorithm  : "RS256"
    },
    algorithm : 'HS256',
    expireTime: 86400
}
module.exports = constant;