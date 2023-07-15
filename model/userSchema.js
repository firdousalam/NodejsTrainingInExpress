const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  firstName: {   //no of character  , string only  , not special character, not blank
    type: String,
    required : true
  },
  lastName: {  //no of character  , string only  , not special character
    type: String
  },
  password : { // min length ,max length, cotain special charecter ,capital letter number,not blank
    type : String,
    required : true
  },
  address: [{ // not blank ,max charcater
    type: String
  }],
  emailId: {  // not blank ,uniques,email patter
    type: String,
    required:true,
    unique:true
  },
  mobileNo: [{ type: Number }],  // should be number and not blank ,length
  image : {
    type : String
  }
});
const User = mongoose.model("User", UserSchema); // users
module.exports = User;