import React from 'react';
import SwapService from '../../services/swap-service';
import { connect } from 'react-redux';
import { pageLoading, articleLoaded, setUserData } from '../../actions';
import { withRouter } from "react-router-dom";
import Spinner from '../spinner';
import UserData from '../user-data';
import Like from '../like';
import Follow from '../follow';
import { Link } from 'react-router-dom';
import './article-page.css';

class ArticlePage extends React.Component {
  swapService = new SwapService();

  componentDidMount() {
    const { pageLoading, articleLoaded } = this.props;
    pageLoading();
    this.swapService.getArticle(this.props.history.location.pathname)
      .then((data) => {
        this.swapService.getCurrentUserInfo()
          .then((userdata) => {
            this.props.setUserData(userdata);
            articleLoaded(data);
          });
      });
  };

  render() {
    const { loading, articleData, articleData: { article }, loggedInUserData } = this.props;
    let articleControl = '';
    if (loading === true || articleData.length === 0) {
      return <Spinner />;
    }
    console.log(loggedInUserData);
    if (article.author.username !== loggedInUserData.user.username) {
      articleControl = <>
        <Follow following={article.author.following} username={article.author.username} />
        <Like favoritesCount={article.favoritesCount} favorited={article.favorited} label='Favorite article' />
      </>
    } else {
      articleControl = <>
        <button className='edit-article'>Edit article</button>
        <button className='delete-article'>Delete article</button>
      </>
    }
    return (<div>
      <div className='article-page-banner'>
        <h1>{article.title}</h1>
        <div className='article-page-user-data'>
          <Link to={`/profiles/${article.author.username}`}>
            <UserData image={article.author.image} username={article.author.username} date={article.createdAt} />
          </Link>
          {articleControl}
        </div>
      </div>
      <p className='body-text'>{article.body}</p>
    </div>)

  }
}

const mapStateToProps = (state) => {
  return {
    loading: state.pageLoading,
    articleData: state.articleData,
    loggedInUserData: state.loggedInUserData
  };
};

const mapDispatchToProps = dispatch => {
  return {
    pageLoading: () => dispatch(pageLoading()),
    articleLoaded: data => dispatch(articleLoaded(data)),
    setUserData: data => dispatch(setUserData(data))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(ArticlePage));