import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import Footer from './../layouts/footer'
import axios from 'axios'
import { Link, withRouter } from 'react-router-dom'
import Textarea from '../common/textarea'
import Inputfields from '../common/inputfields'
import Messages from './../uploads/messages'
import Progress from './../uploads/Progress'
import { addblog } from './../../actions/blogactions'


class Blogform extends Component {

    constructor(props) {
        super()
        this.onChange = this.onChange.bind(this)
        this.onSubmit = this.onSubmit.bind(this)
        this.onChangeImage = this.onChangeImage.bind(this)

        this.checkFileSize = this.checkFileSize.bind(this)
        this.checkMimeType = this.checkMimeType.bind(this)
        this.onSubmitImage = this.onSubmitImage.bind(this)
        this.maxSelectFile = this.maxSelectFile.bind(this)

        this.state = {

            title: '',
            subtitle: '',
            images: '',
            topics: '',
            tags: '',
            text: '',
            errors: {},
            file: '',
            filename: 'Choose a file',
            message: '',
            uploadPercentage: 0,
            imageid: '',
            disabled: false,
            imageShow: false,
            submitbutton: false,


        }



    }
    onChange(e) {
        this.setState({
            [e.target.name]: e.target.value
        })

    }



    async  onChangeImage(e) {

        if (this.checkMimeType(e) && this.checkFileSize(e) && this.maxSelectFile(e)) {
            await this.setState({
                file: e.target.files,
                filename: 'Images Choosed',
                submitbutton: true,
                message:'Uploading to database please wait'
            })
            this.onSubmitImage(e)


        }




    }

    async  onSubmitImage(e) {

        const file = this.state.file
        if (!file) {

            this.setState({
                message: 'Please Upload a file'
            })
            return
        }
        const fd = new FormData()
        for (var i = 0; i < file.length; i++) {
            fd.append('image', file[i])
        }

        try {
            const res = await axios.post('/blogs/image', fd,
                {
                    onUploadProgress: progressEvent => {

                        this.setState({
                            uploadPercentage: parseInt(Math.round(progressEvent.loaded * 100) / progressEvent.total)
                        })



                    }
                }
            )
            this.setState({
                imageid: res.data,
                message: 'File Uploaded Sucessfully ',
                disabled: true,
                imageShow: true,
                submitbutton: false
            })
            setTimeout(() => {
                this.setState({
                    message: '',
                    uploadPercentage: 0
                })


            }, 2000)
        }
        catch (e) {
            if (e.response.status === 500) {
                this.setState({
                    message: 'There was a problem with server'
                })
            }
            else {
                this.setState({
                    message: e.response.data.message
                })
            }
        }
    }




    checkMimeType = (event) => {
        let files = event.target.files
        let err = ''

        const types = ['image/png', 'image/jpeg', 'image/gif']
        for (let x = 0; x < files.length; x++) {
            if (types.every(type => files[x].type !== type)) {
                err += 'This is not a supported format\n';

            }
        };

        if (err !== '') {
            event.target.value = null
            this.setState({
                message: err,
            })
            return false;
        }
        return true;

    }
    maxSelectFile = (event) => {
        let files = event.target.files
        if (files.length > 6) {
            const msg = 'Only 6 images can be uploaded \n'
            event.target.value = null
            this.setState({
                message: msg,
            })
            return false;

        }
        return true;

    }

    checkFileSize = (event) => {
        let files = event.target.files
        let size = 4000000
        let err = "";
        for (var x = 0; x < files.length; x++) {
            if (files[x].size > size) {
                err += files[x].name + ' is too large to upload, please pick a smaller file upto 4MB  \n';

            }
        };
        if (err !== '') {
            event.target.value = null
            this.setState({
                message: err
            })
            return false
        }

        return true;

    }


    componentWillReceiveProps(nextProps) {
        if (nextProps.errors) {
            this.setState({ errors: nextProps.errors })
        }
    }



    async onSubmit(e) {
        e.preventDefault()

        const blogdata = {

            title: this.state.title,
            subtitle: this.state.subtitle,
            tags: this.state.tags,
            topics: this.state.topics,
            text: this.state.text,
            imageid: this.state.imageid

        }
        this.props.addblog(blogdata,this.props.history)


    }

