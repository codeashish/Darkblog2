import React from 'react'
import classnames from 'classnames'
import PropTypes from 'prop-types'

function Inputfields({ name, type, onChange, placeholder, value, label, info, errors, disabled }) {

    return (


        <div className="inputBox" >
            {label && <label> <strong>  {label}</strong></label>}
            <input type={type?type:'text'}
                placeholder={placeholder}
                onChange={onChange}
                value={value}
                name={name}
                disabled={disabled}
                className={classnames('form-control form-control-lg  ', { 'is-invalid': errors })}
            />

    {info && <small className='form-text text-muted' >{info}</small>}
            {errors && <div className='invalid-feedback'>{errors}</div>}


        </div>

    )
}
Inputfields.propTypes={
    name: PropTypes.string.isRequired,
    placeholder: PropTypes.string,
    onChange: PropTypes.func.isRequired,
    value: PropTypes.string,
    info: PropTypes.string,
    errors: PropTypes.string,
}




export default Inputfields;