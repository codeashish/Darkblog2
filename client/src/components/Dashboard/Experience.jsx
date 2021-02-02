import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { withRouter } from 'react-router-dom'
import Moment from 'react-moment'
import { DeleteExperience } from '../../actions/profileactions'

class Experience extends Component {


    onDeleteClick(id) {
        this.props.DeleteExperience(id, this.props.history)
    }

    render() {
        let experience;
        if (this.props.experience) {
            experience = this.props.experience.map(exp => (

                <tr key={exp._id} >
                    <td>{exp.company}</td>
                    <td>{exp.title}</td>

                    <td>
                        <Moment format="DD/MM/YYYY" >{exp.from}</Moment> - {exp.to === null ? (' now') : (<Moment format="DD/MM/YYYY" >{exp.to}</Moment>)}</td>
                    <td><button className="btn btn-danger deletebutton"
                        style={{ padding: '10px', border: '2px solid red', background: '#131419', color: 'red' }}
                        onClick={this.onDeleteClick.bind(this, exp._id)}  >Delete</button></td>
                </tr>
            ))
        } else {
            experience = null
        }
        return (
            <div style={{ border: '2px solid #03e9f4' }} className='m-4 p-3 table-responsive' >
                <h4 className='mb-4 ' style={{ color: '#03e9f4' }} >Experience Credientials :</h4>
                <table className='table' style={{ color: '#03e9f4' }}  >
                    <thead>

                        <tr>
                            <th>Comapany</th>
                            <th>Title</th>
                            <th>Years</th>
                            <th />
                        </tr>
                    </thead>
                    <thead>
                        {experience}

                    </thead>

                </table>
            </div>
        )
    }
}
Experience.propTypes = {
    DeleteExperience: PropTypes.func.isRequired,
}

export default connect(null, { DeleteExperience })(withRouter(Experience))