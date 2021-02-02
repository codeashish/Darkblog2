import React, { Component } from 'react'
import Footer from './footer'
import './../css/main.css'
import {Link} from 'react-router-dom'



export default class landing extends Component {

  render() {
    return (
      <div>
      <div className="landing">
      <div className="dark-overlay landing-inner text-light">
        <div className="container float-left ">
          <div className="row">
            <div className="col-md-12 text-center">
              <h1 className="display-3 mb-4"  style={{color:'#03e9f4'}} >DarkBlog
              </h1>
              <p className="lead" style={{color:'#03e9f4'}} > Create a darkblog profile.Make blogs on dark themes and read about dark</p>
              <hr />
              <Link to="/signup" id='link' className="btn btn-lg btn-info mr-2"  style={{color:'#03e9f4',backgroundColor:'#131419',fontSize:'15px',fontWeight:'bold'}} >Sign Up</Link>
              <Link to="/login"  id='link' className="btn btn-lg btn-light"  style={{color:'#03e9f4',backgroundColor:'#131419',border:'1px solid #03e9f4',fontSize:'15px',fontWeight:'bold'  }} >Login</Link>
            </div>
          </div>
        </div>
      </div>
    </div>
    <Footer/>
    </div>


    )
  }
}
