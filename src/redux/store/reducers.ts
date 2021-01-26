import { combineReducers } from "redux";

import taskgroupReducer from "./taskgroup/reducers";
import authReducer from "./auth/reducers";
import { connectRouter } from "connected-react-router";
import { History } from "history";

const createRootReducer = (history: History) =>
  combineReducers({
    router: connectRouter(history),
    taskgroup: taskgroupReducer,
    auth: authReducer,
  });

export default createRootReducer;
