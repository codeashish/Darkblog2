import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import isEmpty from '../../validations/isEmpty'
class Profileitem extends Component {
  render() {
    const { profile } = this.props
    console.log(profile)
    return (
      <div>
        <div className="card card-body mb-3" style={{ background: '#131419', border: '2px solid #03e9f4' }} >
          <div className="row"   >
            <div className="col-2">
              <img className="rounded-circle" src={`/users/${profile.user.username}/avtaar`}   id='link1'  alt="" />
            </div>
            <div className="col-lg-6 col-md-4 col-8">
              <h3>{profile.user.username.toUpperCase()}</h3>
              <p>{isEmpty(profile.title) ? null : profile.title} {isEmpty(profile.company) ? null : ('at ' + profile.company)}</p>
              <p>  <i className="fa fa-map-marker m-1" aria-hidden="true"></i>  {isEmpty(profile.location) ? null : profile.location}</p>
              <Link to={`/profiles/username/${profile.user.username}`} className="btn btn-info " style={{ background: '#131419', color: '#03e9f4', border: '1px solid #03e9f4' }} id='link1' >View Profile</Link>
            </div>
            <div className="col-md-4 d-none d-lg-block"   >
              <h4>Interests:</h4>
              <ul className="list-group" >

                {profile.interests.slice(0, 4).map((item, index) => (

                  <li className='list-group-item mb-1' style={{ background: '#131419', border: '2px solid #03e9f4 ' }} key={index} >

                    <i className="fa fa-check pr-1" />
                    {item}</li>
                ))}

              </ul>



            </div>
          </div>

        </div>

      </div>


    )
  }
}

Profileitem.propTypes = {
  profile: PropTypes.object.isRequired
}

export default Profileitem


