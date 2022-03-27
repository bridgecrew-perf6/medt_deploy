import axios from "axios";

import {
  ALL_CHEMICAL_FAIL,
  ALL_CHEMICAL_REQUEST,
  ALL_CHEMICAL_SUCCESS,
  ADMIN_CHEMICAL_REQUEST,
  ADMIN_CHEMICAL_SUCCESS,
  ADMIN_CHEMICAL_FAIL,
  NEW_CHEMICAL_REQUEST,
  NEW_CHEMICAL_SUCCESS,
  NEW_CHEMICAL_FAIL,
  UPDATE_CHEMICAL_REQUEST,
  UPDATE_CHEMICAL_SUCCESS,
  UPDATE_CHEMICAL_FAIL,
  DELETE_CHEMICAL_REQUEST,
  DELETE_CHEMICAL_SUCCESS,
  DELETE_CHEMICAL_FAIL,
  CHEMICAL_DETAILS_REQUEST,
  CHEMICAL_DETAILS_FAIL,
  CHEMICAL_DETAILS_SUCCESS,
  CLEAR_ERRORS,
  CHEMICALS_BY_DRUG_CATEGORY_SUCCESS,
  CHEMICALS_BY_DRUG_CATEGORY_FAIL,
  CHEMICALS_BY_DRUG_CATEGORY_REQUEST,
} from "../constants/chemicalConstants";

// Get All Chemicals
export const getChemicals = () => async (dispatch) => {
  try {
    dispatch({ type: ALL_CHEMICAL_REQUEST });

    let link = `/api/v1/chemicals`;

    const { data } = await axios.get(link);

    dispatch({
      type: ALL_CHEMICAL_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: ALL_CHEMICAL_FAIL,
      payload: error.response.data.message,
    });
  }
};

// Get All Chemicals For Admin
export const getChemicalsByDrugCategory = (drugCategory) => async (dispatch) => {
  try {
    dispatch({ type: CHEMICALS_BY_DRUG_CATEGORY_REQUEST });

    const { data } = await axios.get(`/api/v1/chemicalsByDrugCategory/${drugCategory}`);

    dispatch({
      type: CHEMICALS_BY_DRUG_CATEGORY_SUCCESS,
      payload: data.chemicals,
    });
  } catch (error) {
    dispatch({
      type: CHEMICALS_BY_DRUG_CATEGORY_FAIL,
      payload: error.response.data.message,
    });
  }
};

// Get All Chemicals For Admin
export const getAdminChemicals = () => async (dispatch) => {
  try {
    dispatch({ type: ADMIN_CHEMICAL_REQUEST });

    const { data } = await axios.get("/api/v1/chemicals");

    dispatch({
      type: ADMIN_CHEMICAL_SUCCESS,
      payload: data.chemicals,
    });
  } catch (error) {
    dispatch({
      type: ADMIN_CHEMICAL_FAIL,
      payload: error.response.data.message,
    });
  }
};

// Create Chemical
export const createChemical = (chemicalData) => async (dispatch) => {
  try {
    dispatch({ type: NEW_CHEMICAL_REQUEST });

    const config = {
      headers: { "Content-Type": "application/json" },
    };

    const { data } = await axios.post(
      `/api/v1/chemical/new`,
      chemicalData,
      config
    );

    dispatch({
      type: NEW_CHEMICAL_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: NEW_CHEMICAL_FAIL,
      payload: error.response.data.message,
    });
  }
};

// Update Chemical
export const updateChemical = (id, chemicalData) => async (dispatch) => {
  try {
    dispatch({ type: UPDATE_CHEMICAL_REQUEST });

    const config = {
      headers: { "Content-Type": "application/json" },
    };

    const { data } = await axios.put(`/api/v1/chemical/${id}`, chemicalData, config);

    dispatch({
      type: UPDATE_CHEMICAL_SUCCESS,
      payload: data.success,
    });
  } catch (error) {
    dispatch({
      type: UPDATE_CHEMICAL_FAIL,
      payload: error.response.data.message,
    });
  }
};

// Delete Chemical
export const deleteChemical = (id) => async (dispatch) => {
  try {
    dispatch({ type: DELETE_CHEMICAL_REQUEST });

    const { data } = await axios.delete(`/api/v1/chemical/${id}`);

    dispatch({
      type: DELETE_CHEMICAL_SUCCESS,
      payload: data.success,
    });
  } catch (error) {
    dispatch({
      type: DELETE_CHEMICAL_FAIL,
      payload: error.response.data.message,
    });
  }
};

// Get Chemicals Details
export const getChemicalDetails = (id) => async (dispatch) => {
  try {
    dispatch({ type: CHEMICAL_DETAILS_REQUEST });

    const { data } = await axios.get(`/api/v1/chemical/${id}`);

    dispatch({
      type: CHEMICAL_DETAILS_SUCCESS,
      payload: data.chemical,
    });
  } catch (error) {
    dispatch({
      type: CHEMICAL_DETAILS_FAIL,
      payload: error.response.data.message,
    });
  }
};

// Clearing Errors
export const clearErrors = () => async (dispatch) => {
  dispatch({ type: CLEAR_ERRORS });
};
