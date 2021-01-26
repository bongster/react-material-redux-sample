import { routerMiddleware } from "connected-react-router";
import { createBrowserHistory } from "history";
import { applyMiddleware, createStore, compose } from "redux";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage"; // defaults to localStorage for web

import thunkMiddleware from "redux-thunk";
import loggerMiddleware from "../middleware/logger";

import createRootReducer from "./reducers";

export const history = createBrowserHistory();

export type RootState = ReturnType<typeof createRootReducer>;

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["auth"],
};

interface StoreProps {
  store: any;
  persistor: any;
}

const configureStore = (preloadedState?: any): StoreProps => {
  const middlewareEnhancer = applyMiddleware(
    routerMiddleware(history),
    loggerMiddleware,
    thunkMiddleware
  );

  const composedEnhancers = compose(middlewareEnhancer);
  const store = createStore(
    persistReducer(persistConfig, createRootReducer(history)),
    preloadedState,
    composedEnhancers
  );
  const persistor = persistStore(store);
  return { store, persistor };
};
export default configureStore;
