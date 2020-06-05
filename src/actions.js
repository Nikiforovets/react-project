import {SET_USER_DATA, LIST_LOADED, LIST_LOADING, CHANGE_OFFSET, ARTICLE_LOADED, USER_DATA_LOADED, PAGE_LOADING } from './constants';

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

const pageLoading = () => {
  return {
    type: PAGE_LOADING
  }
}

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

const setUserData = (data) => {
  return {
    type: SET_USER_DATA,
    data: data
  }
}

export { setUserData, listLoaded, listLoading, changeOffset, articleLoaded, userDataLoaded, pageLoading };
