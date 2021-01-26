import jwtDecode, { JwtPayload } from "jwt-decode";
import {
  ADD_TOKEN,
  REMOVE_TOKEN,
  SET_LOADING,
  UPDATE_USER,
} from "./actionTypes";
import { Dispatch } from "redux";
import { push } from "connected-react-router";
import { AuthApi } from "../../api";

const addToken = (token: string) => ({
  type: ADD_TOKEN,
  payload: {
    token,
  },
});

const removeToken = () => ({
  type: REMOVE_TOKEN,
  payload: {},
});

const updateUser = (user: any) => ({
  type: UPDATE_USER,
  payload: {
    user,
  },
});

const setLoading = (loading: boolean) => ({
  type: SET_LOADING,
  payload: {
    loading,
  },
});

export const login = (phone: string, password: string, from?: string) => {
  return async (dispatch: Dispatch) => {
    try {
      dispatch(setLoading(true));
      const { data } = await AuthApi.login(phone, password);
      const { token } = data;
      dispatch(addToken(token));
      const user = jwtDecode<JwtPayload>(token);
      dispatch(updateUser(user));
      dispatch(setLoading(false));
      dispatch(push(from || "/"));
    } catch (err) {
      window.alert(err);
      dispatch(setLoading(false));
    }
  };
};

export const logout = () => {
  return (dispatch: Dispatch) => {
    dispatch(updateUser({}));
    dispatch(removeToken());
  };
};

export const reverify = (phone: string) => {
  return async (dispatch: Dispatch) => {
    dispatch(setLoading(true));
    // await AuthApi.reverify(phone);
    dispatch(setLoading(false));
  };
};