    render() {
        const { errors } = this.state


        return (
            <div className='add-experience' style={{ color: '#03e9f4', backgroundColor: '#131419', marginTop: '-25px', padding: '0px' }} >
                <div className="container" style={{ background: '#131419' }} >
                    <div className="row">
                        <div className="col-md-8 m-auto">
                            <Link to='/dashboard' className="btn  mt-4"
                                style={{ padding: '20px', borderRadius: '10px', backgroundColor: '#131419', color: '#03e9f4', border: '2px solid red' }} >
                                Go Back
                            </Link>
                            <h1 className='display-4 text-center' >Create a Blog</h1>
                            <p className="lead text-center ">Choose Images and add #image-number to add image at at point   </p><br />


                            <form action="" method="POST"
                                style={{ background: '#131419', borderRadius: '15px', padding: "40px 40px 60px", boxShadow: "-5px -5px 10px#03e9f4,5px 5px 15px #03e9f4", paddingBottom: '10px' }}
                                className='formRegister'
                                onSubmit={this.onSubmit} >


                                <div className='input mt-1' >


                                    <Inputfields
                                        label='Title'
                                        name='title'
                                        placeholder='title'
                                        value={this.state.title}
                                        errors={errors.title}
                                        onChange={this.onChange}
                                        type='text'


                                    />
                                    <br />
                                    <Inputfields
                                        label='Subtitle or subheading'
                                        name='subtitle'
                                        placeholder='subtitle'
                                        value={this.state.subtitle}
                                        errors={errors.subtitle}
                                        onChange={this.onChange}


                                    /><br />
                                    <Inputfields
                                        label='Topics'
                                        name='topics'
                                        placeholder='Add topics of the blog'
                                        value={this.state.topics}
                                        errors={errors.topics}
                                        onChange={this.onChange}
                                        type='text'


                                    />
                                    <br />


                                    <Inputfields
                                        label='Tags'
                                        name='tags'
                                        placeholder='Add tags for more reach like #darkblog'
                                        value={this.state.tags}
                                        errors={errors.tags}
                                        onChange={this.onChange}
                                        type='text'


                                    />
                                    <br />
                                    <div className="container">
                                        {this.state.message ? <Messages message={this.state.message} /> : null}
                                        <div className="custom-file mb-4">
                                            <input type="file" multiple onChange={this.onChangeImage} style={{ background: '#131419', color: '#03e9f4' }} disabled={(this.state.disabled) ? "disabled" : ""} className="custom-file-input" id="customFile" />
                                            <label style={{ background: '#131419', color: '#03e9f4', border: '2px solid #03e9f4', borderRadius: '5px' }} disabled={(this.state.disabled) ? "disabled" : ""} className="custom-file-label" htmlFor="customFile">{this.state.filename}</label>

                                        </div>
                                        {this.state.uploadPercentage === 0 ? null : <Progress percentage={this.state.uploadPercentage} />
                                        }
                                            {errors.photo&&
                                                <div className="alert alert-danger" role="alert">
                                                {errors.photo}
                                              </div>
                                            }
                                        {this.state.imageShow &&
                                            <div className="container">
                                                <div className="row">


                                                    <div className="col-md-4 mb-2">
                                                        <img style={{ width: '140px', height: '140px' }} src={`/blogs/${this.state.imageid}/avtaar/0`} alt="" srcSet="" />    </div>
                                                    <div className="col-md-4 mb-2 ">
                                                        <img style={{ width: '140px', height: '140px' }} src={`/blogs/${this.state.imageid}/avtaar/1`} alt="" srcSet="" />    </div>
                                                    <div className="col-md-4  mb-2">
                                                        <img style={{ width: '140px', height: '140px' }} src={`/blogs/${this.state.imageid}/avtaar/2`} alt="" srcSet="" />    </div>
                                                </div>
                                                <div className="row mt-2">
                                                    <div className="col-md-4 mb-2">
                                                        <img style={{ width: '140px', height: '140px' }} src={`/blogs/${this.state.imageid}/avtaar/3`} alt="" srcSet="" />    </div>
                                                    <div className="col-md-4 mb-2">
                                                        <img style={{ width: '140px', height: '140px' }} src={`/blogs/${this.state.imageid}/avtaar/4`} alt="" srcSet="" />    </div>
                                                    <div className="col-md-4 mb-2">
                                                        <img style={{ width: '140px', height: '140px' }} src={`/blogs/${this.state.imageid}/avtaar/5`} alt="" srcSet="" />    </div>
                                                </div>
                                            </div>
                                        }

                                    </div>
                                    <Textarea
                                        placeholder='Write your blog'
                                        name='text'
                                        value={this.state.text}
                                        onChange={this.onChange}
                                        errors={errors.text}
                                        info='Write the blog and add images in serial order and add #image in text where you wanted to add images'

                                    />
                                    <input id='link'
                                        type='submit'
                                        disabled={this.state.submitbutton}
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

Blogform.propTypes = {
    addblog: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
    errors: state.errors,
    auth: state.auth,
})

export default connect(mapStateToProps, { addblog })(withRouter((Blogform)))