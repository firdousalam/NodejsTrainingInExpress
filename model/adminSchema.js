const {mongoose,Schema} = require("mongoose");
const bcrypt = require("bcryptjs")
const CONSTANT  = require("../utils/constant");

const adminSchema = new mongoose.Schema({
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
        required : true
    },
    address: {
        type: String
    },
    emailId: { 
        type: String,
        required:true,
        unique:true
    },
    mobileNo: { 
        type: Number,
        required:true,
        unique:true 
    },
    adminType :  [{type : Schema.Types.ObjectId,ref:'adminType'}],
    status : {
        type : String,
        default : CONSTANT.applicationConstant.activeStatus,
        enum    :  CONSTANT.applicationConstant.statusEnum
    },
    otp : { type : String},
    otpDateTime : {type : Date}
});

adminSchema.pre("save", function (next) {
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

  adminSchema.methods.comparePassword = function(password, callback) {
    bcrypt.compare(password, this.password, function(error, isMatch) {
      if (error) {
        return callback(error)
      } else {
        callback(null, isMatch)
      }
    })
  }
const admin = mongoose.model("Admin", adminSchema);
module.exports = admin;