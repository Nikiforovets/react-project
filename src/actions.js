import { LIST_LOADED, LIST_LOADING, CHANGE_OFFSET, ARTICLE_LOADED, USER_DATA_LOADED } from './constants';

const listLoaded = (newList, count) => {
  return {
    type: LIST_LOADED,
    payload: newList,
    articlesCount: count
  };
};

const listLoading = () => {
  return {
    type: LIST_LOADING
  };
};

const changeOffset = id => {
  return {
    type: CHANGE_OFFSET,
    payload: id
  };
};

const articleLoaded = data => {
  return {
    type: ARTICLE_LOADED,
    payload: data
  }
}

const userDataLoaded = data => {
  return {
    type: USER_DATA_LOADED,
    payload: data
  }
}

export { listLoaded, listLoading, changeOffset, articleLoaded, userDataLoaded };
