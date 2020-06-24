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

  componentDidMount = () => {
    const { firstTab, secondTab } = this.props;
    if ((firstTab.requireAuthorization && localStorage.getItem('token')) || (!firstTab.requireAuthorization)) {
      this.changePage(1, firstTab.url);
    } else {
      this.changePage(1, secondTab.url);
    }
  };

  changePage = (id, url = '?') => {
    const { changeOffset, listLoaded, listLoading, author } = this.props;
    listLoading();
    changeOffset(id);
    this.swapService.getArticlesList((id - 1) * 10, author, url).then((data) => {
      listLoaded(data.articles, data.articlesCount);
    });
  };

  clickOnTab = (e) => {
    const { firstTab, secondTab } = this.props;
    if (e.target.className == 'first-tab') {
      if ((firstTab.requireAuthorization && localStorage.getItem('token')) || (!firstTab.requireAuthorization)) {
      } else {
        this.props.history.push('/login');
      }
    } else {
      if ((secondTab.requireAuthorization && localStorage.getItem('token')) || (!secondTab.requireAuthorization)) {
        this.changePage(1, secondTab.url);
      } else {
        this.props.history.push('/login');
      }
    }
  }

  render = () => {
    const { articlesCount, articlesLimit, currentPage, author, firstTab, secondTab } = this.props;
    let pagesList = [];
    let tabs;

    tabs =
      <div className='tab-panel'>
        <button className='first-tab' onClick={this.clickOnTab}>{firstTab.name}</button>
        <button className='second-tab' onClick={this.clickOnTab}>{secondTab.name}</button>
      </div>

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
