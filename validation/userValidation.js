const validation = {
    blankCheck : function(data){
        if(typeof data !== 'undefined' && data.length != 0){
            return true
        }
        else{
            return false
        }
    },
    isNumber : function(data){
        if(isNaN(data)){
            return true //if it is a string
        }
        else{
            return false // if its a number
        }
    },
    maxCharacterLengthCheck : function(data,length){
        if(data.length <= length){
            return true
        }
        else{
            return false;
        }
        
    },
    minCharacterLengthCheck : function(data,length){
        if(data.length >= length){
            return true
        }
        else{
            return false;
        }
        
    },
    emailPatternCheck : function(data){
        var mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        if(data.value.match(mailformat))
        {
            return true
        }
        else{
            return false;
        }
    }
}
module.exports = validation;