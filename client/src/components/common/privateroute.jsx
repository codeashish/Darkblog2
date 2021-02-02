import React from 'react'
import { Route, Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'


const Privateroute = ({ component: Component, auth, ...rest }) => (
    <Route
        {...rest}
        render={props =>
            (auth.isAuthenticated === true) ? (
                <Component{...props} />


            ) : (<Redirect to='/login' />)}

    ></Route>

)

const mapStateToProps = (state) => ({
    auth: state.auth,
})
Privateroute.propTypes = {
    auth: PropTypes.object.isRequired
}

export default connect(mapStateToProps, {})(Privateroute)


    