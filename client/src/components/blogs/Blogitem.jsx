import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withRouter, Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import './../css/style.css'
import Chip from '@material-ui/core/Chip';

import { deleteblog, addLike, removeLike } from '../../actions/blogactions'

import classnames from 'classnames'
import Moment from 'react-moment'

class Blogitem extends Component {


    constructor() {
        super()
        this.handleClick = this.handleClick.bind(this)

    }
    handleClick() {
        console.log('Hii')
    }
    async deletebutton(id) {
        this.props.deleteblog(id)
    }
    onlike(id) {
        
        const like = this.findUserLike(this.props.blog.likes)
        if (like) {
            this.props.removeLike(id)
        }
        else {
            this.props.addLike(id)
        }
    }
    findUserLike(likes) {
        const { auth } = this.props

        if ((likes.filter((like) => like.user === auth.user.id).length > 0)) {
            return true
        }
        else {
            return false
        }
    }


    render() {
        const { blog, auth } = this.props
        let chipContent;
        chipContent = blog.topics ? (blog.topics.slice(0, 2).map((topic, index) => (
            <Link to="" key={index} >
                <Chip style={{ background: 'black', color: '#03e9f4', border: '2px solid #03e9f4', marginLeft: '8px' }} key={index} label={topic} onClick={this.handleClick} />

            </Link>
        ))) : null



        const date = (blog.createdAt === blog.updatedAt) ? <Moment format="DD/MM/YYYY" >{blog.createdAt}</Moment> : (<span> <strong> Updated</strong>  <Moment format="DD/MM/YYYY" >{blog.updatedAt}</Moment> </span>)



        return (
            <div>


                <section id="aa-blog">
                    <div className="container"   >
                        <div className="row">
                            <div className="col-md-12">
                                <div className="aa-blog-area">
                                    <div className="row ">
                                        <div className="col-sm-6">
                                            <div className="aa-blog-content" >
                                                <div className="row">
                                                    <div className="col-md-12 col-sm-12">
                                                        <article className="aa-blog-single" id='boxshadow'  >
                                                            <div className="aa-blog-profile">
                                                                <div style={{ float: 'left', paddingLeft: '20px', paddingRight: '5px', paddingTop: '35px' }}><img className=" img  ml-4 mr-2  " alt='DP' src={`/users/${auth.user.username}/avtaar`} style={{ width: '60px', height: '60px', marginTop: '-10px', border: '2px solid #03e9f4', borderRadius: '40px' }} /></div>
                                                                <div className="aa-blog-profile-content mt-4 "  ><h3  > <Link to="" className='ml-3' style={{ textDecoration: 'none', color: '#03e9f4', }} >{blog.username.toUpperCase()} </Link>  </h3><span className='ml-3' style={{ marginLeft: '-5px' }}>{date}</span></div>
                                                            </div>
                                                            <figure >
                                                                <Link to={`/blogs/${blog._id}`}><img className="aa-blog-img" alt="img" src={`/blogs/${blog.imageid}/avtaar/0`} style={{opacity:'0.8'}} /></Link>
                                                            </figure>
                                                            <div className="aa-blog-single-content">
                                                                <Link to={`/blogs/${blog._id}`}>
                                                                </Link><h3 style={{ color: '#03e9f4' }}><Link to={`/blogs/${blog._id}`}  style={{ color: '#03e9f4' }} > <strong> {blog.title} </strong></Link></h3> <br />
                                                                <p style={{ color: '#03e9f4' }}>{blog.text.substring(0, 100)}</p>
                                                                {chipContent}


                                                                <div className="aa-blog-single-bottom" >
                                                                    <button id='buttonhoverlikes' onClick={this.onlike.bind(this, blog._id)} className="aa-blog-author" to="#"><span style={{ color: '#03e9f4', textDecoration: 'none', width: '80px' }}> <i className={classnames('fa fa-heart ', { 'text-danger': this.findUserLike(blog.likes) })} style={{ fontSize: '21px ', color: 'white' }} /> {blog.likes.length}</span></button>
                                                                    {blog.username === auth.user.username ? (< Chip icon={<i className='fa fa-trash' style={{ color: 'red' }}   >  </i>} style={{ background: '#131914', color: 'red', border: '2px solid red', marginLeft: '8px' }} label='Delete Blog' className='float-right' onClick={this.deletebutton.bind(this, blog._id)} />
                                                                    ) : null}
                                                                </div>

                                                            </div>
                                                        </article>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

            </div>

        )
    }
}

Blogitem.propType = {
    blog: PropTypes.object.isRequired,
    auth: PropTypes.object.isRequired,
    deleteblog: PropTypes.func.isRequired,
    addLike: PropTypes.func.isRequired,
    removeLike: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
    auth: state.auth
})

export default connect(mapStateToProps, { deleteblog, addLike, removeLike })(withRouter(Blogitem))




