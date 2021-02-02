

import React, { Component } from 'react'
import axios from 'axios'
import Messages from './messages'
import Progress from './Progress'
class Profilepic extends Component {
    constructor() {
        super();
        this.onChange = this.onChange.bind(this)
        this.onSubmit = this.onSubmit.bind(this)
        this.checkFileSize = this.checkFileSize.bind(this)
        this.checkMimeType = this.checkMimeType.bind(this)

        this.state = {
            file: null,
            filename: 'Choose File',
            message: '',
            uploadPercentage: 0
        }
    }

    onChange(e) {
        this.setState({
            filename: e.target.files[0].name
        })
        if (this.checkMimeType(e) && this.checkFileSize(e)) {

            this.setState({
                file: e.target.files[0],
            })
        }

    }

    checkMimeType = (event) => {
        let files = event.target.files
        let err = ''

        const types = ['image/png', 'image/jpeg', 'image/gif']
        for (let x = 0; x < files.length; x++) {
            if (types.every(type => files[x].type !== type)) {
                err += files[x].type + ' is not a supported format\n';

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

    checkFileSize = (event) => {
        let files = event.target.files
        let size = 2000000
        let err = "";
        for (var x = 0; x < files.length; x++) {
            if (files[x].size > size) {
                err += files[x].type + ' is too large, please pick a smaller file\n';

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


    async   onSubmit(e) {
        e.preventDefault(e)
        const file = this.state.file
        if (!file) {

            this.setState({
                message: 'Please Upload a file'
            })
            return
        }
        const fd = new FormData()
        fd.append('image', file)
        try {
            await axios.post('/profile/profileimage/upload', fd,
                {
                    onUploadProgress: progressEvent => {

                        this.setState({
                            uploadPercentage: parseInt(Math.round(progressEvent.loaded * 100) / progressEvent.total)
                        })



                    }
                }
            )

            this.setState({
                message: 'File Uploaded Sucessfully You willl be redirected to dashboard soon'
            })
            setTimeout(() => {
                this.props.history.push('/dashboard')


            }, 3000)
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
    render() {
        return (
            <div className='container' >
                {this.state.message ? <Messages message={this.state.message} /> : null}

                <form action="" onSubmit={this.onSubmit} encType='multipart/form-data' >
                    <div className='custom-file mb-4'>
                        <input type="file" onChange={this.onChange} className='custom-file-input' id="" />
                        <label htmlFor="customfile" className='custom-file-label' >{this.state.filename}</label>
                    </div>

                    {this.state.uploadPercentage === 0 ? null : <Progress percentage={this.state.uploadPercentage} />
                    }
                    <input className='btn btn-primary btn-block mt-4' type="submit" name="" id="" />

                </form>
            </div>
        )
    }
}

export default Profilepic







