const mongoose = require("mongoose");
const CONSTANT  = require("../utils/constant");
const bcrypt = require("bcryptjs")
const UserSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required : true,
    trim : true
  },
  lastName: {
    type: String,
    trim : true
  },
  password : {
    type : String,
    required : true,
    trim : true
  },
  address: {
    type: String,
    trim : true
  },
  emailId: { 
    type: String,
    unique:true,
    trim : true
  },
  mobileNo: { 
    type: Number,
    required:true,
    unique:true 
  },
  status : {
    type : String,
    default : CONSTANT.applicationConstant.activeStatus,
    enum    :  CONSTANT.applicationConstant.statusEnum
  },
  lastLogin: { type: Date, default: Date.now },
  accountCreatedOn: { type: Date, default: Date.now },
  image : {
    type : String
  },
  otp : { type : String},
  otpDateTime : {type : Date}
});

UserSchema.pre("save", function (next) {
  const user = this

  if (this.isModified("password") || this.isNew) {
    bcrypt.genSalt(10, function (saltError, salt) {
      if (saltError) {
        return next(saltError)
      } else {
        bcrypt.hash(user.password, salt, function(hashError, hash) {
          if (hashError) {
            return next(hashError)
          }
          user.password = hash
          next()
        })
      }
    })
  } else {
    return next()
  }
})

UserSchema.methods.comparePassword = function(password, callback) {
  bcrypt.compare(password, this.password, function(error, isMatch) {
    if (error) {
      return callback(error)
    } else {
      callback(null, isMatch)
    }
  })
}

const User = mongoose.model("User", UserSchema); // users
module.exports = User;