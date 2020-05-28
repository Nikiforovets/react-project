import React from 'react';
import SwapService from '../../services/swap-service';
import { connect } from 'react-redux';
import { listLoading, articleLoaded } from '../../actions';
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
    const { listLoading, articleLoaded } = this.props;
    listLoading();
    this.swapService.getArticle(this.props.history.location.pathname).then((data) => {
      articleLoaded(data);
    });
  };

  render() {
    const { loading, articleData, articleData: { article } } = this.props;
    if (loading === true || articleData.length === 0) {
      return <Spinner />;
    }

    return (<div>
      <div className='article-page-banner'>
        <h1>{article.title}</h1>
        <div className='article-page-user-data'>
          <Link to={`/profiles/${article.author.username}`}>
            <UserData image={article.author.image} username={article.author.username} date={article.createdAt} />
          </Link>
          <Follow following={article.author.following} username={article.author.username} />
          <Like favoritesCount={article.favoritesCount} favorited={article.favorited} label='Favorite article' />
        </div>
      </div>
      <p className='body-text'>{article.body}</p>
    </div>)

  }
}

const mapStateToProps = (state) => {
  return {
    loading: state.loading,
    articleData: state.articleData
  };
};

const mapDispatchToProps = dispatch => {
  return {
    listLoading: () => dispatch(listLoading()),
    articleLoaded: data => dispatch(articleLoaded(data))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(ArticlePage));