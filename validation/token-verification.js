const isEmpty =require("./is-empty") ;
const Validator = require("validator");


module.exports=function validateTokenInput(data){
    let errors ={};


    if(Validator.isEmpty(data.secretToken)){
        errors.secretToken="Confirmation code is not working";
    }
    return{
        errors,
        isValid: isEmpty(errors)
    }
    }