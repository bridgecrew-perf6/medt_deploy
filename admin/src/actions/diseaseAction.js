
import { axiosInstance } from "../config";
import {
  ALL_DISEASE_FAIL,
  ALL_DISEASE_REQUEST,
  ALL_DISEASE_SUCCESS,
  ADMIN_DISEASE_REQUEST,
  ADMIN_DISEASE_SUCCESS,
  ADMIN_DISEASE_FAIL,
  NEW_DISEASE_REQUEST,
  NEW_DISEASE_SUCCESS,
  NEW_DISEASE_FAIL,
  UPDATE_DISEASE_REQUEST,
  UPDATE_DISEASE_SUCCESS,
  UPDATE_DISEASE_FAIL,
  DELETE_DISEASE_REQUEST,
  DELETE_DISEASE_SUCCESS,
  DELETE_DISEASE_FAIL,
  DISEASE_DETAILS_REQUEST,
  DISEASE_DETAILS_FAIL,
  DISEASE_DETAILS_SUCCESS,
  CLEAR_ERRORS,
} from "../constants/diseaseConstants";

// Get All Diseases
export const getDiseases = () => async (dispatch) => {
  try {
    dispatch({ type: ALL_DISEASE_REQUEST });

    let link = `/api/v1/diseases`;

    const { data } = await axiosInstance.get(link);

    dispatch({
      type: ALL_DISEASE_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: ALL_DISEASE_FAIL,
      payload: error.response.data.message,
    });
  }
};

// Get All Diseases For Admin
export const getAdminDiseases = () => async (dispatch) => {
  try {
    dispatch({ type: ADMIN_DISEASE_REQUEST });

    const { data } = await axiosInstance.get("/api/v1/diseases");

    dispatch({
      type: ADMIN_DISEASE_SUCCESS,
      payload: data.diseases,
    });
  } catch (error) {
    dispatch({
      type: ADMIN_DISEASE_FAIL,
      payload: error.response.data.message,
    });
  }
};

// Create Disease
export const createDisease = (name, description) => async (dispatch) => {
  try {
    dispatch({ type: NEW_DISEASE_REQUEST });

    const config = {
      headers: { "Content-Type": "application/json" },
    };

    const { data } = await axiosInstance.post(
      `/api/v1/disease/new`,
      { name, description },
      config
    );

    dispatch({
      type: NEW_DISEASE_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: NEW_DISEASE_FAIL,
      payload: error.response.data.message,
    });
  }
};

// Update Disease
export const updateDisease = (id, diseaseData) => async (dispatch) => {
  try {
    dispatch({ type: UPDATE_DISEASE_REQUEST });

    const config = {
      headers: { "Content-Type": "application/json" },
    };

    const { data } = await axiosInstance.put(
      `/api/v1/disease/${id}`,
      diseaseData,
      config
    );

    dispatch({
      type: UPDATE_DISEASE_SUCCESS,
      payload: data.success,
    });
  } catch (error) {
    dispatch({
      type: UPDATE_DISEASE_FAIL,
      payload: error.response.data.message,
    });
  }
};

// Delete Disease
export const deleteDisease = (id) => async (dispatch) => {
  try {
    dispatch({ type: DELETE_DISEASE_REQUEST });

    const { data } = await axiosInstance.delete(`/api/v1/disease/${id}`);

    dispatch({
      type: DELETE_DISEASE_SUCCESS,
      payload: data.success,
    });
  } catch (error) {
    dispatch({
      type: DELETE_DISEASE_FAIL,
      payload: error.response.data.message,
    });
  }
};

// Get Diseases Details
export const getDiseaseDetails = (id) => async (dispatch) => {
  try {
    dispatch({ type: DISEASE_DETAILS_REQUEST });

    const { data } = await axiosInstance.get(`/api/v1/disease/${id}`);

    dispatch({
      type: DISEASE_DETAILS_SUCCESS,
      payload: data.disease,
    });
  } catch (error) {
    dispatch({
      type: DISEASE_DETAILS_FAIL,
      payload: error.response.data.message,
    });
  }
};

// Clearing Errors
export const clearErrors = () => async (dispatch) => {
  dispatch({ type: CLEAR_ERRORS });
};
