import React, { Component } from 'react'
import Profileheader from './Profileheader'
import Profileabout from './Profileabout'
import Profilecreds from './Profilecreds'
import Profilegithub from './Profilegithub'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import Spinner from '../common/spinner'
import { connect } from 'react-redux'
import { getProfileByUsername } from '../../actions/profileactions'
import Footer from './../layouts/footer'

class Profile extends Component {

    componentDidMount() {
        if (this.props.match.params.username) {
            this.props.getProfileByUsername(this.props.match.params.username)

        }

    }

    componentWillReceiveProps(nextprops) {
        if (nextprops.profile.profile === null && this.props.profile.loading) {
            this.props.history.push('/notfound')

        }
    }

    render() {
        const { profile, loading } = this.props.profile;
        let profileContent;
        if (profile == null || loading) {
            profileContent = <Spinner />
        }
        else {
            profileContent = (
                <div >
                    <div className="row" style={{ color: '#03e9f4' }} >
                        <div className="col-md-6">
                            <Link to='/bloggers' className='btn  m-3 float-left' style={{ padding: '20px', borderRadius: '10px', backgroundColor: '#131419', color: '#03e9f4', border: '2px solid red' }}   >
                                Back To Bloggers </Link>
                        </div>
                        <div className="col-md-6" />
                        <Profileheader profile={profile} />
                        <Profileabout profile={profile} />

                        <Profilecreds education={profile.education} experience={profile.experience} />
                        {(profile.social && profile.social.githubusername) ? (<Profilegithub username={profile.social.githubusername} />) : null}


                    </div>
                </div>

            )
        }
        return (
            <div className='profile' style={{ background: 'black', marginTop: '-25px' }} >
                <div className="container">
                    <div className="row">
                        <div className="col-md-12">
                            {profileContent}
                        </div>
                    </div>
                </div>
                <Footer/>
            </div>
        )
    }
}

Profile.propTypes = {
    profile: PropTypes.object,
    getProfileByUsername: PropTypes.func
}

const mapStateToProps = (state) => ({
    profile: state.profile
})



export default connect(mapStateToProps, { getProfileByUsername })(Profile)
