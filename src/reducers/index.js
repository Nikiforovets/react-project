import { LIST_LOADED, LIST_LOADING, CHANGE_OFFSET, ARTICLE_LOADED, USER_DATA_LOADED } from '../constants';

const initialState = {
  articles: [],
  articlesLimit: 10,
  articlesOffset: 0,
  articlesCount: 0,
  loading: false,
  currentPage: 1,
  articleData: [],
  userProfileData: []
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case LIST_LOADED:
      return {
        ...state,
        loading: false,
        articles: action.payload,
        articlesCount: action.articlesCount,
      };
    case LIST_LOADING:
      return { ...state, loading: true };
    case CHANGE_OFFSET:
      return {
        ...state,
        articlesOffset: (action.payload - 1) * state.articlesLimit,
        currentPage: action.payload,
      };
    case ARTICLE_LOADED:
      return {
        ...state,
        loading: false,
        articleData: action.payload
      }
    case USER_DATA_LOADED: {
      return {
        ...state,
        loading: false,
        userProfileData: action.payload
      }
    }
    default:
      return state;
  }
};

export default reducer;
