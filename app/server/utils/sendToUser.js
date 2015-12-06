function sendToUser (status,message,dataObj){
    var obj;
    if((status===undefined|| status===null )&&(status !=='error' ||status !=='success'))
        return "Problem Status="+status + ". type of status value allowed :error and success ";
    if((message===undefined|| message===null )&&message.length <=0 && typeof message !=='string')
        return "Problem Message="+message;

    obj = {
        status : status,
        message:message
    };

    if((dataObj!==undefined|| dataObj!==null ) && typeof dataObj === 'object')
        obj.kapsule = dataObj;
    else
        obj.kapsule = {};

    return obj;
}

module.exports = sendToUser;
