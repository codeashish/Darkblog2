const validator = require('validator')

const isEmpty = require('./isEmpty')


module.exports=function validateLoginInput(data){
    let errors = {}


    data.username = !isEmpty(data.username) ? data.username : ''
    data.password = !isEmpty(data.password) ? data.password : ''


    if(validator.isEmpty(data.username)){
        errors.username='Username is required'

    }
    else{

        if(validator.isEmpty(data.password)){
            errors.password='Password is required'
        }
    }




return {
    errors,
    isValid:isEmpty(errors)
}

}