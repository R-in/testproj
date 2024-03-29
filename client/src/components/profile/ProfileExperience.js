import React from 'react'
import PropTypes from 'prop-types'
import Moment from 'react-moment'

function ProfileExperience({
    experience: {company, title, location, current, to, from, description}
}) {
    return (
        <div>
            <h3 class="text-dark">{company}</h3>
            <p>
                <Moment date={from} format="YYYY/MM/DD" /> - 
                {
                    !to ? 'Now' : (<Moment date={to} format="YYYY/MM/DD" />)
                }
            </p>
            <p><strong>Position: </strong>{title}</p>
            <p>
              <strong>Description: </strong>{description}
            </p>
          </div>
    )
}

ProfileExperience.propTypes = {
 experience: PropTypes.array.isRequired,
}

export default ProfileExperience