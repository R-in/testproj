import React from 'react'
import PropTypes from 'prop-types'
import Moment from 'react-moment'

function ProfileEducation({
    education: {school, degree, fieldofstudy, current, to, from, description}
}) {
    return (
        <div>
            <h3 class="text-dark">{school}</h3>
            <p>
                <Moment date={from} format="YYYY/MM/DD" /> - 
                {
                    !to ? 'Now' : (<Moment date={to} format="YYYY/MM/DD" />)
                }
            </p>
            <p><strong>Degree: </strong>{degree}</p>
            <p><strong>Field Of Study: </strong>{fieldofstudy}</p>
            <p>
              <strong>Description: </strong>{description}
            </p>
          </div>
    )
}

ProfileEducation.propTypes = {
 education: PropTypes.array.isRequired,
}

export default ProfileEducation