import axios from "axios";

import {
  ALL_DRUGCATEGORY_FAIL,
  ALL_DRUGCATEGORY_REQUEST,
  ALL_DRUGCATEGORY_SUCCESS,
  ADMIN_DRUGCATEGORY_REQUEST,
  ADMIN_DRUGCATEGORY_SUCCESS,
  ADMIN_DRUGCATEGORY_FAIL,
  NEW_DRUGCATEGORY_REQUEST,
  NEW_DRUGCATEGORY_SUCCESS,
  NEW_DRUGCATEGORY_FAIL,
  UPDATE_DRUGCATEGORY_REQUEST,
  UPDATE_DRUGCATEGORY_SUCCESS,
  UPDATE_DRUGCATEGORY_FAIL,
  DELETE_DRUGCATEGORY_REQUEST,
  DELETE_DRUGCATEGORY_SUCCESS,
  DELETE_DRUGCATEGORY_FAIL,
  DRUGCATEGORY_DETAILS_REQUEST,
  DRUGCATEGORY_DETAILS_FAIL,
  DRUGCATEGORY_DETAILS_SUCCESS,
  CLEAR_ERRORS,
} from "../constants/drugCategoryConstants";

// Get All DrugCategorys
export const getAllDrugCategorys = () => async (dispatch) => {
  try {
    dispatch({ type: ALL_DRUGCATEGORY_REQUEST });

    let link = `/api/v1/drugCategorys`;

    const { data } = await axios.get(link);

    dispatch({
      type: ALL_DRUGCATEGORY_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: ALL_DRUGCATEGORY_FAIL,
      payload: error.response.data.message,
    });
  }
};

// Get All DrugCategorys For Admin
export const getAdminDrugCategorys = () => async (dispatch) => {
  try {
    dispatch({ type: ADMIN_DRUGCATEGORY_REQUEST });

    const { data } = await axios.get("/api/v1/admin/drugCategorys");

    dispatch({
      type: ADMIN_DRUGCATEGORY_SUCCESS,
      payload: data.drugCategorys,
    });
  } catch (error) {
    dispatch({
      type: ADMIN_DRUGCATEGORY_FAIL,
      payload: error.response.data.message,
    });
  }
};

// Create DrugCategory
export const createDrugCategory = (name, description) => async (dispatch) => {
  try {
    dispatch({ type: NEW_DRUGCATEGORY_REQUEST });

    const config = {
      headers: { "Content-Type": "application/json" },
    };

    const { data } = await axios.post(
      `/api/v1/admin/drugCategory/new`,
      { name, description },
      config
    );

    dispatch({
      type: NEW_DRUGCATEGORY_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: NEW_DRUGCATEGORY_FAIL,
      payload: error.response.data.message,
    });
  }
};

// Update DrugCategory
export const updateDrugCategory = (id, drugCategoryData) => async (dispatch) => {
  try {
    dispatch({ type: UPDATE_DRUGCATEGORY_REQUEST });

    const config = {
      headers: { "Content-Type": "application/json" },
    };

    const { data } = await axios.put(`/api/v1/admin/drugCategory/${id}`, drugCategoryData, config);

    dispatch({
      type: UPDATE_DRUGCATEGORY_SUCCESS,
      payload: data.success,
    });
  } catch (error) {
    dispatch({
      type: UPDATE_DRUGCATEGORY_FAIL,
      payload: error.response.data.message,
    });
  }
};

// Delete DrugCategory
export const deleteDrugCategory = (id) => async (dispatch) => {
  try {
    dispatch({ type: DELETE_DRUGCATEGORY_REQUEST });

    const { data } = await axios.delete(`/api/v1/admin/drugCategory/${id}`);

    dispatch({
      type: DELETE_DRUGCATEGORY_SUCCESS,
      payload: data.success,
    });
  } catch (error) {
    dispatch({
      type: DELETE_DRUGCATEGORY_FAIL,
      payload: error.response.data.message,
    });
  }
};

// Get DrugCategorys Details
export const getDrugCategoryDetails = (id) => async (dispatch) => {
  try {
    dispatch({ type: DRUGCATEGORY_DETAILS_REQUEST });

    const { data } = await axios.get(`/api/v1/admin/drugCategory/${id}`);

    dispatch({
      type: DRUGCATEGORY_DETAILS_SUCCESS,
      payload: data.drugCategory,
    });
  } catch (error) {
    dispatch({
      type: DRUGCATEGORY_DETAILS_FAIL,
      payload: error.response.data.message,
    });
  }
};

// Clearing Errors
export const clearErrors = () => async (dispatch) => {
  dispatch({ type: CLEAR_ERRORS });
};
