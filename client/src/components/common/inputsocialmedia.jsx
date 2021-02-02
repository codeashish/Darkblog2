
import React from 'react'
import classnames from 'classnames'
import PropTypes from 'prop-types'



function InputSocailMedia({ name,
    onChange,
    placeholder,
    value,
    icon,
    type,

    errors }) {


        
    return (

        <div className="input-group mb-3 " style={{color:'#131419'}} >
            <div className="input-group-prepend  "  >
                <span className="input-group-text" style={{backgroundColor:'#131419',color:'#03e9f4',border:'1px solid #03e9f4',borderRadius:'15px' }} >
                    <i className={icon}   />
                </span>
            </div>



            <input
                type={type}
                placeholder={placeholder}
                onChange={onChange}
                value={value}
                name={name}
                className={classnames('form-control form-control-lg', { 'is-invalid': errors })}

                style={{background:'#131419',color:'#03e9f4',border:'1px solid #03e9f4',borderRadius:'15px',marginLeft:'4px'}}

              />

            {errors && <div className='invalid-feedback'>{errors}</div>}


        </div>

    )
}

InputSocailMedia.propTypes = {
    name: PropTypes.string.isRequired,
    placeholder: PropTypes.string,
    onChange: PropTypes.func.isRequired,
    value: PropTypes.string,
    icon: PropTypes.string,
    errors: PropTypes.string,
    type: PropTypes.string.isRequired

}

InputSocailMedia.defaultProps = {
    type: 'text'
}

export default InputSocailMedia;