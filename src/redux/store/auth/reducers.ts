import {
  ADD_TOKEN,
  REMOVE_TOKEN,
  SET_LOADING,
  UPDATE_USER,
} from "./actionTypes";

const initialState: any = {
  user: {},
  token: null,
  isLoggined: false,
};

const todoReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case ADD_TOKEN:
      return {
        ...state,
        token: action.payload.token,
        isLoggined: true,
      };
    case UPDATE_USER:
      return {
        ...state,
        user: action.payload.user,
      };
    case SET_LOADING:
      return {
        ...state,
        loading: action.payload.loading,
      };
    case REMOVE_TOKEN:
      return {
        ...state,
        token: null,
        isLoggined: false,
      };
    default:
      return state;
  }
};

export default todoReducer;
