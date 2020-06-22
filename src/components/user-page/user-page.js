import React from 'react';
import SwapService from '../../services/swap-service';
import { connect } from 'react-redux';
import { pageLoading, userDataLoaded } from '../../actions';
import { withRouter } from "react-router-dom";
import Spinner from '../spinner';
import UserData from '../user-data';
import ArticleList from '../article-list';
import Like from '../like';
import Follow from '../follow';
import { Link } from 'react-router-dom';
import './user-page.css';

class UserPage extends React.Component {
    swapService = new SwapService();

    componentDidMount() {
        const { pageLoading, userDataLoaded } = this.props;
        pageLoading();
        this.swapService.getUserProfile(this.props.history.location.pathname).then((data) => {
            userDataLoaded(data);
        });
    }

    render() {
        const { loading, userProfileData, userProfileData: { profile } } = this.props;
        if (loading === true || userProfileData.length === 0) {
            return <Spinner />;
        }

        return (
            <div>
                <div className='user-page-banner'>
                    <img className='author-image' alt='author' src={profile.image} />
                    <h3>{profile.username}</h3>
                    <div>
                        <Follow following={profile.following} username={profile.username} history={this.props.history} />
                    </div>
                </div>
                <div>
                    <ArticleList author={profile.username} />
                </div>
            </div >
        )
    }
}

const mapStateToProps = state => {
    return {
        loading: state.pageLoading,
        userProfileData: state.userProfileData
    }
}

const mapDispatchToProps = dispatch => {
    return {
        pageLoading: () => dispatch(pageLoading()),
        userDataLoaded: data => dispatch(userDataLoaded(data))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(UserPage));