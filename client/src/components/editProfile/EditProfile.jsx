import React, { Component } from 'react'
import { connect } from 'react-redux'
import Inputfields from './../common/inputfields'
import PropTypes from 'prop-types'
import Textareafield from './../common/textarea'

import InputSocailMedia from './../common/inputsocialmedia'
import { createProfile, getCurrentProfile } from '../../actions/profileactions'
import isEmpty from '../../validations/isEmpty'

import { withRouter, Link } from 'react-router-dom'

import Footer from './../layouts/footer'

class EditProfile extends Component {
    constructor(props) {
        super()
        this.onChange = this.onChange.bind(this)
        this.onsubmit = this.onsubmit.bind(this)
        this.state = {
            displaySocialInputs: false,
            name: '',
            age: '',
            phonenumber: '',
            website: '',
            interests: '',
            bio: '',
            facebook: '',
            instagram: '',
            linkedin: '',
            youtube: '',
            twitter: '',
            errors: {},
            Socialmediabutton: 'Add Social Media Links',
            githubusername: '',
            title: '',
            location: '',
            company: ''


        }

    }

    componentDidMount() {
        this.props.getCurrentProfile()
    }

    onsubmit(e) {
        e.preventDefault()
        const newUser = {
            name: this.state.name,
            age: this.state.age,
            phonenumber: this.state.phonenumber,
            website: this.state.website,
            interests: this.state.interests,
            bio: this.state.bio,
            facebook: this.state.facebook,
            instagram: this.state.instagram,
            linkedin: this.state.linkedin,
            youtube: this.state.youtube,
            twitter: this.state.twitter,
            title: this.state.title,
            location: this.state.location,
            githubusername: this.state.githubusername,
            company: this.state.company

        }
        // console.log(newUser)
        this.props.createProfile(newUser, this.props.history)
    }

    onChange(e) {
        this.setState({
            [e.target.name]: e.target.value

        })
    }

    componentWillReceiveProps(nextprops) {
        if (nextprops.errors) {
            this.setState({ errors: nextprops.errors })
        }
        if (nextprops.profile.profile) {
            const profile = nextprops.profile.profile;
            //Bring skills array back to comma seperated values


            profile.interests = !isEmpty(profile.interests) ? profile.interests : [];
            const interests = profile.interests.join(',')
            profile.interests = interests
            profile.age = isEmpty(profile.age) ? '' : profile.age.toString()
            profile.title = isEmpty(profile.title) ? '' : profile.title
            profile.location = isEmpty(profile.location) ? '' : profile.location
            profile.company = isEmpty(profile.company) ? '' : profile.company

            profile.phonenumber = isEmpty(profile.phonenumber) ? '' : profile.phonenumber.toString()
            //if profile field doesnot exist make empty strings
            profile.social = !isEmpty(profile.social) ? profile.social : {};
            profile.social.twitter = !isEmpty(profile.social.twitter) ? profile.social.twitter : '';
            profile.social.facebook = !isEmpty(profile.social.facebook) ? profile.social.facebook : '';
            profile.website = !isEmpty(profile.website) ? profile.website : '';
            profile.social.instagram = !isEmpty(profile.social.instagram) ? profile.social.instagram : '';
            profile.social.linkedin = !isEmpty(profile.social.linkedin) ? profile.social.linkedin : '';
            profile.social.youtube = !isEmpty(profile.social.youtube) ? profile.social.youtube : '';
            profile.social.githubusername = !isEmpty(profile.social.githubusername) ? profile.social.githubusername : '';

            //Set component field state
            this.setState({
                name: profile.name,
                age: profile.age,
                phonenumber: profile.phonenumber,
                website: profile.website,
                interests: profile.interests,
                bio: profile.bio,
                facebook: profile.social.facebook,
                instagram: profile.social.instagram,
                linkedin: profile.social.linkedin,
                youtube: profile.social.youtube,
                twitter: profile.social.twitter,
                title: profile.title,
                location: profile.location,
                githubusername: profile.social.githubusername,
                company: profile.company
            })


        }
    }


