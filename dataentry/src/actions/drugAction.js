import { axiosInstance } from "../config";

import {
  ALL_DRUG_FAIL,
  ALL_DRUG_REQUEST,
  ALL_DRUG_SUCCESS,
  ADMIN_DRUG_REQUEST,
  ADMIN_DRUG_SUCCESS,
  ADMIN_DRUG_FAIL,
  NEW_DRUG_REQUEST,
  NEW_DRUG_SUCCESS,
  NEW_DRUG_FAIL,
  UPDATE_DRUG_REQUEST,
  UPDATE_DRUG_SUCCESS,
  UPDATE_DRUG_FAIL,
  DELETE_DRUG_REQUEST,
  DELETE_DRUG_SUCCESS,
  DELETE_DRUG_FAIL,
  DRUG_DETAILS_REQUEST,
  DRUG_DETAILS_FAIL,
  DRUG_DETAILS_SUCCESS,
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
  ALL_DRUG_BY_ZONE_ID_REQUEST,
  ALL_DRUG_BY_ZONE_ID_SUCCESS,
  ALL_DRUG_BY_ZONE_ID_FAIL,
} from "../constants/drugConstants";

// Get All Drugs
export const getAllDrugs =
  (keyword = "", currentPage = 1, price = [0, 25000], category, ratings = 0) =>
  async (dispatch) => {
    try {
      dispatch({ type: ALL_DRUG_REQUEST });

      let link = `/api/v1/drugs`;

      // if (category) {
      //   link = `/api/v1/drugs`;
      // }
      const { data } = await axiosInstance.get(link);

      dispatch({
        type: ALL_DRUG_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: ALL_DRUG_FAIL,
        payload: error.response.data.message,
      });
    }
  };

// Get All Drugs For Admin
export const getAdminDrugs = () => async (dispatch) => {
  try {
    dispatch({ type: ADMIN_DRUG_REQUEST });

    const { data } = await axiosInstance.get("/api/v1/admin/drugs");

    dispatch({
      type: ADMIN_DRUG_SUCCESS,
      payload: data.drugs,
    });
  } catch (error) {
    dispatch({
      type: ADMIN_DRUG_FAIL,
      payload: error.response.data.message,
    });
  }
};

// Get All Drugs For Admin
export const getAllDrugsByZone = (id) => async (dispatch) => {
  try {
    dispatch({ type: ALL_DRUG_BY_ZONE_ID_REQUEST });

    const { data } = await axiosInstance.get(`/api/v1/drugsByZone/${id}`);

    dispatch({
      type: ALL_DRUG_BY_ZONE_ID_SUCCESS,
      payload: data.drugs,
    });
  } catch (error) {
    dispatch({
      type: ALL_DRUG_BY_ZONE_ID_FAIL,
      payload: error.response.data.message,
    });
  }
};

// Create Drug
export const createDrug =
  (drugData, drugPricesData, zones) => async (dispatch) => {
    try {
      dispatch({ type: NEW_DRUG_REQUEST });

      const config = {
        headers: { "Content-Type": "application/json" },
      };
      const { data } = await axiosInstance.post(`/api/v1/drug/new`, drugData, config);

      drugPricesData.set("drugId", data.drug._id);
      for (var i = 0; i < zones.length; i++) {
        drugPricesData.set("zoneId", zones[i]._id);
        const { drugPricedata } = await axiosInstance.post(
          `/api/v1/drugPrice/new`,
          drugPricesData,
          config
        );
      }

      dispatch({
        type: NEW_DRUG_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: NEW_DRUG_FAIL,
        payload: error.response.data.message,
      });
    }
  };

// Update Drug
export const updateDrug = (id, drugData) => async (dispatch) => {
  try {
    dispatch({ type: UPDATE_DRUG_REQUEST });

    const config = {
      headers: { "Content-Type": "application/json" },
    };

    const { data } = await axiosInstance.put(
      `/api/v1/admin/drug/${id}`,
      drugData,
      config
    );

    dispatch({
      type: UPDATE_DRUG_SUCCESS,
      payload: data.success,
    });
  } catch (error) {
    dispatch({
      type: UPDATE_DRUG_FAIL,
      payload: error.response.data.message,
    });
  }
};

// Delete Drug
export const deleteDrug = (id) => async (dispatch) => {
  try {
    dispatch({ type: DELETE_DRUG_REQUEST });

    const { data } = await axiosInstance.delete(`/api/v1/admin/drug/${id}`);

    const { drugPriceData } = await axiosInstance.delete(`/api/v1/admin/drugPriceByDrug/${id}`);

    dispatch({
      type: DELETE_DRUG_SUCCESS,
      payload: data.success,
    });

  } catch (error) {
    dispatch({
      type: DELETE_DRUG_FAIL,
      payload: error.response.data.message,
    });
  }
};

// Get Drugs Details
export const getDrugDetails = (id) => async (dispatch) => {
  try {
    dispatch({ type: DRUG_DETAILS_REQUEST });

    const { data } = await axiosInstance.get(`/api/v1/drug/${id}`);

    dispatch({
      type: DRUG_DETAILS_SUCCESS,
      payload: data.drug,
    });
  } catch (error) {
    dispatch({
      type: DRUG_DETAILS_FAIL,
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

    const { data } = await axiosInstance.put(`/api/v1/review`, reviewData, config);

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

// Get All Reviews of a Drug
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

// Delete Review of a Drug
export const deleteReviews = (reviewId, drugId) => async (dispatch) => {
  try {
    dispatch({ type: DELETE_REVIEW_REQUEST });

    const { data } = await axiosInstance.delete(
      `/api/v1/reviews?id=${reviewId}&drugId=${drugId}`
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
