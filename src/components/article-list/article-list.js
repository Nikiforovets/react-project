import React from 'react';
import ArticleItem from '../article-item';
import SwapService from '../../services/swap-service';
import Spinner from '../spinner';
import { connect } from 'react-redux';
import { listLoaded, listLoading, changeOffset } from '../../actions';
import PaginationItem from '../pagination';
import { withRouter } from 'react-router-dom';
import './article-list.css';

class ArticleList extends React.Component {
  swapService = new SwapService();

  state = {
    currentTab: '',
    firstTabStyle: '',
    secondTabStyle: ''
  }

  componentDidMount = () => {
    const { firstTab, secondTab } = this.props;
    if ((firstTab.requireAuthorization && localStorage.getItem('token')) || (!firstTab.requireAuthorization)) {
      this.changePage(1, firstTab);
      this.setState({
        firstTabStyle: 'current-tab',
        secondTabStyle: ''
      });
    } else {
      this.changePage(1, secondTab);
      this.setState({
        firstTabStyle: '',
        secondTabStyle: 'current-tab'
      });
    }
  };

  changePage = (id, tab) => {
    const { changeOffset, listLoaded, listLoading, author } = this.props;
    this.setState({
      currentTab: tab
    });
    listLoading();
    changeOffset(id);
    this.swapService.getArticlesList((id - 1) * 10, author, tab.url).then((data) => {
      listLoaded(data.articles, data.articlesCount);
    });
  };

  clickOnTab = (e) => {
    const { firstTab, secondTab } = this.props;
    if (e.target.id == 'first-tab') {
      if ((firstTab.requireAuthorization && localStorage.getItem('token')) || (!firstTab.requireAuthorization)) {
        this.changePage(1, firstTab);
        this.setState({
          firstTabStyle: 'current-tab',
          secondTabStyle: ''
        });
      } else {
        this.props.history.push('/login');
      }
    } else {
      if ((secondTab.requireAuthorization && localStorage.getItem('token')) || (!secondTab.requireAuthorization)) {
        this.changePage(1, secondTab);
        this.setState({
          firstTabStyle: '',
          secondTabStyle: 'current-tab'
        });
      } else {
        this.props.history.push('/login');
      }
    }
  }

  render = () => {
    const { articlesCount, articlesLimit, currentPage, firstTab, secondTab } = this.props;
    let pagesList = [];

    for (let i = 1; i <= (articlesCount / articlesLimit) + 1; i++) {
      pagesList.push(i);
    }

    if (this.props.loading) return <Spinner />;
    else {
      return (
        <>
          <div className='tab-panel'>
            <button id='first-tab' className={this.state.firstTabStyle} onClick={this.clickOnTab}>{firstTab.name}</button>
            <button id='second-tab' className={this.state.secondTabStyle} onClick={this.clickOnTab}>{secondTab.name}</button>
          </div>
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
                  changePage={(id) => this.changePage(id, this.state.currentTab)}
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

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(ArticleList));
