import { axiosInstance } from "../config";

import {
  ALL_DEVICE_CATEGORY_FAIL,
  ALL_DEVICE_CATEGORY_REQUEST,
  ALL_DEVICE_CATEGORY_SUCCESS,
  ADMIN_DEVICE_CATEGORY_REQUEST,
  ADMIN_DEVICE_CATEGORY_SUCCESS,
  ADMIN_DEVICE_CATEGORY_FAIL,
  NEW_DEVICE_CATEGORY_REQUEST,
  NEW_DEVICE_CATEGORY_SUCCESS,
  NEW_DEVICE_CATEGORY_FAIL,
  UPDATE_DEVICE_CATEGORY_REQUEST,
  UPDATE_DEVICE_CATEGORY_SUCCESS,
  UPDATE_DEVICE_CATEGORY_FAIL,
  DELETE_DEVICE_CATEGORY_REQUEST,
  DELETE_DEVICE_CATEGORY_SUCCESS,
  DELETE_DEVICE_CATEGORY_FAIL,
  DEVICE_CATEGORY_DETAILS_REQUEST,
  DEVICE_CATEGORY_DETAILS_FAIL,
  DEVICE_CATEGORY_DETAILS_SUCCESS,
  CLEAR_ERRORS,
} from "../constants/deviceCategoryConstants";

// Get All DeviceCategorys
export const getDeviceCategorys = () => async (dispatch) => {
  try {
    dispatch({ type: ALL_DEVICE_CATEGORY_REQUEST });

    let link = `/api/v1/deviceCategorys`;

    const { data } = await axiosInstance.get(link);

    dispatch({
      type: ALL_DEVICE_CATEGORY_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: ALL_DEVICE_CATEGORY_FAIL,
      payload: error.response.data.message,
    });
  }
};

// Get All DeviceCategorys For Admin
export const getAdminDeviceCategorys = () => async (dispatch) => {
  try {
    dispatch({ type: ADMIN_DEVICE_CATEGORY_REQUEST });

    const { data } = await axiosInstance.get("/api/v1/admin/deviceCategorys");

    dispatch({
      type: ADMIN_DEVICE_CATEGORY_SUCCESS,
      payload: data.deviceCategorys,
    });
  } catch (error) {
    dispatch({
      type: ADMIN_DEVICE_CATEGORY_FAIL,
      payload: error.response.data.message,
    });
  }
};

// Create DeviceCategory
export const createDeviceCategory = (name, description) => async (dispatch) => {
  try {
    dispatch({ type: NEW_DEVICE_CATEGORY_REQUEST });

    const config = {
      headers: { "Content-Type": "application/json" },
    };

    const { data } = await axiosInstance.post(
      `/api/v1/deviceCategory/new`,
      { name, description },
      config
    );

    dispatch({
      type: NEW_DEVICE_CATEGORY_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: NEW_DEVICE_CATEGORY_FAIL,
      payload: error.response.data.message,
    });
  }
};

// Update DeviceCategory
export const updateDeviceCategory =
  (id, deviceCategoryData) => async (dispatch) => {
    try {
      dispatch({ type: UPDATE_DEVICE_CATEGORY_REQUEST });

      const config = {
        headers: { "Content-Type": "application/json" },
      };

      const { data } = await axiosInstance.put(
        `/api/v1/deviceCategory/${id}`,
        deviceCategoryData,
        config
      );

      dispatch({
        type: UPDATE_DEVICE_CATEGORY_SUCCESS,
        payload: data.success,
      });
    } catch (error) {
      dispatch({
        type: UPDATE_DEVICE_CATEGORY_FAIL,
        payload: error.response.data.message,
      });
    }
  };

// Delete DeviceCategory
export const deleteDeviceCategory = (id) => async (dispatch) => {
  try {
    dispatch({ type: DELETE_DEVICE_CATEGORY_REQUEST });

    const { data } = await axiosInstance.delete(`/api/v1/deviceCategory/${id}`);

    dispatch({
      type: DELETE_DEVICE_CATEGORY_SUCCESS,
      payload: data.success,
    });
  } catch (error) {
    dispatch({
      type: DELETE_DEVICE_CATEGORY_FAIL,
      payload: error.response.data.message,
    });
  }
};

// Get DeviceCategorys Details
export const getDeviceCategoryDetails = (id) => async (dispatch) => {
  try {
    dispatch({ type: DEVICE_CATEGORY_DETAILS_REQUEST });

    const { data } = await axiosInstance.get(`/api/v1/deviceCategory/${id}`);

    dispatch({
      type: DEVICE_CATEGORY_DETAILS_SUCCESS,
      payload: data.deviceCategory,
    });
  } catch (error) {
    dispatch({
      type: DEVICE_CATEGORY_DETAILS_FAIL,
      payload: error.response.data.message,
    });
  }
};

// Clearing Errors
export const clearErrors = () => async (dispatch) => {
  dispatch({ type: CLEAR_ERRORS });
};
