import React from 'react';
import { Link } from 'react-router-dom';
import SwapService from '../../services/swap-service';
import ErrorsValidation from '../../components/errors-validation';
import { connect } from 'react-redux';
import { setUserData } from '../../actions';
import './register-page.css';
class RegisterPage extends React.Component {
    swapService = new SwapService();

    state = {
        errors: '',
        username: '',
        email: '',
        password: ''
    }

    onSubmit = (e) => {
        e.preventDefault();
        this.swapService.postCreateUser(this.state.username, this.state.email, this.state.password)
            .then((data) => {
                if (data.errors) {
                    this.setState({
                        errors: data.errors
                    })
                } else {
                    this.setState({
                        errors: ''
                    })
                    localStorage.setItem('token', data.user.token);
                    this.swapService.getCurrentUserInfo().then((data) => {
                        this.props.setUserData(data);
                    });
                    this.props.history.push('/');
                }
            })
        this.setState({
            username: "",
            email: "",
            password: ""
        });
    }

    updateFields = e => {
        if (e.target.className === "signup-login") {
            this.setState({ username: e.target.value });
        }
        if (e.target.className === "signup-email") {
            this.setState({ email: e.target.value });
        }
        if (e.target.className === "signup-pass") {
            this.setState({ password: e.target.value });
        }
    };

    render() {
        return (
            <div className='sign-up'>
                <h1>Sign Up</h1>
                <h5><Link to={'/login'}>Have an account?</Link></h5>
                <ErrorsValidation errors={this.state.errors} />
                <form className="signup-form" onSubmit={this.onSubmit}>
                    <input
                        type="text"
                        className="signup-login"
                        value={this.state.username}
                        placeholder="username"
                        onChange={this.updateFields}
                    ></input>
                    <input
                        type="text"
                        className="signup-email"
                        value={this.state.email}
                        placeholder="email"
                        onChange={this.updateFields}
                    ></input>
                    <input
                        type="password"
                        className="signup-pass"
                        value={this.state.password}
                        placeholder="password"
                        onChange={this.updateFields}
                    ></input>
                    <button>Sign up</button>
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

export default connect(null, mapDispatchToProps)(RegisterPage);