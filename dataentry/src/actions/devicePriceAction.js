import { axiosInstance } from "../config";

import {
  ALL_DEVICE_PRICE_FAIL,
  ALL_DEVICE_PRICE_REQUEST,
  ALL_DEVICE_PRICE_SUCCESS,
  ADMIN_DEVICE_PRICE_REQUEST,
  ADMIN_DEVICE_PRICE_SUCCESS,
  ADMIN_DEVICE_PRICE_FAIL,
  NEW_DEVICE_PRICE_REQUEST,
  NEW_DEVICE_PRICE_SUCCESS,
  NEW_DEVICE_PRICE_FAIL,
  UPDATE_DEVICE_PRICE_REQUEST,
  UPDATE_DEVICE_PRICE_SUCCESS,
  UPDATE_DEVICE_PRICE_FAIL,
  DELETE_DEVICE_PRICE_REQUEST,
  DELETE_DEVICE_PRICE_SUCCESS,
  DELETE_DEVICE_PRICE_FAIL,
  DEVICE_PRICE_DETAILS_REQUEST,
  DEVICE_PRICE_DETAILS_FAIL,
  DEVICE_PRICE_DETAILS_SUCCESS,
  CLEAR_ERRORS,
  DEVICE_PRICE_DETAILS_BY_ZONE_ID_SUCCESS,
  DEVICE_PRICE_DETAILS_BY_ZONE_ID_FAIL,
  DEVICE_PRICE_DETAILS_BY_ZONE_ID_REQUEST,
  DEVICE_PRICE_DETAILS_BY_DEVICE_ID_FAIL,
  DEVICE_PRICE_DETAILS_BY_DEVICE_ID_SUCCESS,
  DEVICE_PRICE_DETAILS_BY_DEVICE_ID_REQUEST,
} from "../constants/devicePriceConstants";

// Get All DevicePrices
export const getAllDevicePrices =
  (keyword = "", currentPage = 1, price = [0, 25000], category, ratings = 0) =>
  async (dispatch) => {
    try {
      dispatch({ type: ALL_DEVICE_PRICE_REQUEST });

      let link = `/api/v1/devicePrices`;

      // if (category) {
      //   link = `/api/v1/devicePrices`;
      // }
      const { data } = await axiosInstance.get(link);
      dispatch({
        type: ALL_DEVICE_PRICE_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: ALL_DEVICE_PRICE_FAIL,
        payload: error.response.data.message,
      });
    }
  };

// Get All DevicePrices For Admin
export const getAdminDevicePrice = () => async (dispatch) => {
  try {
    dispatch({ type: ADMIN_DEVICE_PRICE_REQUEST });

    const { data } = await axiosInstance.get("/api/v1/admin/devicePrices");

    dispatch({
      type: ADMIN_DEVICE_PRICE_SUCCESS,
      payload: data.devicePrices,
    });
  } catch (error) {
    dispatch({
      type: ADMIN_DEVICE_PRICE_FAIL,
      payload: error.response.data.message,
    });
  }
};

// Create DevicePrice
export const createDevicePrice = (devicePriceData) => async (dispatch) => {
  try {
    dispatch({ type: NEW_DEVICE_PRICE_REQUEST });

    const config = {
      headers: { "Content-Type": "application/json" },
    };
    const { data } = await axiosInstance.post(
      `/api/v1/deviceprice/new`,
      devicePriceData,
      config
    );

    dispatch({
      type: NEW_DEVICE_PRICE_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: NEW_DEVICE_PRICE_FAIL,
      payload: error.response.data.message,
    });
  }
};

// Update DevicePrice
export const updateDevicePrice = (id, devicePriceData) => async (dispatch) => {
  try {
    dispatch({ type: UPDATE_DEVICE_PRICE_REQUEST });

    const config = {
      headers: { "Content-Type": "application/json" },
    };

    const { data } = await axiosInstance.put(
      `/api/v1/admin/devicePrice/${id}`,
      devicePriceData,
      config
    );

    dispatch({
      type: UPDATE_DEVICE_PRICE_SUCCESS,
      payload: data.success,
    });
  } catch (error) {
    dispatch({
      type: UPDATE_DEVICE_PRICE_FAIL,
      payload: error.response.data.message,
    });
  }
};

// Delete DevicePrice
export const deleteDevicePrice = (id) => async (dispatch) => {
  try {
    dispatch({ type: DELETE_DEVICE_PRICE_REQUEST });

    const { data } = await axiosInstance.delete(
      `/api/v1/admin/devicePrice/${id}`
    );

    dispatch({
      type: DELETE_DEVICE_PRICE_SUCCESS,
      payload: data.success,
    });
  } catch (error) {
    dispatch({
      type: DELETE_DEVICE_PRICE_FAIL,
      payload: error.response.data.message,
    });
  }
};

// Get DevicePrices Details
export const getDevicePriceDetails = (id) => async (dispatch) => {
  try {
    dispatch({ type: DEVICE_PRICE_DETAILS_REQUEST });

    const { data } = await axiosInstance.get(`/api/v1/devicePrice/${id}`);

    dispatch({
      type: DEVICE_PRICE_DETAILS_SUCCESS,
      payload: data.devicePrice,
    });
  } catch (error) {
    dispatch({
      type: DEVICE_PRICE_DETAILS_FAIL,
      payload: error.response.data.message,
    });
  }
};

// Get DevicePricesByZoneId Details
export const getDevicePriceDetailsByZoneId = (id) => async (dispatch) => {
  try {
    dispatch({ type: DEVICE_PRICE_DETAILS_BY_ZONE_ID_REQUEST });

    const { data } = await axiosInstance.get(`/api/v1/devicePriceByZone/${id}`);
    dispatch({
      type: DEVICE_PRICE_DETAILS_BY_ZONE_ID_SUCCESS,
      payload: data.devicePrice,
    });
  } catch (error) {
    dispatch({
      type: DEVICE_PRICE_DETAILS_BY_ZONE_ID_FAIL,
      payload: error.response.data.message,
    });
  }
};

// Get DevicePricesByDeviceId Details
export const getDevicePriceDetailsByDeviceId = (id) => async (dispatch) => {
  try {
    dispatch({ type: DEVICE_PRICE_DETAILS_BY_DEVICE_ID_REQUEST });

    const { data } = await axiosInstance.get(
      `/api/v1/devicePriceByDevice/${id}`
    );
    dispatch({
      type: DEVICE_PRICE_DETAILS_BY_DEVICE_ID_SUCCESS,
      payload: data.devicePrice,
    });
  } catch (error) {
    dispatch({
      type: DEVICE_PRICE_DETAILS_BY_DEVICE_ID_FAIL,
      payload: error.response.data.message,
    });
  }
};

export const clearErrors = () => async (dispatch) => {
  dispatch({ type: CLEAR_ERRORS });
};
