
const regionModel = require("../model/regionSchema");
const validation = require("../validation/userValidation")
const CONSTANT  = require("../utils/constant")
const regionController = {
    "addNewRegion" :  function(req,res){
        if(validation.blankCheck(req.body.region) 
            && validation.blankCheck(req.body.timeZone)
            && validation.blankCheck(req.body.displayTimeZone)
            && validation.blankCheck(req.body.countryCode)
        ){
            let insertData = {
                "region" : req.body.region,
                "timeZone" : req.body.timeZone,
                "displayTimeZone" : req.body.displayTimeZone,
                "countryCode" : req.body.countryCode,
                "status"    : CONSTANT.applicationConstant.activeStatus
            };
            regionModel.find({"region" : req.body.region,"status" : CONSTANT.applicationConstant.activeStatus})
            .then((list)=>{
                console.log("region",list);
                if(list.length==0){
                    const region = new regionModel(insertData);
                    try {
                        region.save(); 
                        res.send(region); 
                    } catch (error) {
                        res.status(500).send(error);
                    }
                }else{
                    res.status(403).send(CONSTANT.validation.regionAlreadyExist);
                }
            });
        }else{
            res.status(403).send(CONSTANT.validation.blankCommonMessage);
        }
    },
    "getRegion" : function(req,res){
        console.log("getting all Region");
        regionModel.find({}).then((list)=>{
            res.send(list);
          }).catch((err)=>{
            res.status(500).send(err);
          })
    },
    "getParticularRegion" : function(req,res){
        console.log("getting all Region");
        regionModel.find({"_id":req.params.regionId}).then((list)=>{
            res.send(list);
          }).catch((err)=>{
            res.status(500).send(err);
          })
    },
    "updateRegion": function(req,res){
        console.log("Update Region");
        let updateData = {
            "region" : req.body.region,
            "timeZone" : req.body.timeZone,
            "displayTimeZone" : req.body.displayTimeZone,
            "countryCode" : req.body.countryCode,
            "status"    : CONSTANT.applicationConstant.activeStatus
        };
        regionModel.find({"status" : CONSTANT.applicationConstant.activeStatus,
                        "region" : req.body.region,
                        '_id': {$ne : req.params.regionId}}).then((list)=>{
            if(list.length>0){
                res.status(403).send(CONSTANT.validation.regionAlreadyExist);
            }else{
                regionModel.findOneAndUpdate({"_id":req.params.regionId},updateData)
                .then((region)=>{
                    res.send(updateData);
                })
            }
          }).catch((err)=>{
            res.status(500).send(err);
          })
    }
}
module.exports = regionController;