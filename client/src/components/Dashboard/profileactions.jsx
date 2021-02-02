import React, { Component } from 'react'
import { Link } from 'react-router-dom'

class Profileactions extends Component {
    render() {
        return (
            <div style={{ paddingTop: '10px' }}    >
                <div className="btn" role="group">
                    <Link to="/edit-profile" className="btn btn-light" style={{ color: '#03e9f4', background: '#131419', borderRadius: '4px', border: '2px solid #03e9f4', margin: '4px' }} >
                        {/* <i className="fas fa-user-circle text-info mr-1" />  */}     <span  role='img' aria-label="profile" > 👤  </span> 
                        
                           Edit Profile</Link>
                        <Link to="/uploadprofile" style={{ color: '#03e9f4', background: '#131419', borderRadius: '4px', border: '2px solid #03e9f4', margin: '4px' }} className="btn btn-light">
                        
                       <span  role='img' aria-label="person" > 🧑 </span>       Edit Profile Image</Link>
                   
                    <Link to="/add-experience" style={{ color: '#03e9f4', background: '#131419', borderRadius: '4px', border: '2px solid #03e9f4', margin: '4px' }} className="btn btn-light">
                        {/* <i className="fab fa-black-tie text-info mr-1" /> */} <span    role='img' aria-label="worker" > 🧑‍🎓  </span>
                            Add Experience</Link>
                    
                                  <Link to="/add-education" style={{ color: '#03e9f4', background: '#131419', borderRadius: '4px', border: '2px solid #03e9f4', margin: '4px' }} className="btn btn-light">
                        {/* <i className="fas fa-graduation-cap text-info mr-1" /> */}  <span role='img' aria-label='hat' >🎓 </span>
                                Add Education</Link>
                </div>

            </div>
        )
    }
}

export default Profileactions