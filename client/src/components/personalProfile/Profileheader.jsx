import React, { Component } from 'react'
import isEmpty from './../../validations/isEmpty'

class Profileheader extends Component {
    render() {
        const { profile } = this.props
        return (

            <div className="col-md-12">
                <div className="card card-body   mb-3" style={{ background: '#131419' }} >
                    <div className="row">
                        <div className="col-4 col-md-3 m-auto">
                            <img className="rounded-circle" src={`/users/${profile.user.username}/avtaar`} style={{ border: '5px solid #03e9f4' }} alt="" />
                        </div>
                    </div>
                    <div className="text-center">
                        <h1 className="display-4 text-center">{profile.user.username.toUpperCase()}</h1>

                        <strong>  <p className="lead text-center">{isEmpty(profile.title) ? null : profile.title} {isEmpty(profile.company) ? null : ('at ' + profile.company)}</p>
                        </strong>
                        <p>  <i className="fa fa-map-marker m-1" aria-hidden="true"></i>    {isEmpty(profile.location) ? null : (profile.location)}</p>
                        <p>
                            {isEmpty(profile.website) ? null : <a className="text-white p-2" href={profile.website} target="_blank" rel="noopener noreferrer" >
                                <i className="fas fa-globe fa-2x" style={{ color: '#03e9f4' }} />
                            </a>}


                            {isEmpty(profile.social && profile.social.twitter) ? null : <a className="text-white p-2" href={profile.social.twitter} target="_blank" rel="noopener noreferrer"  >
                                <i className="fa fa-twitter fa-2x" style={{ color: '#03e9f4' }} />
                            </a>}


                            {isEmpty(profile.social && profile.social.facebook) ? null : <a className="text-white p-2" href={profile.social.facebook} target="_blank" rel="noopener noreferrer"  >
                                <i className="fa fa-facebook fa-2x" style={{ color: '#03e9f4' }} />
                            </a>}

                            {isEmpty(profile.social && profile.social.linkedin) ? null : <a className="text-white p-2" href={profile.social.linkedin} target="_blank" rel="noopener noreferrer" >
                                <i className="fa fa-linkedin fa-2x" style={{ color: '#03e9f4' }} />
                            </a>}
                            {isEmpty(profile.social && profile.social.instagram) ? null : <a className="text-white p-2" href={profile.social.instagram} target="_blank" rel="noopener noreferrer" >
                                <i className="fa fa-instagram fa-2x" style={{ color: '#03e9f4' }} />
                            </a>}
                            {isEmpty(profile.social && profile.social.youtube) ? null : <a className="text-white p-2" href={profile.social.youtube} target="_blank" rel="noopener noreferrer" >
                                <i className="fa fa-youtube fa-2x" style={{ color: '#03e9f4' }} />
                            </a>}




                        </p>
                    </div>
                </div>
            </div>
        )
    }
}
export default Profileheader