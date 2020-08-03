import React from 'react';
import SwapService from '../../services/swap-service';
import { connect } from 'react-redux';
import { pageLoading, userDataLoaded } from '../../actions';
import { withRouter } from "react-router-dom";
import Spinner from '../../components/spinner';
import ArticleList from '../../components/article-list';
import Follow from '../../components/follow';
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

    myPosts = {
        url: '?author=',
        name: 'My Posts',
        identificator: 'my-posts',
        requireAuthorization: false
    }

    favoritedPosts = {
        url: '?favorited=',
        name: 'Favorited Posts',
        identificator: 'favorited-posts',
        requireAuthorization: false
    }

    render() {
        const { loading, userProfileData, userProfileData: { profile }, history } = this.props;
        if (loading === true || userProfileData.length === 0) {
            return <Spinner />;
        }

        return (
            <div>
                <div className='user-page-banner'>
                    <img className='author-image' alt='author' src={profile.image} />
                    <h3>{profile.username}</h3>
                    <span className='bio'>{profile.bio}</span>
                    <div>
                        <Follow following={profile.following} username={profile.username} />
                    </div>
                </div>
                <div>
                    <ArticleList author={profile.username} firstTab={this.myPosts} secondTab={this.favoritedPosts} />
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