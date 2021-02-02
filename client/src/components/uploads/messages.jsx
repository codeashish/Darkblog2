import React from 'react'
import PropTypes from 'prop-types'

const Messages = ({ message }) => {
    return (
        <div className="alert alert-info alert-dismissible fade show" role="alert">
            {message}
            <button type="button" className="close" data-dismiss="alert" aria-label="Close">
                <span aria-hidden="true">&times;</span>
            </button>
        </div>
    )
}

Messages.propTypes = {
    message: PropTypes.string.isRequired,

}

export default Messages
