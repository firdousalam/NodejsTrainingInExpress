const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
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


/// before save (colllecting Data)(pre) --next-- actual save/Modify - post--next---response
// store procedure or simply trigger
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
UserSchema.methods.comparePassword = function(candidatePassword, cb) {
  bcrypt.compare(candidatePassword, this.password, function(err, isMatch) {
      if (err) return cb(err);
      cb(null, isMatch);
  });
};


const User = mongoose.model("User", UserSchema); // users
module.exports = User;