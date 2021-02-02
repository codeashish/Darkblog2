import React, { Component } from 'react'
import { connect } from 'react-redux'
import { getCurrentProfile, deleteAccount } from './../../actions/profileactions'
import Footer from './../layouts/footer'
import PropTypes from 'prop-types'
import Spinner from './../common/spinner'
import { Link } from 'react-router-dom'
import Profileactions from './profileactions'
import Experience from './Experience'
import Education from './Education'


class Dashboard extends Component {
    onDeleteClick = this.onDeleteClick.bind(this)

    componentDidMount() {
        this.props.getCurrentProfile()
    }

    onDeleteClick(e) {
        this.props.deleteAccount();
    }


    render() {

        const { user } = this.props.auth
        const { profile, loading } = this.props.profile
        let dashboardContent
        dashboardContent = (profile === null || loading) ?
            <Spinner /> : ((Object.keys(profile).length > 0 && (Object.keys(profile)[0]!=="toString")) ?


                <div style={{ color: '#03e9f4' }} ><p className='lead '  >Welcome  <Link style={{ textDecoration: 'none', color: '#03e9f4' }} to={`profiles/username/${user.username}`}   ><strong>{user.username.toUpperCase()}</strong></Link> </p>
                    <Profileactions />

                    <Experience experience={((profile === null || profile.education === null) ? [] : profile.experience)} />
                    <Education education={(profile === null ? [] : profile.education)} />
                </div> :
                <div className='lead text-muted'>Welcome {user.username}.Please add a profile.<Link to='/create-profile' className='btn btn-lg btn-info'>Create Profile</Link></div>)






        return (
            <div style={{ background: '#02050A', marginBottom: '24px', marginTop: '-24px', padding: '20px' }}  >
                <div className='dashboard'>

                    <div className="container">
                        <div className="col-md-12">



                            {dashboardContent}


                            <div style={{ marginBottom: '60px' }}>
                                <button className="btn btn-danger deletebutton " onClick={this.onDeleteClick} style={{ padding: '10px', border: '2px solid red', background: '#131419', color: 'red' }} >
                                    Delete My Account
                                        </button>
                            </div>


                        </div>
                    </div>
                </div>

                <Footer />

            </div>


        )
    }
}
Dashboard.propTypes = {
    getCurrentProfile: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
    profile: PropTypes.object.isRequired,
    deleteAccount: PropTypes.func.isRequired
}

const mapStateToProps = state => ({

    profile: state.profile,
    auth: state.auth
})

export default connect(mapStateToProps, { getCurrentProfile, deleteAccount })((Dashboard))