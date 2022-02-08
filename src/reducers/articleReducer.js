import {
  SET_LOADING_STATUS,
  GET_ARTICLES,
  SET_PROGRESS,
} from "../actions/actionType";
export const initState = {
  loading: false,
  articles: [],
  progress: 0,
};

const articleReducer = (state = initState, action) => {
  switch (action.type) {
    case SET_LOADING_STATUS:
      return {
        ...state,
        loading: action.status,
      };
    case GET_ARTICLES:
      return {
        ...state,
        articles: action.payload,
      };
    case SET_PROGRESS:
      return {
        ...state,
        progress: action.progress,
      };
    default:
      return state;
  }
};

export default articleReducer;
