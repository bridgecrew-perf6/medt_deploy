import { axiosInstance } from "../config";

import {
  ALL_PRODUCT_PRICE_FAIL,
  ALL_PRODUCT_PRICE_REQUEST,
  ALL_PRODUCT_PRICE_SUCCESS,
  ADMIN_PRODUCT_PRICE_REQUEST,
  ADMIN_PRODUCT_PRICE_SUCCESS,
  ADMIN_PRODUCT_PRICE_FAIL,
  NEW_PRODUCT_PRICE_REQUEST,
  NEW_PRODUCT_PRICE_SUCCESS,
  NEW_PRODUCT_PRICE_FAIL,
  UPDATE_PRODUCT_PRICE_REQUEST,
  UPDATE_PRODUCT_PRICE_SUCCESS,
  UPDATE_PRODUCT_PRICE_FAIL,
  DELETE_PRODUCT_PRICE_REQUEST,
  DELETE_PRODUCT_PRICE_SUCCESS,
  DELETE_PRODUCT_PRICE_FAIL,
  PRODUCT_PRICE_DETAILS_REQUEST,
  PRODUCT_PRICE_DETAILS_FAIL,
  PRODUCT_PRICE_DETAILS_SUCCESS,
  CLEAR_ERRORS,
  PRODUCT_PRICE_DETAILS_BY_ZONE_ID_SUCCESS,
  PRODUCT_PRICE_DETAILS_BY_ZONE_ID_FAIL,
  PRODUCT_PRICE_DETAILS_BY_ZONE_ID_REQUEST,
  PRODUCT_PRICE_DETAILS_BY_PRODUCT_ID_REQUEST,
  PRODUCT_PRICE_DETAILS_BY_PRODUCT_ID_SUCCESS,
  PRODUCT_PRICE_DETAILS_BY_PRODUCT_ID_FAIL,
} from "../constants/productPriceConstants";

// Get All ProductPrices
export const getAllProductPrices =
  (keyword = "", currentPage = 1, price = [0, 25000], category, ratings = 0) =>
  async (dispatch) => {
    try {
      dispatch({ type: ALL_PRODUCT_PRICE_REQUEST });

      let link = `/api/v1/productPrices`;

      // if (category) {
      //   link = `/api/v1/productPrices`;
      // }
      const { data } = await axiosInstance.get(link);
      dispatch({
        type: ALL_PRODUCT_PRICE_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: ALL_PRODUCT_PRICE_FAIL,
        payload: error.response.data.message,
      });
    }
  };

// Get All ProductPrices For Admin
export const getAdminProductPrice = () => async (dispatch) => {
  try {
    dispatch({ type: ADMIN_PRODUCT_PRICE_REQUEST });

    const { data } = await axiosInstance.get("/api/v1/admin/productPrices");

    dispatch({
      type: ADMIN_PRODUCT_PRICE_SUCCESS,
      payload: data.productPrices,
    });
  } catch (error) {
    dispatch({
      type: ADMIN_PRODUCT_PRICE_FAIL,
      payload: error.response.data.message,
    });
  }
};

// Create ProductPrice
export const createProductPrice = (productPriceData) => async (dispatch) => {
  try {
    dispatch({ type: NEW_PRODUCT_PRICE_REQUEST });

    const config = {
      headers: { "Content-Type": "application/json" },
    };
    const { data } = await axiosInstance.post(
      `/api/v1/productprice/new`,
      productPriceData,
      config
    );

    dispatch({
      type: NEW_PRODUCT_PRICE_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: NEW_PRODUCT_PRICE_FAIL,
      payload: error.response.data.message,
    });
  }
};

// Update ProductPrice
export const updateProductPrice =
  (id, productPriceData) => async (dispatch) => {
    try {
      dispatch({ type: UPDATE_PRODUCT_PRICE_REQUEST });

      const config = {
        headers: { "Content-Type": "application/json" },
      };

      const { data } = await axiosInstance.put(
        `/api/v1/admin/productPrice/${id}`,
        productPriceData,
        config
      );

      dispatch({
        type: UPDATE_PRODUCT_PRICE_SUCCESS,
        payload: data.success,
      });
    } catch (error) {
      dispatch({
        type: UPDATE_PRODUCT_PRICE_FAIL,
        payload: error.response.data.message,
      });
    }
  };

// Delete ProductPrice
export const deleteProductPrice = (id) => async (dispatch) => {
  try {
    dispatch({ type: DELETE_PRODUCT_PRICE_REQUEST });

    const { data } = await axiosInstance.delete(
      `/api/v1/admin/productPrice/${id}`
    );

    dispatch({
      type: DELETE_PRODUCT_PRICE_SUCCESS,
      payload: data.success,
    });
  } catch (error) {
    dispatch({
      type: DELETE_PRODUCT_PRICE_FAIL,
      payload: error.response.data.message,
    });
  }
};

// Get ProductPrices Details
export const getProductPriceDetails = (id) => async (dispatch) => {
  try {
    dispatch({ type: PRODUCT_PRICE_DETAILS_REQUEST });

    const { data } = await axiosInstance.get(`/api/v1/productPrice/${id}`);

    dispatch({
      type: PRODUCT_PRICE_DETAILS_SUCCESS,
      payload: data.productPrice,
    });
  } catch (error) {
    dispatch({
      type: PRODUCT_PRICE_DETAILS_FAIL,
      payload: error.response.data.message,
    });
  }
};

// Get ProductPricesByZoneId Details
export const getProductPriceDetailsByZoneId = (id) => async (dispatch) => {
  try {
    dispatch({ type: PRODUCT_PRICE_DETAILS_BY_ZONE_ID_REQUEST });

    const { data } = await axiosInstance.get(
      `/api/v1/productPriceByZone/${id}`
    );
    dispatch({
      type: PRODUCT_PRICE_DETAILS_BY_ZONE_ID_SUCCESS,
      payload: data.productPrice,
    });
  } catch (error) {
    dispatch({
      type: PRODUCT_PRICE_DETAILS_BY_ZONE_ID_FAIL,
      payload: error.response.data.message,
    });
  }
};

// Get ProductPricesByProductId Details
export const getProductPriceDetailsByProductId = (id) => async (dispatch) => {
  try {
    dispatch({ type: PRODUCT_PRICE_DETAILS_BY_PRODUCT_ID_REQUEST });

    const { data } = await axiosInstance.get(
      `/api/v1/productPriceByProduct/${id}`
    );
    dispatch({
      type: PRODUCT_PRICE_DETAILS_BY_PRODUCT_ID_SUCCESS,
      payload: data.productPrice,
    });
  } catch (error) {
    dispatch({
      type: PRODUCT_PRICE_DETAILS_BY_PRODUCT_ID_FAIL,
      payload: error.response.data.message,
    });
  }
};

export const clearErrors = () => async (dispatch) => {
  dispatch({ type: CLEAR_ERRORS });
};
