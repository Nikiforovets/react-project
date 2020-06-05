import React from 'react';
import ArticleItem from '../article-item';
import SwapService from '../../services/swap-service';
import Spinner from '../spinner';
import { connect } from 'react-redux';
import { listLoaded, listLoading, changeOffset } from '../../actions';
import PaginationItem from '../pagination';
import './article-list.css';

class ArticleList extends React.Component {
  swapService = new SwapService();

  state = {
    feed: ''
  }

  componentDidMount = () => {
    const { listLoaded, listLoading, author } = this.props;
    listLoading();
    this.swapService.getArticlesList(0, author, '').then((data) => {
      listLoaded(data.articles, data.articlesCount);
    });
  };

  changePage = (id, feed = '') => {
    const { changeOffset, listLoaded, listLoading, author } = this.props;
    listLoading();
    changeOffset(id);
    this.swapService.getArticlesList((id - 1) * 10, author, feed).then((data) => {
      listLoaded(data.articles, data.articlesCount);
    });
  };

  showGlobalFeed = (e) => {
    this.changePage(1, '');
    this.setState({ feed: '' })
  }

  showYourFeed = (e) => {
    if (localStorage.getItem('token')) {
      this.changePage(1, '/feed');
      this.setState({ feed: '/feed' })
    } else {
      this.props.redirect();
    }
  }

  render = () => {
    const { articlesCount, articlesLimit, currentPage, author } = this.props;
    console.log(author);
    let pagesList = [];
    let tabs;
    if (!author) {
      tabs =
        <div className='tab-panel'>
          <button className='your-feed' onClick={this.showYourFeed}>Your feed</button>
          <button className='global-feed' onClick={this.showGlobalFeed}>Global feed</button>
        </div>
    } else {
      tabs = '';
    }

    for (let i = 1; i <= (articlesCount / articlesLimit) + 1; i++) {
      pagesList.push(i);
    }

    if (this.props.loading) return <Spinner />;
    else {
      return (
        <>
          {tabs}
          <div className='list-body'>
            {this.props.articles.map((element) => (
              <ArticleItem
                props={element}
                key={element.updatedAt}
              />
            ))}
            <div className='pagination'>
              {pagesList.map((element) => (
                <PaginationItem
                  currentPage={currentPage}
                  number={element}
                  changePage={(id) => this.changePage(id, this.state.feed)}
                  key={`page` + element}
                />
              ))}
            </div>
          </div>
        </>
      );
    }
  };
}

const mapStateToProps = (state) => {
  return {
    articles: state.articles,
    loading: state.listLoading,
    articlesCount: state.articlesCount,
    articlesLimit: state.articlesLimit,
    currentPage: state.currentPage,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    changeOffset: (id) => dispatch(changeOffset(id)),
    listLoading: () => dispatch(listLoading()),
    listLoaded: (list, count) => dispatch(listLoaded(list, count)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ArticleList);
