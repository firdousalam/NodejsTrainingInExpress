const adminTypeModel = require("../model/adminTypeSchema");
const validation = require("../validation/userValidation")
const CONSTANT  = require("../utils/constant")
const userController = {
    "addAdminType" : function(req,res){
        if(validation.blankCheck(req.body.adminType) && validation.blankCheck(req.body.region)){
            let insertData = {
                "adminType" : req.body.adminType,
                "region"    : req.body.region
            };
            console.log("insertData",insertData);
            adminTypeModel.find({"adminType" : req.body.adminType,"status" : CONSTANT.applicationConstant.activeStatus}).then((adminTypeList)=>{
                if(adminTypeList.length==0){
                    const adminType = new adminTypeModel(insertData);
                    try {
                        adminType.save(); 
                        res.send(adminType); 
                    } catch (error) {
                        res.status(500).send(error);
                    }
                }
                else{
                    res.status(403).send(CONSTANT.validation.adminTypeAlreadyExist);
                }
            });
        }else{
            res.status(403).send(CONSTANT.validation.blankAdminType);
        }
    },
    "getAdminType" : function(req,res){
        console.log("getting all user");
        adminTypeModel.find({"status" : CONSTANT.applicationConstant.activeStatus})
        .populate('region').then((list)=>{
            res.send(list);
          }).catch((err)=>{
            res.status(500).send(err);
          })
    },
    "getParticularAdminType" : function(req,res){
        if(typeof req.params.adminTypeId == 'undefined' || req.params.adminTypeId == '')
        {
            res.status(403).send(CONSTANT.validation.blankAdminTypeID);
        }
        else{
            adminTypeModel.find({"_id":req.params.adminTypeId,"status" : CONSTANT.applicationConstant.activeStatus})
                            .populate('region').then((list)=>{
                res.send(list);
            }).catch((err)=>{
                res.send(err);
            })
        }
    },
    "updateAdminType" : function(req,res){
       // select firstName from users where emailId= "vvvvvv";
       if(typeof req.params.adminTypeId == 'undefined' || req.params.adminTypeId == '')
        {
            res.status(403).send(CONSTANT.validation.blankAdminTypeID);
        }
        else{
            let updateData = {
                "adminType" : req.body.adminType,
                "region"    : req.body.region,
                "status"    : req.body.status
            };
            adminTypeModel.find({"status" : CONSTANT.applicationConstant.activeStatus,
                                "adminType":req.body.adminType,
                                '_id': {$ne :  req.params.adminTypeId}}).then((list)=>{
                if(list.length>0){
                    res.status(403).send(CONSTANT.validation.adminTypeAlreadyExist);
                }else{
                    adminTypeModel.findOneAndUpdate({"_id":req.params.adminTypeId},updateData)
                    .then((adminType)=>{
                        res.send(updateData);
                    })
                }
              }).catch((err)=>{
                res.status(500).send(err);
              })
        }
        
    }
}
module.exports = userController;