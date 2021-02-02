import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { uploadImage } from './../../actions/profileactions'
import PropTypes from 'prop-types'
class UploadImage extends Component {

    constructor() {
        super()
        this.onChange = this.onChange.bind(this)
        this.onSubmit = this.onSubmit.bind(this)


        this.state = {
            avtaar: null
        }
    }
    onChange(e) {
        this.setState({
            [e.target.name]: e.target.files[0]


        })
    }
    async onSubmit(e) {
        e.preventDefault()
        const avtaar = {avtaar:this.state.avtaar}
        this.props.uploadImage(avtaar,this.history)
        
    }


    render() {


        return (
            <div>
                <form action="" method="post" onSubmit={this.onSubmit} encType="multipart/form-data" >
                    <input type="file" name="avtaar" id="" onChange={this.onChange} />

                    <input type="submit" name="" id="" />

                </form>
            </div>
        )
    }
}



const mapStateToProps = state => ({
    errors: state.errors,

})

uploadImage.propTypes = {
    errors: PropTypes.func.isRequired
}


export default connect(mapStateToProps, { uploadImage })(withRouter(UploadImage))
