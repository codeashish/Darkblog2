import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link, withRouter } from 'react-router-dom'
import Textarea from '../common/textarea'
import Inputfields from '../common/inputfields'
import PropTypes from 'prop-types'
import Footer from './../layouts/footer'

import { AddExperience } from './../../actions/profileactions'


class Addexperience extends Component {

    constructor(props) {
        super(props)
        this.state = {
            company: '',
            title: '',
            location: '',
            from: '',
            to: '',
            current: false,
            description: '',
            errors: {},
            disabled: false
        }

        this.onChange = this.onChange.bind(this)
        this.onSubmit = this.onSubmit.bind(this)
        this.onCheck = this.onCheck.bind(this)
    }

    onSubmit(e) {
        e.preventDefault()
        const expData = {
            company: this.state.company,
            title: this.state.title,
            location: this.state.location,
            to: this.state.to,
            from: this.state.from,
            current: this.state.current,
            description: this.state.description,


        }
        this.props.AddExperience(expData, this.props.history)
    }

    onCheck(e) {
        this.setState({
            disabled: !this.state.disabled,
            current: !this.state.current
        })
    }


    onChange(e) {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.errors) {
            this.setState({ errors: nextProps.errors })
        }
    }


    render() {
        const { errors } = this.state
        const today = new Date();
        const todaydate = (today.getMonth() + 1) + '/' + today.getDate() + '/' + today.getFullYear()
        return (
            <div className='add-experience' style={{ color: '#03e9f4', backgroundColor: '#131419', marginTop: '-25px', padding: '0px' }} >
                <div className="container" style={{ background: '#131419' }} >
                    <div className="row">
                        <div className="col-md-8 m-auto">
                            <Link to='/dashboard' className="btn  mt-4"
                                style={{ padding: '20px', borderRadius: '10px', backgroundColor: '#131419', color: '#03e9f4', border: '2px solid red' }} >
                                Go Back
                            </Link>
                            <h1 className='display-4 text-center' >Add Experience</h1>
                            <p className="lead text-center ">Add any job profession that you have in the past or currently having or current</p><br />


                            <form action=""
                                style={{ background: '#131419', borderRadius: '15px', padding: "40px 40px 60px", boxShadow: "-5px -5px 10px#03e9f4,5px 5px 15px #03e9f4", paddingBottom: '10px' }}
                                className='formRegister'
                                onSubmit={this.onSubmit} >


                                <div className='input mt-1' >

                         
                                    <Inputfields
                                        label='Job Title:'
                                        name='title'
                                        placeholder='title'
                                        value={this.state.title}
                                        errors={errors.title}
                                        onChange={this.onChange}
                                        type='text'


                                    />
                                    <br />
                                    <Inputfields
                                        label='Company Name:'
                                        name='company'
                                        placeholder='company'
                                        value={this.state.company}
                                        errors={errors.company}
                                        onChange={this.onChange}


                                    /><br />


                                    <Inputfields
                                        label='Job Location'
                                        name='location'
                                        placeholder='location'
                                        value={this.state.location}
                                        errors={errors.location}
                                        onChange={this.onChange}
                                        type='text'


                                    />
                                    <br />
                                    <h6>From Date</h6>
                                    <Inputfields
                                        name='from'
                                        placeholder='from'
                                        value={this.state.from}
                                        errors={errors.from}
                                        onChange={this.onChange}
                                        type='date'



                                    />
                                    <br />
                                    <h6>To Date</h6>

                                    <Inputfields
                                        type={this.state.disabled ? 'text' : 'date'}
                                        name='to'
                                        placeholder='to'
                                        value={this.state.disabled ? todaydate : this.state.to}
                                        errors={errors.to}
                                        onChange={this.onChange}
                                        disabled={this.state.disabled ? 'disabled' : ''}

                                    />
                                    <br />

                                    <div className="form-check md-4">
                                        <input type='checkbox'
                                            className='form-check-input'
                                            name='current'
                                            value={this.state.current}
                                            checked={this.state.current}
                                            onChange={this.onCheck}
                                            id='current'



                                        />
                                        <label htmlFor="current" className="form-check-label">Current Job</label>



                                        <br />
                                    </div>
                                    <Textarea
                                        placeholder='Job Description'
                                        name='description'
                                        value={this.state.description}
                                        onChange={this.onChange}
                                        errors={errors.description}
                                        info='Tell us About Your Job'

                                    />
                                    <input id='link'
                                        type='submit'
                                        className="btn btn-info mt-4 btn-block mt-4"
                                        style={{ padding: '20px', borderRadius: '10px', backgroundColor: '#131419', color: '#03e9f4', border: '2px solid #03e9f4' }}
                                        value='Submit'
                                        onClick={this.onSubmit} />
                                </div>
                            </form>

                        </div>
                    </div>
                </div>
                <Footer />
            </div>
        )
    }
}

const mapStateToProps = state => ({
    profile: state.profile,
    errors: state.errors
})

Addexperience.propTypes = {
    AddExperience: PropTypes.func.isRequired,
    profile: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired
}

export default connect(mapStateToProps, { AddExperience })(withRouter(Addexperience))