    render() {
        const { errors, displaySocialInputs } = this.state
        let SocialInputs;
        SocialInputs = (displaySocialInputs) ? <div >
            <InputSocailMedia
                placeholder='Your Website '
                name='website'
                value={this.state.website}
                type='text'
                errors={errors.website}
                onChange={this.onChange}
                info='Could be your own or a company website'
                icon='fa fa-wikipedia-w'


            />



            <InputSocailMedia
                name='twitter'
                placeholder='Twitter Profile Url'
                onChange={this.onChange}
                value={this.state.twitter}
                errors={errors.twitter}
                type='text'
                icon='fa fa-twitter'
            />
            <InputSocailMedia
                name='instagram'
                placeholder='instagram Profile Url'
                onChange={this.onChange}
                value={this.state.instagram}
                errors={errors.instagram}
                type='text'
                icon='fa fa-instagram'


            />
            <InputSocailMedia
                name='linkedin'
                placeholder='linkedin Profile Url'
                onChange={this.onChange}
                value={this.state.linkedin}
                errors={errors.linkedin}
                type='text'
                icon='fa fa-linkedin'


            />
            <InputSocailMedia
                name='youtube'
                placeholder='youtube Profile Url'
                onChange={this.onChange}
                value={this.state.youtube}
                errors={errors.youtube}
                type='text'

                icon='fa fa-youtube'

            />
            <InputSocailMedia
                name='facebook'
                placeholder='Facebook Profile Url'
                onChange={this.onChange}
                value={this.state.facebook}
                errors={errors.facebook}
                type='text'

                icon='fa fa-facebook'

            />
            <InputSocailMedia
                placeholder='Your Github Username  '
                name='githubusername'
                value={this.state.githubusername}
                type='text'
                errors={errors.githubusername}
                onChange={this.onChange}
                info='Write only username'
                icon='fab fa-github'


            />



        </div> : <div></div>

        return (

            <div className='create-profile ' style={{ color: '#03e9f4', backgroundColor: '#131419', marginTop: '-25px', padding: '0px' }}   >
                <div className="container  " style={{ background: '#131419' }} >

                    <div className="col-md-8 m-auto">
                        <Link to='/dashboard' className="btn  mt-4"
                            style={{ padding: '20px', borderRadius: '10px', backgroundColor: '#131419', color: '#03e9f4', border: '2px solid red' }} >
                            Go Back
                            </Link>
                        <h1 className='display-4 text-center' style={{ color: '#03e9f4' }} >


                        </h1>
                        <p className=' text-center' style={{ color: '#03e9f4' }} >

                        </p>
                        <form className='formRegister' style={{ background: '#131419', borderRadius: '15px', padding: "40px 40px 60px", boxShadow: "-5px -5px 10px#03e9f4,5px 5px 15px #03e9f4", paddingBottom: '10px' }} onSubmit={this.onsubmit} method="post"  >
                            <h2 style={{ textAlign: 'center', margin: '10px', textTransform: 'uppercase' }} >
                                {/* {this.state.name}<br /> */}
                            Edit profile
                                </h2>

                            <div className='input' >

                                <Inputfields

                                    label='Enter Your full name:'
                                    placeholder='Enter your full name'
                                    name='name'
                                    value={this.state.name}
                                    type='text'
                                    errors={errors.name}
                                    onChange={this.onChange}
                                /><br />



                                <Inputfields
                                    label='Enter Age:'
                                    placeholder='Must be 11 years old'
                                    name='age'
                                    value={this.state.age}
                                    type='tel'
                                    errors={errors.age}
                                    onChange={this.onChange}

                                /><br />
                                <Inputfields
                                    label='Enter your Phonenumber:'
                                    placeholder="Don't use country code"
                                    name='phonenumber'
                                    value={this.state.phonenumber}
                                    type='tel'
                                    errors={errors.phonenumber}
                                    onChange={this.onChange}

                                /><br />
                                <Inputfields

                                    label='Enter Your Work Title:'
                                    placeholder='Enter Your work '
                                    name='title'
                                    value={this.state.title}
                                    type='text'
                                    errors={errors.title}
                                    onChange={this.onChange}
                                /><br />

                                <Inputfields

                                    label='Enter  Company Name:'
                                    placeholder='Company Name'
                                    name='company'
                                    value={this.state.company}
                                    type='text'
                                    errors={errors.company}
                                    onChange={this.onChange}
                                /><br />

                                <Inputfields

                                    label='Enter Your Location :'
                                    placeholder='Enter  Location'
                                    name='location'
                                    value={this.state.location}
                                    type='text'
                                    errors={errors.location}
                                    onChange={this.onChange}
                                /><br />


                                <Inputfields
                                    label='Enter Your interests:'
                                    placeholder='Must be seperated by commas(e.g darkweb,black)'
                                    name='interests'
                                    value={this.state.interests}
                                    type='tel'
                                    errors={errors.interests}
                                    onChange={this.onChange}

                                /><br />

                                <Textareafield
                                    label='Bio:'
                                    placeholder='Tell us a little about yourself'
                                    name='bio'
                                    value={this.state.bio}
                                    errors={errors.bio}

                                    onChange={this.onChange}

                                />

                            </div>

                            <div className="mb-3">
                                <input type='button' id='link' style={{ fontSize: '15px', padding: '15px 10px', fontWeight: '300', margin: '5px', letterSpacing: '1px', background: '#131419', color: '#03e9f4', borderRadius: '20px', border: '2px solid #03e9f4' }}

                                    onClick={() => this.setState(prevstatus => ({
                                        displaySocialInputs: !prevstatus.displaySocialInputs,
                                        Socialmediabutton: (this.state.Socialmediabutton === 'Add Social Media Links') ? 'Hide Social Media Links' : 'Add Social Media Links'
                                    }))}

                                    className='btn btn-dark mt-4 mb-2'
                                    value={this.state.Socialmediabutton} />



                                <span style={{ color: '#03e9f4', marginLeft: '5px' }}  >(Optional)</span>

                            </div>

                            {SocialInputs}



                            <input type="submit" id='link' style={{ padding: '20px', borderRadius: '10px', backgroundColor: '#131419', color: '#03e9f4', border: '2px solid #03e9f4' }} value="Submit" onClick={this.onsubmit} className='btn btn-info btn-block mt-4' />
                        </form>


                    </div>
                </div>
                <Footer />
            </div>

        )
    }
}

EditProfile.protoTypes = {
    profile: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired,
    createProfile: PropTypes.func.isRequired,
    getCurrentProfile: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
    profile: state.profile,
    errors: state.errors,
})

export default connect(mapStateToProps, { createProfile, getCurrentProfile })(withRouter(EditProfile))