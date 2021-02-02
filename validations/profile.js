const isEmpty = require('./isEmpty')
const validator = require('validator')
module.exports = valiateProfileInput = (data) => {
    console.log(data)
    let errors = {}
    data.name = !isEmpty(data.name) ? data.name : ''
    data.age = !isEmpty(data.age) ? data.age : ''
    data.phonenumber = !isEmpty(data.phonenumber) ? String(data.phonenumber) : ''
    data.interests = !isEmpty(data.interests) ? data.interests : ''
    data.bio = !isEmpty(data.bio) ? data.bio : ''


    if (isEmpty(data.name)) {
        errors.name = 'Name is required'
    } else if (!validator.isLength(data.name, {
            min: 2,
            max: 40
        })) {
        errors.name = 'Name must be between 2 to 40 characters'
    } else {
        if (isEmpty(data.age)) {
            errors.age = 'Age is required'
        } else if (data.age < 10 || data.age > 100) {
            errors.age = 'Age must be between 11 to 100  years'
        } else {
            if (isEmpty(data.phonenumber)) {
                errors.phonenumber = 'Phonenumber is required'
            } else if (!validator.isMobilePhone(data.phonenumber)) {
                errors.phonenumber = 'Enter a valid phone number'
            } else {
                if (!isEmpty(data.website)) {
                    if (!validator.isURL(data.website)) {
                        errors.website = 'Not a valid URL'


                    }
                } else {

                    if (isEmpty(data.interests)) {
                        errors.interests = 'Skills are required'
                    } else {
                        if (isEmpty(data.bio)) {
                            errors.bio = 'Bio is required'
                        } else if (!validator.isLength(data.bio, {
                                min: 20,
                                max: 200
                            })) {
                            errors.bio = 'Bio must be between 40 to 200 words'
                        } else {
                            if (!isEmpty(data.twitter)) {
                                if (!validator.isURL(data.twitter)) {
                                    errors.twitter = 'Enter a valid URL'
                                }

                            } else {
                                if (!isEmpty(data.instagram)) {
                                    if (!validator.isURL(data.instagram)) {
                                        errors.instagram = 'Enter a valid URL'
                                    }

                                } else {
                                    if (!isEmpty(data.linkedin)) {
                                        if (!validator.isURL(data.linkedin)) {
                                            errors.linkedin = 'Enter a valid URL'
                                        }

                                    } else {
                                        if (!isEmpty(data.youtube)) {
                                            if (!validator.isURL(data.youtube)) {
                                                errors.youtube = 'Enter a valid URL'
                                            }

                                        }
                                        if (!isEmpty(data.facebook)) {
                                            if (!validator.isURL(data.facebook)) {
                                                errors.facebook = 'Enter a valid URL'
                                            }

                                        }

                                    }
                                }

                            }
                        }

                    }

                }

            }
        }


    }











    return {
        isValid: isEmpty(errors),
        errors
    }

}