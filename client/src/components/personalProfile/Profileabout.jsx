import React, { Component } from 'react'

class Profileabout extends Component {
    render() {
        const {profile}=this.props
        return (



            <div className="col-md-12"   >
                <div className="card card-body mt-3 mb-3"  style={{background:'#131419'}}   >
                    <h3 className="text-center "    >{profile.user.username.toUpperCase()} BIO:</h3>
                    <p className="lead">{profile.bio}
                </p>
                    <hr />
                    <h3 className="text-center ">Interests: </h3>
                    <div className="row">
                        <div className="d-flex flex-wrap justify-content-center align-items-center">
                            {profile.interests.map((item,index)=>(
                                <div className="p-3 m-2 m-2"  style={{border:'2px solid #03e9f4'}} key={index} >
                                <i className="fa fa-check"  /> {item}</div>
                            ))}

                            
                      
                        </div>
                    </div>
                </div>
            </div>

        )
    }
}
export default Profileabout