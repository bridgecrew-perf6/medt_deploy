import axios from "axios";

import {
  ALL_PRODUCT_CATEGORY_FAIL,
  ALL_PRODUCT_CATEGORY_REQUEST,
  ALL_PRODUCT_CATEGORY_SUCCESS,
  ADMIN_PRODUCT_CATEGORY_REQUEST,
  ADMIN_PRODUCT_CATEGORY_SUCCESS,
  ADMIN_PRODUCT_CATEGORY_FAIL,
  NEW_PRODUCT_CATEGORY_REQUEST,
  NEW_PRODUCT_CATEGORY_SUCCESS,
  NEW_PRODUCT_CATEGORY_FAIL,
  UPDATE_PRODUCT_CATEGORY_REQUEST,
  UPDATE_PRODUCT_CATEGORY_SUCCESS,
  UPDATE_PRODUCT_CATEGORY_FAIL,
  DELETE_PRODUCT_CATEGORY_REQUEST,
  DELETE_PRODUCT_CATEGORY_SUCCESS,
  DELETE_PRODUCT_CATEGORY_FAIL,
  PRODUCT_CATEGORY_DETAILS_REQUEST,
  PRODUCT_CATEGORY_DETAILS_FAIL,
  PRODUCT_CATEGORY_DETAILS_SUCCESS,
  CLEAR_ERRORS,
} from "../constants/productCategoryConstants";

// Get All ProductCategorys
export const getProductCategorys = () => async (dispatch) => {
  try {
    dispatch({ type: ALL_PRODUCT_CATEGORY_REQUEST });

    let link = `/api/v1/productCategorys`;

    const { data } = await axios.get(link);

    dispatch({
      type: ALL_PRODUCT_CATEGORY_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: ALL_PRODUCT_CATEGORY_FAIL,
      payload: error.response.data.message,
    });
  }
};

// Get All ProductCategorys For Admin
export const getAdminProductCategorys = () => async (dispatch) => {
  try {
    dispatch({ type: ADMIN_PRODUCT_CATEGORY_REQUEST });

    const { data } = await axios.get("/api/v1/admin/productCategorys");

    dispatch({
      type: ADMIN_PRODUCT_CATEGORY_SUCCESS,
      payload: data.productCategorys,
    });
  } catch (error) {
    dispatch({
      type: ADMIN_PRODUCT_CATEGORY_FAIL,
      payload: error.response.data.message,
    });
  }
};

// Create ProductCategory
export const createProductCategory = (name, description) => async (dispatch) => {
  try {
    dispatch({ type: NEW_PRODUCT_CATEGORY_REQUEST });

    const config = {
      headers: { "Content-Type": "application/json" },
    };

    const { data } = await axios.post(
      `/api/v1/productCategory/new`,
      { name, description },
      config
    );

    dispatch({
      type: NEW_PRODUCT_CATEGORY_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: NEW_PRODUCT_CATEGORY_FAIL,
      payload: error.response.data.message,
    });
  }
};

// Update ProductCategory
export const updateProductCategory =
  (id, productCategoryData) => async (dispatch) => {
    try {
      dispatch({ type: UPDATE_PRODUCT_CATEGORY_REQUEST });

      const config = {
        headers: { "Content-Type": "application/json" },
      };

      const { data } = await axios.put(
        `/api/v1/productCategory/${id}`,
        productCategoryData,
        config
      );

      dispatch({
        type: UPDATE_PRODUCT_CATEGORY_SUCCESS,
        payload: data.success,
      });
    } catch (error) {
      dispatch({
        type: UPDATE_PRODUCT_CATEGORY_FAIL,
        payload: error.response.data.message,
      });
    }
  };

// Delete ProductCategory
export const deleteProductCategory = (id) => async (dispatch) => {
  try {
    dispatch({ type: DELETE_PRODUCT_CATEGORY_REQUEST });

    const { data } = await axios.delete(`/api/v1/productCategory/${id}`);

    dispatch({
      type: DELETE_PRODUCT_CATEGORY_SUCCESS,
      payload: data.success,
    });
  } catch (error) {
    dispatch({
      type: DELETE_PRODUCT_CATEGORY_FAIL,
      payload: error.response.data.message,
    });
  }
};

// Get ProductCategorys Details
export const getProductCategoryDetails = (id) => async (dispatch) => {
  try {
    dispatch({ type: PRODUCT_CATEGORY_DETAILS_REQUEST });

    const { data } = await axios.get(`/api/v1/productCategory/${id}`);

    dispatch({
      type: PRODUCT_CATEGORY_DETAILS_SUCCESS,
      payload: data.productCategory,
    });
  } catch (error) {
    dispatch({
      type: PRODUCT_CATEGORY_DETAILS_FAIL,
      payload: error.response.data.message,
    });
  }
};

// Clearing Errors
export const clearErrors = () => async (dispatch) => {
  dispatch({ type: CLEAR_ERRORS });
};
