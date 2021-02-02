import React, { Component } from 'react'
import PropTypes from 'prop-types'
import './../css/fullpage.css'
import Footer from './../layouts/footer'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import Spinner from './../common/spinner'
import { getBlog } from './../../actions/blogactions'
import Moment from 'react-moment';

class FullPageBlog extends Component {
    componentDidMount() {
        this.props.getBlog(this.props.match.params.id)

    }


    render() {
        console.log(this.props)
        const { blog, loading } = this.props
        console.log(blog.blog)
        let blogcontent;
        if (blog === null || loading || Object.keys(blog).length === 0) {
            blogcontent = <Spinner />
        }
        else {
            blogcontent = (<div className="article-clean" style={{ backgroundColor: 'black', color: '#03e9f4' }}>
                <div className="container">
                    <div className="row">
                        <div className="col-lg-10 col-xl-8 offset-lg-1 offset-xl-2">
                            <div className="intro">
                                <h1 className="text-center">{blog.blog.title && blog.blog.title.toUpperCase()}</h1>
                                <p className="text-center"><span className="by">by</span> <Link to="#" style={{ color: '#03e9f4' }}>{blog.blog.title && blog.blog.username.toUpperCase()}</Link><span className="date">{<Moment format="DD/MM/YYYY hh:mm:ss"  >{blog.blog.createdAt}</Moment>} </span></p><img className="img-fluid" alt='Blogimg' src={`/blogs/${blog.blog.imageid}/avtaar/0`} /></div>
                            <div className="text">
        <p>{blog.blog.text}</p>
                               
                            </div>
                        </div>
                    </div>
                </div>
            </div>)
        }


        return (
            <div style={{ marginTop: '-24px' }} >
                {blogcontent}
                <div style={{ marginTop: '-48px' }} >
                    <Footer />
                </div>
            </div>
        )
    }
}
FullPageBlog.propTypes = {
    getBlog: PropTypes.func.isRequired,
    blog: PropTypes.object.isRequired
}

const mapStateToProps = (state) => ({
    blog: state.blog
})

export default connect(mapStateToProps, { getBlog })((FullPageBlog))
