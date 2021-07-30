import React, {Fragment, useEffect} from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux';
import Spinner from '../layout/Spinner';
import { getProfiles } from '../../actions/profile';
import ProfileItem from './ProfileItem'


function Profiles({getProfiles, profile: { profiles, loading }}) {
    useEffect(() => {
        getProfiles();
    }, [getProfiles])
    return <Fragment> 
        {
            loading ? <Spinner /> : <Fragment>
                <h1 className="large text-primary"> Eteam Engineers</h1>
                <p className="lead">
                    <i className="fab fa-connectdevelop"></i> Browse and Connect with Devs
                </p>
                <div className="profiles">
                    {
                        profiles.length > 0 ? (
                            profiles.map( profile => (
                                <ProfileItem key={profile._id} profile={profile} />
                            ))
                        ) : <h4> No Profiles </h4>
                    }
                </div>
            </Fragment>
        }
    </Fragment>
}

Profiles.propTypes = {

}

const mapStateToProps = state => ({
    profile: state.profile
})

export default connect(mapStateToProps, {getProfiles})(Profiles)