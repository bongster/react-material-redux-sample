import {
  ADD_TASKGROUP,
  UPDATE_TASKGROUPS,
  SET_LOADING,
  UPDATE_TASKGROUP,
} from "./actionTypes";

const initialState: any = {
  isLoading: false,
  taskgroups: [],
  taskgroup: null,
};

const todoReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case ADD_TASKGROUP:
      return {
        ...state,
        taskgroups: [
          ...state.taskgroups,
          {
            ...action.payload,
          },
        ],
      };
    case UPDATE_TASKGROUP:
      return {
        ...state,
        taskgroup: action.payload,
      };
    case SET_LOADING:
      return {
        ...state,
        isLoading: action.payload.isLoading,
      };
    case UPDATE_TASKGROUPS:
      return {
        ...state,
        taskgroups: action.payload.taskgroups,
      };
    default:
      return state;
  }
};

export default todoReducer;
