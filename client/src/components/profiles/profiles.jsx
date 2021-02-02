import React, { Component } from 'react'
import { connect } from 'mongoose'
import PropTypes from 'prop-types'
import Spinner from './../common/spinner'
import {getProfiles} from '../../actions/profileactions'
 class Profiles extends Component {
    
    
    componentDidMount(){
        this.props.getProfiles()
    }
    
    render() {
            const {profiles,loading}=this.props.profile;
            let profileItems;
        if(profiles===null||loading){
            profileItems=<Spinner/>
        }
        else{
            if(profiles.length>0){
                <h1>Profiles Here</h1>
            }
            else{
                profileItems=<h4>No Profiles Found </h4>
            }
        }

        return (
            <div>
                
            </div>
        )
    }
}


const mapStateToProps=state=>({
    profile:state.profile
})

Profiles.propTypes={
    getProfiles:PropTypes.func.isRequired,
    profile:PropTypes.object.isRequired
}

export default connect(mapStateToProps,{getProfiles})(withRouter(Profiles))