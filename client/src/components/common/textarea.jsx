
import React from 'react'
import classnames from 'classnames'
import PropTypes from 'prop-types'
function Textareafield({ name,
    onChange,
    placeholder,
    value,
    info,
    errors,
    label }) {
    return (


        <div className="inputBox " >
            <label>{label}</label>
            <textarea

                placeholder={placeholder}
                onChange={onChange}
                value={value}
                name={name}
                style={{ resize: 'none', marginBottom: '4px', width: '100%', height: '200px' }}
                className={classnames('form-control form-control-lg', { 'is-invalid': errors })}
            />

            {info && <small className='form-text text-muted' >{info}</small>}
            {errors && <div className='invalid-feedback'>{errors}</div>}

        </div>

    )
}

Textareafield.propTypes = {
    name: PropTypes.string.isRequired,
    placeholder: PropTypes.string,
    onChange: PropTypes.func.isRequired,
    value: PropTypes.string,
    info: PropTypes.string,
    errors: PropTypes.string,

}

export default Textareafield;