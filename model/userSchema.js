const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required : true
  },
  lastName: {
    type: String
  },
  password : {
    type : String,
    required : true
  },
  address: [{
    type: String
  }],
  emailId: { 
    type: String,
    required:true,
    unique:true
  },
  mobileNo: [{ type: Number }],
  image : {
    type : String
  }
});
const User = mongoose.model("User", UserSchema); // users
module.exports = User;