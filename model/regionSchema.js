const mongoose = require("mongoose");
const CONSTANT  = require("../utils/constant")
const regionSchema = new mongoose.Schema({
    region : {
        type : String,
        required:true,
        unique:true,
        trim : true
    },
    status : {
        type : String,
        default : CONSTANT.applicationConstant.activeStatus,
        enum    :  CONSTANT.applicationConstant.statusEnum
    },
    timeZone : {
        type    : String
    },
    displayTimeZone : {
        type    : String
    },
    countryCode : {
        type : String
    },
    createdOn : { type: Date, default: Date.now }
});
const region = mongoose.model("region", regionSchema);
module.exports = region;
