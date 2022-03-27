import { axiosInstance } from "../config";

import {
  ALL_DEVICE_FAIL,
  ALL_DEVICE_REQUEST,
  ALL_DEVICE_SUCCESS,
  ADMIN_DEVICE_REQUEST,
  ADMIN_DEVICE_SUCCESS,
  ADMIN_DEVICE_FAIL,
  NEW_DEVICE_REQUEST,
  NEW_DEVICE_SUCCESS,
  NEW_DEVICE_FAIL,
  UPDATE_DEVICE_REQUEST,
  UPDATE_DEVICE_SUCCESS,
  UPDATE_DEVICE_FAIL,
  DELETE_DEVICE_REQUEST,
  DELETE_DEVICE_SUCCESS,
  DELETE_DEVICE_FAIL,
  DEVICE_DETAILS_REQUEST,
  DEVICE_DETAILS_FAIL,
  DEVICE_DETAILS_SUCCESS,
  NEW_REVIEW_REQUEST,
  NEW_REVIEW_SUCCESS,
  NEW_REVIEW_FAIL,
  ALL_REVIEW_REQUEST,
  ALL_REVIEW_SUCCESS,
  ALL_REVIEW_FAIL,
  DELETE_REVIEW_REQUEST,
  DELETE_REVIEW_SUCCESS,
  DELETE_REVIEW_FAIL,
  CLEAR_ERRORS,
  ALL_DEVICE_BY_ZONE_ID_REQUEST,
  ALL_DEVICE_BY_ZONE_ID_SUCCESS,
  ALL_DEVICE_BY_ZONE_ID_FAIL,
} from "../constants/deviceConstants";

// Get All Devices
export const getAllDevices =
  (keyword = "", currentPage = 1, price = [0, 25000], category, ratings = 0) =>
  async (dispatch) => {
    try {
      dispatch({ type: ALL_DEVICE_REQUEST });

      let link = `/api/v1/devices`;

      // if (category) {
      //   link = `/api/v1/devices`;
      // }
      const { data } = await axiosInstance.get(link);
      dispatch({
        type: ALL_DEVICE_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: ALL_DEVICE_FAIL,
        payload: error.response.data.message,
      });
    }
  };

// Get All Devices For Admin
export const getAdminDevices = () => async (dispatch) => {
  try {
    dispatch({ type: ADMIN_DEVICE_REQUEST });

    const { data } = await axiosInstance.get("/api/v1/admin/devices");

    dispatch({
      type: ADMIN_DEVICE_SUCCESS,
      payload: data.devices,
    });
  } catch (error) {
    dispatch({
      type: ADMIN_DEVICE_FAIL,
      payload: error.response.data.message,
    });
  }
};

// Get All Devices For Admin
export const getAllDevicesByZone = (id) => async (dispatch) => {
  try {
    dispatch({ type: ALL_DEVICE_BY_ZONE_ID_REQUEST });

    const { data } = await axiosInstance.get(`/api/v1/devicesByZone/${id}`);

    dispatch({
      type: ALL_DEVICE_BY_ZONE_ID_SUCCESS,
      payload: data.devices,
    });
  } catch (error) {
    dispatch({
      type: ALL_DEVICE_BY_ZONE_ID_FAIL,
      payload: error.response.data.message,
    });
  }
};

// Create Device
export const createDevice =
  (deviceData, devicePricesData, zones) => async (dispatch) => {
    try {
      dispatch({ type: NEW_DEVICE_REQUEST });

      const config = {
        headers: { "Content-Type": "application/json" },
      };
      const { data } = await axiosInstance.post(
        `/api/v1/device/new`,
        deviceData,
        config
      );

      devicePricesData.set("deviceId", data.device._id);
      for (var i = 0; i < zones.length; i++) {
        devicePricesData.set("zoneId", zones[i]._id);
        const { devicePricedata } = await axiosInstance.post(
          `/api/v1/devicePrice/new`,
          devicePricesData,
          config
        );
      }

      dispatch({
        type: NEW_DEVICE_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: NEW_DEVICE_FAIL,
        payload: error.response.data.message,
      });
    }
  };

// Update Device
export const updateDevice = (id, deviceData) => async (dispatch) => {
  try {
    dispatch({ type: UPDATE_DEVICE_REQUEST });

    const config = {
      headers: { "Content-Type": "application/json" },
    };

    const { data } = await axiosInstance.put(
      `/api/v1/admin/device/${id}`,
      deviceData,
      config
    );

    dispatch({
      type: UPDATE_DEVICE_SUCCESS,
      payload: data.success,
    });
  } catch (error) {
    dispatch({
      type: UPDATE_DEVICE_FAIL,
      payload: error.response.data.message,
    });
  }
};

// Delete Device
export const deleteDevice = (id) => async (dispatch) => {
  try {
    dispatch({ type: DELETE_DEVICE_REQUEST });

    const { data } = await axiosInstance.delete(`/api/v1/admin/device/${id}`);

    const { devicePriceData } = await axiosInstance.delete(
      `/api/v1/admin/devicePriceByDevice/${id}`
    );

    dispatch({
      type: DELETE_DEVICE_SUCCESS,
      payload: data.success,
    });
  } catch (error) {
    dispatch({
      type: DELETE_DEVICE_FAIL,
      payload: error.response.data.message,
    });
  }
};

// Get Devices Details
export const getDeviceDetails = (id) => async (dispatch) => {
  try {
    dispatch({ type: DEVICE_DETAILS_REQUEST });

    const { data } = await axiosInstance.get(`/api/v1/device/${id}`);

    dispatch({
      type: DEVICE_DETAILS_SUCCESS,
      payload: data.device,
    });
  } catch (error) {
    dispatch({
      type: DEVICE_DETAILS_FAIL,
      payload: error.response.data.message,
    });
  }
};

// NEW REVIEW
export const newReview = (reviewData) => async (dispatch) => {
  try {
    dispatch({ type: NEW_REVIEW_REQUEST });

    const config = {
      headers: { "Content-Type": "application/json" },
    };

    const { data } = await axiosInstance.put(
      `/api/v1/review`,
      reviewData,
      config
    );

    dispatch({
      type: NEW_REVIEW_SUCCESS,
      payload: data.success,
    });
  } catch (error) {
    dispatch({
      type: NEW_REVIEW_FAIL,
      payload: error.response.data.message,
    });
  }
};

// Get All Reviews of a Device
export const getAllReviews = (id) => async (dispatch) => {
  try {
    dispatch({ type: ALL_REVIEW_REQUEST });

    const { data } = await axiosInstance.get(`/api/v1/reviews?id=${id}`);

    dispatch({
      type: ALL_REVIEW_SUCCESS,
      payload: data.reviews,
    });
  } catch (error) {
    dispatch({
      type: ALL_REVIEW_FAIL,
      payload: error.response.data.message,
    });
  }
};

// Delete Review of a Device
export const deleteReviews = (reviewId, deviceId) => async (dispatch) => {
  try {
    dispatch({ type: DELETE_REVIEW_REQUEST });

    const { data } = await axiosInstance.delete(
      `/api/v1/reviews?id=${reviewId}&deviceId=${deviceId}`
    );

    dispatch({
      type: DELETE_REVIEW_SUCCESS,
      payload: data.success,
    });
  } catch (error) {
    dispatch({
      type: DELETE_REVIEW_FAIL,
      payload: error.response.data.message,
    });
  }
};

// Clearing Errors
export const clearErrors = () => async (dispatch) => {
  dispatch({ type: CLEAR_ERRORS });
};
