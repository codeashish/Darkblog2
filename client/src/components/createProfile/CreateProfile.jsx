import React, { Component } from 'react'
import { connect } from 'react-redux'
import Inputfields from './../common/inputfields'
import PropTypes from 'prop-types'
import Textareafield from './../common/textarea'

import InputSocailMedia from './../common/inputsocialmedia'
import { createProfile } from '../../actions/profileactions'


import { withRouter } from 'react-router-dom'

import Footer from './../layouts/footer'

class CreateProfile extends Component {
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
            githubusername: '',
            title: '',
            location: '',
            company:'',
            errors: {},
            Socialmediabutton: 'Add Social Media Links'


        }

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
            company:this.state.company

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
    }


    render() {
        const { errors, displaySocialInputs } = this.state
        let SocialInputs
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

                        <h1 className='display-4 text-center' style={{ color: '#03e9f4' }} >

                        </h1>
                        <p className=' text-center' style={{ color: '#03e9f4' }} >

                        </p>
                        <form className='formRegister' style={{ background: '#131419', borderRadius: '15px', padding: "40px 40px 60px", boxShadow: "-5px -5px 10px#03e9f4,5px 5px 15px #03e9f4", paddingBottom: '10px' }} onSubmit={this.onsubmit} method="post"  >
                            <h2 style={{ textAlign: 'center', margin: '10px', textTransform: 'uppercase' }} >
                                Create Your profile
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

                                    label='Enter Company Name:'
                                    placeholder='Company name '
                                    name='company'
                                    value={this.state.company}
                                    type='text'
                                    errors={errors.comapny}
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

CreateProfile.protoTypes = {
    profile: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
    profile: state.profile,
    errors: state.errors
})

export default connect(mapStateToProps, { createProfile })(withRouter(CreateProfile))