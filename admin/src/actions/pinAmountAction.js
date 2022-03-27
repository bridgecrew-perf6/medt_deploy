import axios from "axios";

import {
  ALL_PIN_AMOUNT_FAIL,
  ALL_PIN_AMOUNT_REQUEST,
  ALL_PIN_AMOUNT_SUCCESS,
  ADMIN_PIN_AMOUNT_REQUEST,
  ADMIN_PIN_AMOUNT_SUCCESS,
  ADMIN_PIN_AMOUNT_FAIL,
  NEW_PIN_AMOUNT_REQUEST,
  NEW_PIN_AMOUNT_SUCCESS,
  NEW_PIN_AMOUNT_FAIL,
  UPDATE_PIN_AMOUNT_REQUEST,
  UPDATE_PIN_AMOUNT_SUCCESS,
  UPDATE_PIN_AMOUNT_FAIL,
  DELETE_PIN_AMOUNT_REQUEST,
  DELETE_PIN_AMOUNT_SUCCESS,
  DELETE_PIN_AMOUNT_FAIL,
  PIN_AMOUNT_DETAILS_REQUEST,
  PIN_AMOUNT_DETAILS_FAIL,
  PIN_AMOUNT_DETAILS_SUCCESS,
  CLEAR_ERRORS,
} from "../constants/pinAmountConstants";

// Get All PinAmounts
export const getPinAmounts = () => async (dispatch) => {
  try {
    dispatch({ type: ALL_PIN_AMOUNT_REQUEST });

    let link = `/api/v1/pinAmounts`;

    const { data } = await axios.get(link);

    dispatch({
      type: ALL_PIN_AMOUNT_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: ALL_PIN_AMOUNT_FAIL,
      payload: error.response.data.message,
    });
  }
};

// Get All PinAmounts For Admin
export const getAdminPinAmount = () => async (dispatch) => {
  try {
    dispatch({ type: ADMIN_PIN_AMOUNT_REQUEST });

    const { data } = await axios.get("/api/v1/pinAmounts");

    dispatch({
      type: ADMIN_PIN_AMOUNT_SUCCESS,
      payload: data.pinAmounts,
    });
  } catch (error) {
    dispatch({
      type: ADMIN_PIN_AMOUNT_FAIL,
      payload: error.response.data.message,
    });
  }
};

// Create PinAmount
export const createPinAmount = (formData) => async (dispatch) => {
  try {
    dispatch({ type: NEW_PIN_AMOUNT_REQUEST });

    const config = {
      headers: { "Content-Type": "application/json" },
    };

    const { data } = await axios.post(
      `/api/v1/pinAmount/new`,
      formData,
      config
    );

    dispatch({
      type: NEW_PIN_AMOUNT_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: NEW_PIN_AMOUNT_FAIL,
      payload: error.response.data.message,
    });
  }
};

// Update PinAmount
export const updatePinAmount = (id, pinAmountData) => async (dispatch) => {
  try {
    dispatch({ type: UPDATE_PIN_AMOUNT_REQUEST });

    const config = {
      headers: { "Content-Type": "application/json" },
    };

    const { data } = await axios.put(
      `/api/v1/pinAmount/${id}`,
      pinAmountData,
      config
    );

    dispatch({
      type: UPDATE_PIN_AMOUNT_SUCCESS,
      payload: data.success,
    });
  } catch (error) {
    dispatch({
      type: UPDATE_PIN_AMOUNT_FAIL,
      payload: error.response.data.message,
    });
  }
};

// Delete PinAmount
export const deletePinAmount = (id) => async (dispatch) => {
  try {
    dispatch({ type: DELETE_PIN_AMOUNT_REQUEST });

    const { data } = await axios.delete(`/api/v1/pinAmount/${id}`);

    dispatch({
      type: DELETE_PIN_AMOUNT_SUCCESS,
      payload: data.success,
    });
  } catch (error) {
    dispatch({
      type: DELETE_PIN_AMOUNT_FAIL,
      payload: error.response.data.message,
    });
  }
};

// Get PinAmounts Details
export const getPinAmountDetails = (id) => async (dispatch) => {
  try {
    dispatch({ type: PIN_AMOUNT_DETAILS_REQUEST });

    const { data } = await axios.get(`/api/v1/pinAmount/${id}`);

    dispatch({
      type: PIN_AMOUNT_DETAILS_SUCCESS,
      payload: data.pinAmount,
    });
  } catch (error) {
    dispatch({
      type: PIN_AMOUNT_DETAILS_FAIL,
      payload: error.response.data.message,
    });
  }
};

// Clearing Errors
export const clearErrors = () => async (dispatch) => {
  dispatch({ type: CLEAR_ERRORS });
};
