import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Blogitem from './Blogitem'

class Blogfeed extends Component {
    render() {
        const { blogs } = this.props
        let blogcontent
        if(blogs){
            blogcontent=blogs.map(blog => <Blogitem key={blog._id} blog={blog} />)
        }
        else{
            blogcontent=null
        }
        return (
            
            <div  className='container'  >
                {blogcontent}
            </div>
        )

    }
}
Blogfeed.propTypes = {
    blogs: PropTypes.array
}
export default Blogfeed