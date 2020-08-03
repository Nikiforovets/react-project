import React, { useState, useEffect } from 'react';
import SwapService from '../../services/swap-service'
import { setUserData } from '../../actions';
import { connect } from 'react-redux';
import ErrorsValidation from '../errors-validation';
import { useDispatch, useSelector } from 'react-redux';
import './settings.css';

class Settings extends React.Component {
    swapService = new SwapService();

    state = {
        image: '',
        username: '',
        bio: '',
        email: '',
        password: '',
        errors: ''
    }

    componentDidMount = () => {
        if (!this.props.userData.user) {
            if (localStorage.getItem('token')) {
                this.swapService.getCurrentUserInfo().then((data) => {
                    const { bio, username, email, image } = data.user;
                    this.props.setUserData(data);
                    this.setState({
                        image: image,
                        username: username,
                        bio: bio,
                        email: email
                    });
                });
            }
        } else {
            const { bio, username, email, image } = this.props.userData.user;
            this.setState({
                image: image,
                username: username,
                bio: bio,
                email: email
            });
        }

    }

    updateFields = e => {
        if (e.target.className === "picture-url") {
            this.setState({ image: e.target.value });
        }
        if (e.target.className === "username") {
            this.setState({ username: e.target.value });
        }
        if (e.target.className === "user-description") {
            this.setState({ bio: e.target.value });
        }
        if (e.target.className === "new-email") {
            this.setState({ email: e.target.value });
        }
        if (e.target.className === "new-password") {
            this.setState({ password: e.target.value });
        }
    };

    onSubmit = (e) => {
        const { bio, image, username, email, password } = this.state;
        const { createdAt, id, updatedAt } = this.props.userData.user;
        e.preventDefault();
        this.swapService.putSettings(bio, createdAt, email, id, image, password, updatedAt, username)
            .then((data) => {
                if (data.errors) {
                    this.setState({
                        errors: data.errors
                    });
                } else {
                    this.setState({
                        errors: ''
                    });
                    this.props.setUserData(data);
                    this.props.history.push(`/profiles/${username}`);
                }
            });
    }


    logout = () => {
        this.props.setUserData('');
        localStorage.removeItem('token');
        this.props.history.push('/');
    }

    render() {
        const { bio, username, email, image } = this.state;
        return (
            <div className='settings-page'>
                <ErrorsValidation errors={this.state.errors} />
                <h1 className='settings-header'>Your settings</h1>
                <form className='settings-form' onSubmit={this.onSubmit}>
                    <input type='text'
                        className='picture-url'
                        placeholder='URL of profile picture'
                        value={image}
                        onChange={this.updateFields}>
                    </input>
                    <input type='text'
                        className='username'
                        placeholder='Username'
                        value={username}
                        onChange={this.updateFields}>
                    </input>
                    <textarea type='text'
                        className='user-description'
                        placeholder='Short bio about you'
                        value={bio}
                        onChange={this.updateFields}>
                    </textarea>
                    <input type='text'
                        className='new-email'
                        placeholder='New email'
                        value={email}
                        onChange={this.updateFields}>
                    </input>
                    <input type='password'
                        className='new-password'
                        placeholder='New password'
                        onChange={this.updateFields}>
                    </input>
                    <button className='update-settings-btn'>Update settings</button>
                </form>
                <button className='logoutButton' onClick={this.logout} >Click here to logout</button>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        userData: state.loggedInUserData
    };
}

const mapDispatchToProps = dispatch => {
    return {
        setUserData: data => dispatch(setUserData(data))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Settings);

// const Settings = (history) => {

//     const swapService = new SwapService();

//     const userData = useSelector(state => state.loggedInUserData);
//     console.log(userData.user);

//     const dispatch = useDispatch();

//     const [errors, setErrors] = useState();
//     const [description, setDescription] = useState();
//     const [pictureUrl, setPictureUrl] = useState();
//     const [username, setUsername] = useState();
//     const [email, setEmail] = useState();
//     const [password, setPassword] = useState();


//     // useEffect(() => {
//     //     // Обновляем заголовок документа с помощью API браузера
//     //     // document.title = `Вы нажали ${count} раз`;
//     //     console.log(userData.user);
//     //     setPictureUrl();
//     // });

//     //const [todos, dispatch] = useReducer(todosReducer);

//     const onSubmit = (e) => {
//         const { createdAt, id, updatedAt } = userData.user;
//         e.preventDefault();
//         swapService.putSettings(description, createdAt, email, id, pictureUrl, password, updatedAt, username)
//             .then((data) => {
//                 if (data.errors) {
//                     setErrors(data.errors);
//                 } else {
//                     setErrors('');
//                     //this.props.setUserData(data);
//                     //history.push(`/profiles/${username}`);
//                 }
//             });
//     }

//     return (
//         <div className='settings-page'>
//             <ErrorsValidation errors={errors} />
//             <h1 className='settings-header'>Your settings</h1>
//             <form className='settings-form' onSubmit={onSubmit}
//             >
//                 <input type='text'
//                     className='picture-url'
//                     placeholder='URL of profile picture'
//                     value={pictureUrl}
//                 // onChange={this.updateFields}
//                 >
//                 </input>
//                 <input type='text'
//                     className='username'
//                     placeholder='Username'
//                 // onChange={this.updateFields}
//                 >
//                 </input>
//                 <textarea type='text'
//                     className='user-description'
//                     placeholder='Short bio about you'
//                 // onChange={this.updateFields}
//                 >
//                 </textarea>
//                 <input type='text'
//                     className='new-email'
//                     placeholder='New email'
//                 // onChange={this.updateFields}
//                 >
//                 </input>
//                 <input type='text'
//                     className='new-password'
//                     placeholder='New password'
//                 // onChange={this.updateFields}
//                 >
//                 </input>
//                 <button className='update-settings-btn'>Update settings</button>
//             </form>
//             <button className='logoutButton'
//             // onClick={this.logout}
//             >
//                 Click here to logout
//             </button>
//         </div>
//     )
// }

// export default Settings;