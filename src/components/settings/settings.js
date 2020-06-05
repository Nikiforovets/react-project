import React from 'react';
import { setUserData } from '../../actions';
import { connect } from 'react-redux';
import './settings.css';

class Settings extends React.Component {
    logout = () => {
        this.props.setUserData('');
        localStorage.removeItem('token');
        this.props.history.push('/');
    }

    render() {
        return (
            <button className='logoutButton' onClick={this.logout} > Logout</button>
        )
    }
}

const mapDispatchToProps = dispatch => {
    return {
        setUserData: data => dispatch(setUserData(data))
    }
}

export default connect(null, mapDispatchToProps)(Settings);