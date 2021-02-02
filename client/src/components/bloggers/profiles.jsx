import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import Spinner from '../common/spinner'
import { getProfiles } from '../../actions/profileactions'
import Profileitem from './profileitem'
import Footer from './../layouts/footer'

class Profiles extends Component {
    componentDidMount() {
        this.props.getProfiles()
    }
    render() {
        const { profiles, loading } = this.props.profile
        let ProfilItems;
        if (profiles === null || loading) {
            ProfilItems = <Spinner />
        }
        else {
            if (profiles.length > 0) {
                ProfilItems = profiles.map(profile => (
                    <Profileitem key={profile._id} profile={profile} />
                ))

            } else {
                ProfilItems = <h4>No Profiles found</h4>
            }
        }

        return (
            <div className='profiles' style={{ color: '#03e9f4', background: '#131419', marginTop: '-25px' }}  >
                <div className="container"  >
                    <div className="row"  >
                        <div className="col-md-12"  >
                            <h1 className="display-4 text-center">

                                Bloggers you may follow
                            </h1>
                            <p className="lead text-center">Browse and connect with Bloggers</p>

                     
                            {ProfilItems}
                        </div>
                    </div>
                </div>
                <Footer />
            </div>
        )
    }
}
Profiles.propTypes = {
    getProfiles: PropTypes.func.isRequired,
    profile: PropTypes.object.isRequired
}
const mapStateToProps = state => ({
    profile: state.profile
})
export default connect(mapStateToProps, { getProfiles })(Profiles)