import React from 'react';
import { Link } from 'react-router-dom';
import SwapService from '../../services/swap-service';
import ErrorsValidation from '../errors-validation';
import { connect } from 'react-redux';
import { setUserData } from '../../actions';
import './login-page.css';
class LoginPage extends React.Component {
    swapService = new SwapService();

    state = {
        errors: '',
        email: '',
        password: ''
    }

    onSubmit = (e) => {
        e.preventDefault();
        this.swapService.postLoginUser(this.state.email, this.state.password)
            .then((data) => {
                if (data.errors) {
                    this.setState({
                        errors: data.errors
                    })
                } else {
                    this.setState({
                        errors: ''
                    });
                    localStorage.setItem('token', data.user.token);
                    this.swapService.getCurrentUserInfo().then((data) => {
                        this.props.setUserData(data);
                    });
                    this.props.history.push('/');
                }
            });
        this.setState({
            username: "",
            email: "",
            password: ""
        });
    }

    updateFields = e => {
        if (e.target.className === "signin-email") {
            this.setState({ email: e.target.value });
        }
        if (e.target.className === "signin-pass") {
            this.setState({ password: e.target.value });
        }
    };

    render() {
        return (
            <div className='sign-in'>
                <h1>Sign In</h1>
                <h5><Link to={'/register'}>Need an account?</Link></h5>
                <ErrorsValidation errors={this.state.errors} />
                <form className="signin-form" onSubmit={this.onSubmit}>
                    <input
                        type="text"
                        className="signin-email"
                        value={this.state.email}
                        placeholder="email"
                        onChange={this.updateFields}
                    ></input>
                    <input
                        type="password"
                        className="signin-pass"
                        value={this.state.password}
                        placeholder="password"
                        onChange={this.updateFields}
                    ></input>
                    <button>Sign in</button>
                </form>
            </div>
        )
    }
}

const mapDispatchToProps = dispatch => {
    return {
        setUserData: data => dispatch(setUserData(data))
    }
}

export default connect(null, mapDispatchToProps)(LoginPage);