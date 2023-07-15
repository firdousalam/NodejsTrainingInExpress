const constant = {
    validation : {
        "blankuserName" : "User Name Cannot be Blank",
        "mobileNumberLength" : "Mobile Number Should be equal to 10 Digits",
        "blankFirstName" : "First Name Cannot be Blank",
        "maxNameLength" : 20,
        "MaxNameLengthMessage" : "Name should be of Maximum 20 Character",
        "minNameLength" : 20,
        "mobileNumberLength" : 10,
        "passwordMaxLength" : 20,
        "passwordMinLength"  : 8,
        "blankCommonMessage" : "connot be blank"
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
    }
}
module.exports = constant;