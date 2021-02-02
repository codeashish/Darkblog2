import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { withRouter } from 'react-router-dom'
import Moment from 'react-moment'
import {DeleteEducation} from '../../actions/profileactions'


class Education extends Component {


onDeleteClick(id){
    this.props.DeleteEducation(id,this.props.history)
}

    render() {
        let education;
        if(this.props.education){
         education = this.props.education.map(edu => (
             <tbody key={edu._id} >
            <tr key={edu._id} >
                <td>{edu.school}</td>
                <td>{edu.degree}</td>

                <td>
                <Moment format="DD/MM/YYYY" >{edu.from}</Moment> - {edu.to === null ? (' now') : (<Moment format="DD/MM/YYYY" >{edu.to}</Moment>)}</td>
                <td><button className="btn btn-danger deletebutton"
                style={{ padding: '10px', border: '2px solid red', background: '#131419', color: 'red' }} 
                 onClick={this.onDeleteClick.bind(this,edu._id)}  >Delete</button></td>     
                        </tr>
                        </tbody>
        ))}
        else{
            education=null   
        }
        return (
            <div style={{border:'2px solid #03e9f4'}} className='m-4 p-3 table-responsive' >
                <h4 className='mb-4 ' style={{ color: '#03e9f4' }} >Education Credientials :</h4>
                <table className='table' style={{ color: '#03e9f4' }}  >
                    <thead>

                        <tr>
                            <th>School</th>
                            <th>Degree</th>
                            <th>Years</th>
                            <th />
                        </tr>
                        </thead>    
                        {education}

               

                </table>
            </div>
        )
    }
}
Education.propTypes={
    DeleteEducation :PropTypes.func.isRequired,
}

export default connect(null,{DeleteEducation})(withRouter(Education))