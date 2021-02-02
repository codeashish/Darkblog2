const validator = require('validator')

const isEmpty = require('./isEmpty')
module.exports = function validateRegisterInput(data) {
    let errors = {}

    data.username = !isEmpty(data.username) ? data.username : ''
    data.email = !isEmpty(data.email) ? data.email : ''
    data.password = !isEmpty(data.password) ? data.password : ''
    data.password2 = !isEmpty(data.password2) ? data.password2 : ''
    data.termsandconditions=!isEmpty(data.termsandconditions)?data.termsandconditions:''
    

    if (validator.isEmpty(data.username)) {
        errors.username = 'Username is required'
    } else if (!validator.isAlphanumeric(data.username)) {
        errors.username = 'Special characters not allowed'

    } else if (!validator.isLength(data.username, {
            min: 2,
            max: 40
        })) {
        errors.username = 'Username must be between 2 to 40 characters'
    } else {
         


            if (validator.isEmpty(data.email)) {
                errors.email = 'Email is required'
            } else if (!validator.isEmail(data.email)) {
                errors.email = 'Enter a valid email'

            } else {
                if (isEmpty(data.password)) {
                    errors.password = 'Password is required'
                } else if (!validator.isLength(data.password, {
                        min: 4,
                        max: 40
                    })) {
                    errors.password = 'Password must be between 4 to 40 characters'
                } else if (!validator.matches(data.password, /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[a-zA-Z\d@$.!%*#?&]/)) {

                    errors.password = 'Password must contain  at least one uppercase letter, one lowercase letter, one number and one special character'
                } else {
                    if (validator.isEmpty(data.password2)) {
                        errors.password2 = "Confirm password is required"
                    } else {
                        if (!validator.equals(data.password, data.password2)) {
                            errors.password2 = 'Conform Password does not matched'
                        }
                        else{
                            if(validator.isEmpty(data.termsandconditions)){
                                errors.termsandconditions='Please agree to terms and connditions'
                            }
                            
                        }

                    }

                }
            }
        
    }


















    return {
        errors,
        isValid: isEmpty(errors)
    }

}