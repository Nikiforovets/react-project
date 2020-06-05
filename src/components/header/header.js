import React from 'react';
import { Link } from 'react-router-dom';
import SwapService from '../../services/swap-service';
import { connect } from 'react-redux';
import { setUserData } from '../../actions';
import './header.css';

class Header extends React.Component {
  swapService = new SwapService();

  componentDidMount = () => {
    if (localStorage.getItem('token')) {
      this.swapService.getCurrentUserInfo().then((data) => {
        this.props.setUserData(data);
      });
    }
  }

  render() {
    let userAuthorize = '';
    if (!localStorage.getItem('token') && this.props.userData.length === 0) {
      userAuthorize =
        <>
          <li><Link to={`/login`}>Sign in</Link></li>
          <li><Link to={`/register`}>Sign up</Link></li>
        </>
    } else {
      let username = '';
      if (this.props.userData.length !== 0)
        username = this.props.userData.user.username;
      userAuthorize =
        <>
          <li><Link to={`/editor`}>New Article</Link></li>
          <li><Link to={`/`}>Settings</Link></li>
          <li><Link to={`/`}>{username}</Link></li>
        </>
    }
    return (
      <header className='header'>
        <Link to='/'><h2 className='logo'>My app</h2></Link>
        <ul>
          <li><Link to={`/`}>Home</Link></li>
          {userAuthorize}
        </ul>
      </header>
    );
  }
};


const mapStateToProps = state => {
  return {
    userData: state.loggedInUserData
  }
}

const mapDispatchToProps = dispatch => {
  return {
    setUserData: data => dispatch(setUserData(data))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Header);
