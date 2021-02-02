import React, { Component } from 'react'
import Moment from 'react-moment'
class Profilecreds extends Component {
    render() {

        const { experience, education } = this.props

        const expItm = experience.map((exp) => (
            <li key={exp._id} className='list-group-item m-2 ' style={{ background: '#131419', border: '2px solid #03e9f4' }}  >

                <h4>{exp.company}</h4>
                <p>
                    <Moment format="DD/MM/YYYY" >{exp.from}</Moment>-
                    {exp.to === null ? ' now ' : <Moment format="DD/MM/YYYY" >{exp.to} </Moment>}

                </p>
                <p><strong>Position : </strong>{exp.title}</p>
                <p>
                    {exp.location === '' ? null : (<span><strong>Location : </strong>{exp.location}</span>)}
                </p>
                {exp.description === '' ? null : (<span><strong>Description : </strong>{exp.description}</span>)}

            </li>
        ))
        const eduItem = education.map((edu) => (
            <li key={edu._id} className='list-group-item m-2 ' style={{ background: '#131419', border: '2px solid #03e9f4' }}   >

                <h4>{edu.school}</h4>
                <p>
                    <Moment format="DD/MM/YYYY" >{edu.from}</Moment> -
                    {edu.to === null ? ' now ' : (<Moment format="DD/MM/YYYY" >{edu.to}</Moment>
                    )}

                </p>
                <p><strong>Degree : </strong>{edu.degree}</p>
                <p><strong>Field of Study : </strong>{edu.fieldofstudy}</p>

                {edu.description === '' ? null : (<span><strong>Description : </strong>{edu.description}</span>)}

            </li>
        ))

        return (
            <div className='container' style={{ background: '#131419' }} >
                <div className="row">
                    <div className="col-md-6 " >
                        <h3 className="text-center"> Experience</h3>
                        {expItm.length > 0 ? <ul className='list-group' style={{ background: '#131419' }}  >{expItm}</ul> : (<p className='text-center' style={{ background: '#131419' }} >No experience listed</p>)}
                    </div>
                    <div className="col-md-6">
                        <h3 className="text-center"> Education</h3>
                        {expItm.length > 0 ? <ul className='list-group' style={{ background: '#131419' }} >{eduItem}</ul> : (<p className='text-center' style={{ background: '#131419' }} >No Education listed</p>)}
                    </div>
                </div>
            </div>
        )
    }
}

export default Profilecreds