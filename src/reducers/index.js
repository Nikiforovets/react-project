import { USER_CREATED, SET_USER_DATA, LIST_LOADED, LIST_LOADING, CHANGE_OFFSET, ARTICLE_LOADED, USER_DATA_LOADED, PAGE_LOADING } from '../constants';

const initialState = {
  articles: [],
  articlesLimit: 10,
  articlesCount: 0,
  pageLoading: false,
  listLoading: false,
  currentPage: 1,
  articleData: [],
  userProfileData: [],
  loggedInUserData: []
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case LIST_LOADED:
      return {
        ...state,
        listLoading: false,
        articles: action.payload,
        articlesCount: action.articlesCount,
      };
    case LIST_LOADING:
      return { ...state, listLoading: true };
    case CHANGE_OFFSET:
      return {
        ...state,
        currentPage: action.payload
      };
    case PAGE_LOADING:
      return {
        ...state,
        pageLoading: true
      }
    case ARTICLE_LOADED:
      return {
        ...state,
        pageLoading: false,
        articleData: action.payload
      }
    case USER_DATA_LOADED:
      return {
        ...state,
        pageLoading: false,
        userProfileData: action.payload
      }
    case SET_USER_DATA:
      return {
        ...state,
        loggedInUserData: action.data
      }
    default:
      return state;
  }
};

export default reducer;
