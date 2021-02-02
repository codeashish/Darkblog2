import React, { Component } from 'react'
import { connect } from 'react-redux'
import Spinner from './../common/spinner'
import PropTypes from 'prop-types'
import Blogfeed from './Blogfeed'
import Footer from './../layouts/footer'
import {getBlogs} from './../../actions/blogactions'
class Blogs extends Component {

    componentDidMount(){
        this.props.getBlogs()
    }

    render() {
        const {blogs,loading}=this.props.blog;
        let blogContent;
        if(blogs===null||loading){
            blogContent=<Spinner/>
        }
        else{
            blogContent=<Blogfeed blogs={blogs} />
        }
        return (
            <div className='feed' style={{background:'#131419',marginTop:'-24px'}} >
                        <div className="container">
                            <div className="row">
                                <div className="col-md-12">
                                    {blogContent}
                                </div>
                            </div>
                        </div>
                        <Footer/>

            </div>
        )
    }
}
Blogs.propTypes={
    blog:PropTypes.object.isRequired,
    getBlogs:PropTypes.func
}

const mapStateToProps = (state) => ({
blog:state.blog
})


export default connect(mapStateToProps,{getBlogs})(Blogs)
