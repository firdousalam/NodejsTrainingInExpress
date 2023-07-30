const {mongoose,Schema} = require("mongoose");
const CONSTANT  = require("../utils/constant");

const adminTypeSchema = new mongoose.Schema({
    adminType : {
        type : String,
        required:true,
        unique:true,
        trim : true
    },
    region      : [{type : Schema.Types.ObjectId,ref:'region'}],
    status : {
        type : String,
        default : CONSTANT.applicationConstant.activeStatus,
        enum    :  CONSTANT.applicationConstant.statusEnum
      },
    createdOn : { type: Date, default: Date.now }
});
const adminType = mongoose.model("adminType", adminTypeSchema);
module.exports = adminType;
