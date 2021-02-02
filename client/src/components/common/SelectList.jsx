
import React from 'react'
import classnames from 'classnames'
import PropTypes from 'prop-types'
function SelectList({ name,
    onChange,
    placeholder,
    value,
    info,
    errors,
    options }) {

    const selectoptions = options.map((option) => {
        <option key={option.label} value={option.value}  >{option.label} </option>
    })

    return (

        <div className="inputBox" >
            <select
                onChange={onChange}
                value={value}
                name={name}
                className={classnames('form-control form-control-lg', { 'is-invalid': errors })} >
                {selectoptions} </select>

            {info && <small className='form-text text-muted' ></small>}
            {errors && <div className='invalid-feedback'>{errors}</div>}


        </div>

    )
}

SelectList.propTypes = {
    name: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
    value: PropTypes.string,
    info: PropTypes.string,
    errors: PropTypes.string,
    options: PropTypes.array.isRequired

}

export default SelectList;