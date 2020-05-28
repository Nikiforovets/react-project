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
    const { listLoaded, listLoading } = this.props;
    //listLoading();
    this.swapService.getArticlesList(this.props.articlesOffset).then((data) => {
      listLoaded(data.articles, data.articlesCount);
    });
  };

  changePage = (id) => {
    const { changeOffset, listLoaded, listLoading } = this.props;
    //listLoading();
    changeOffset(id);
    this.swapService.getArticlesList(this.props.articlesOffset).then((data) => {
      listLoaded(data.articles, data.articlesCount);
    });
  };

  render = () => {
    const { articlesCount, articlesLimit, currentPage } = this.props;
    let pagesList = [];
    for (let i = 1; i <= articlesCount / articlesLimit; i++) {
      pagesList.push(i);
    }

    //if (this.props.loading) return <Spinner />;
    //else {
    return (
      <>
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
                changePage={(id) => this.changePage(id)}
                key={`page` + element}
              />
            ))}
          </div>
        </div>
      </>
    );
    //}
  };
}

const mapStateToProps = (state) => {
  return {
    articles: state.articles,
    loading: state.loading,
    articlesCount: state.articlesCount,
    articlesLimit: state.articlesLimit,
    articlesOffset: state.articlesOffset,
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
