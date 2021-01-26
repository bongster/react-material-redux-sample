import { Dispatch } from "redux";
import { TaskGroup } from "../../../components/TaskGroup/TaskGroupForm";
import { TaskGroupApi } from "../../api";
import {
  ADD_TASKGROUP,
  SET_LOADING,
  UPDATE_TASKGROUP,
  UPDATE_TASKGROUPS,
} from "./actionTypes";

export const setTaskGroup = (taskgroup: TaskGroup): any => ({
  type: UPDATE_TASKGROUP,
  payload: taskgroup,
});

export const addTaskGroup = (taskGroup: TaskGroup): any => ({
  type: ADD_TASKGROUP,
  payload: taskGroup,
});

export const updateTaskGroups = (taskgroups: any[]): any => ({
  type: UPDATE_TASKGROUPS,
  payload: {
    taskgroups,
  },
});

export const setLoading = (isLoading: boolean): any => ({
  type: SET_LOADING,
  payload: {
    isLoading,
  },
});

export const uploadTaskGroupFile = (file: File, id: number): any => {
  return async (dispatch: Dispatch, getState: () => any) => {
    const { token } = getState().auth;
    const { taskgroups } = getState().taskgroup;
    dispatch(setLoading(true));
    try {
      const fileType = file.name.split(".").pop();
      const filename = `${Date.now()}.${fileType}`;
      const {
        data: { url },
      } = await TaskGroupApi.getUploadUrl(filename);
      await TaskGroupApi.upload(url, file);
      const {
        data: { data },
      } = await TaskGroupApi.update(
        id,
        {
          path: filename,
          status: "UPLOADED",
        },
        {
          Authorization: `Bearer ${token}`,
        }
      );
      const idx: number = taskgroups.findIndex(
        (taskgroup: TaskGroup) => taskgroup.id === id
      );
      taskgroups.splice(idx, 1, data);
      dispatch(updateTaskGroups(taskgroups));

      dispatch(setLoading(false));
    } catch (err) {
      window.alert(err);
      dispatch(setLoading(false));
    }
  };
};

export const generateTaskGroup = (id: number): any => {
  return async (dispatch: Dispatch, getState: () => any) => {
    const { token } = getState().auth;
    const { taskgroups } = getState().taskgroup;
    dispatch(setLoading(true));
    try {
      const {
        data: { data },
      } = await TaskGroupApi.generate(id, {
        Authorization: `Bearer ${token}`,
      });

      const idx: number = taskgroups.findIndex(
        (taskgroup: TaskGroup) => taskgroup.id === id
      );
      taskgroups.splice(idx, 1, data);
      dispatch(updateTaskGroups(taskgroups));
      dispatch(setLoading(false));
    } catch (error) {
      window.alert(error);
      dispatch(setLoading(false));
    }
  };
};

interface TaskGroupQuery {
  search?: string;
}
export const getTaskGroups = (params?: TaskGroupQuery) => {
  return async (dispatch: Dispatch, getState: () => any) => {
    const { token } = getState().auth;
    try {
      const { data } = await TaskGroupApi.list(params, {
        Authorization: `Bearer ${token}`,
      });
      dispatch(updateTaskGroups(data.data.rows));
    } catch (err) {
      window.alert(err);
    }
  };
};

export const createTaskGroups = (taskGroup: TaskGroup) => {
  return async (dispatch: Dispatch, getState: () => any) => {
    const { token } = getState().auth;
    try {
      const { data } = await TaskGroupApi.create(taskGroup, {
        Authorization: `Bearer ${token}`,
      });
      dispatch(addTaskGroup(data.data));
    } catch (err) {
      window.alert(err);
    }
  };
};
