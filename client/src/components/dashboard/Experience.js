import React, {Fragment} from 'react'
import Moment from 'react-moment';
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { deleteExperience } from '../../actions/profile';

function Experience({ experience, deleteExperience }) {

    //const date = "2020-01-24T00:00:00.000Z";
    const experiences = experience.map( exp => (
        <tr key={exp._id}> 
            <td> { exp.company }</td>
            <td className="hide-sm"> { exp.title }</td>
            <td className="hide-sm"> 
                <Moment date={exp.from} format="YYYY/MM/DD" /> - 
                {
                    exp.to === null ? ('Now') : (<Moment date={exp.to} format="YYYY/MM/DD" />)
                }
            </td>
            <td>
                <button onClick={() => deleteExperience(exp._id)} className="btn btn-danger"> Delete </button>
            </td>
        </tr>
    )) 

    return (
        <Fragment>
            <h2 className="my-2"> Experience Credientials</h2>
            <table className="table">
                <thead>
                    <tr>
                        <th>Company</th>
                        <th className='hide-sm'> Title</th>
                        <th className='hide-sm'> Years</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    { experiences }
                </tbody>
            </table>
        </Fragment>
    )
}

Experience.propTypes = {
    experience: PropTypes.array.isRequired,
    deleteExperience: PropTypes.func.isRequired
}

export default connect(null, { deleteExperience})(Experience)