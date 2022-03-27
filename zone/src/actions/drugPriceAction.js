import { axiosInstance } from "../config";

import {
  ALL_DRUG_PRICE_FAIL,
  ALL_DRUG_PRICE_REQUEST,
  ALL_DRUG_PRICE_SUCCESS,
  ADMIN_DRUG_PRICE_REQUEST,
  ADMIN_DRUG_PRICE_SUCCESS,
  ADMIN_DRUG_PRICE_FAIL,
  NEW_DRUG_PRICE_REQUEST,
  NEW_DRUG_PRICE_SUCCESS,
  NEW_DRUG_PRICE_FAIL,
  UPDATE_DRUG_PRICE_REQUEST,
  UPDATE_DRUG_PRICE_SUCCESS,
  UPDATE_DRUG_PRICE_FAIL,
  DELETE_DRUG_PRICE_REQUEST,
  DELETE_DRUG_PRICE_SUCCESS,
  DELETE_DRUG_PRICE_FAIL,
  DRUG_PRICE_DETAILS_REQUEST,
  DRUG_PRICE_DETAILS_FAIL,
  DRUG_PRICE_DETAILS_SUCCESS,
  CLEAR_ERRORS,
  DRUG_PRICE_DETAILS_BY_ZONE_ID_SUCCESS,
  DRUG_PRICE_DETAILS_BY_ZONE_ID_FAIL,
  DRUG_PRICE_DETAILS_BY_ZONE_ID_REQUEST,
  DRUG_PRICE_DETAILS_BY_DRUG_ID_SUCCESS,
  DRUG_PRICE_DETAILS_BY_DRUG_ID_FAIL,
  DRUG_PRICE_DETAILS_BY_DRUG_ID_REQUEST,
  DRUG_PRICE_DETAILS_BY_DRUG_ZONE_ID_REQUEST,
  DRUG_PRICE_DETAILS_BY_DRUG_ZONE_ID_SUCCESS,
  DRUG_PRICE_DETAILS_BY_DRUG_ZONE_ID_FAIL,
  UPDATE_DRUG_PRICE_BY_DRUG_ZONE_ID_REQUEST,
  UPDATE_DRUG_PRICE_BY_DRUG_ZONE_ID_SUCCESS,
  UPDATE_DRUG_PRICE_BY_DRUG_ZONE_ID_FAIL,
} from "../constants/drugPriceConstants";

// Get All DrugPrices
export const getAllDrugPrices =
  (keyword = "", currentPage = 1, price = [0, 25000], category, ratings = 0) =>
  async (dispatch) => {
    try {
      dispatch({ type: ALL_DRUG_PRICE_REQUEST });

      let link = `/api/v1/drugPrices`;

      // if (category) {
      //   link = `/api/v1/drugPrices`;
      // }
      const { data } = await axiosInstance.get(link);
      dispatch({
        type: ALL_DRUG_PRICE_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: ALL_DRUG_PRICE_FAIL,
        payload: error.response.data.message,
      });
    }
  };

// // Get All DrugPrices For Admin
export const getAdminDrugPrice = () => async (dispatch) => {
  try {
    dispatch({ type: ADMIN_DRUG_PRICE_REQUEST });

    const { data } = await axiosInstance.get("/api/v1/admin/drugPrices");

    dispatch({
      type: ADMIN_DRUG_PRICE_SUCCESS,
      payload: data.drugPrices,
    });
  } catch (error) {
    dispatch({
      type: ADMIN_DRUG_PRICE_FAIL,
      payload: error.response.data.message,
    });
  }
};

// Create DrugPrice
export const createDrugPrice = (drugPriceData) => async (dispatch) => {
  try {
    dispatch({ type: NEW_DRUG_PRICE_REQUEST });

    const config = {
      headers: { "Content-Type": "application/json" },
    };
    const { data } = await axiosInstance.post(
      `/api/v1/drugprice/new`,
      drugPriceData,
      config
    );

    dispatch({
      type: NEW_DRUG_PRICE_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: NEW_DRUG_PRICE_FAIL,
      payload: error.response.data.message,
    });
  }
};

// Update DrugPrice
export const updateDrugPrice = (id, drugPriceData) => async (dispatch) => {
  try {
    dispatch({ type: UPDATE_DRUG_PRICE_REQUEST });

    const config = {
      headers: { "Content-Type": "application/json" },
    };

    const { data } = await axiosInstance.put(
      `/api/v1/admin/drugPrice/${id}`,
      drugPriceData,
      config
    );

    dispatch({
      type: UPDATE_DRUG_PRICE_SUCCESS,
      payload: data.success,
    });
  } catch (error) {
    dispatch({
      type: UPDATE_DRUG_PRICE_FAIL,
      payload: error.response.data.message,
    });
  }
};

// Update DrugPriceByDrugZoneId
export const updateDrugPriceByDrugZoneId =
  (drugId, zoneId, drugPriceData) => async (dispatch) => {
    try {
      dispatch({ type: UPDATE_DRUG_PRICE_BY_DRUG_ZONE_ID_REQUEST });

      const config = {
        headers: { "Content-Type": "application/json" },
      };

      const { data } = await axiosInstance.put(
        `/api/v1/drugPriceByDrugZone/${drugId}/${zoneId}`,
        drugPriceData,
        config
      );

      dispatch({
        type: UPDATE_DRUG_PRICE_BY_DRUG_ZONE_ID_SUCCESS,
        payload: data.success,
      });
    } catch (error) {
      dispatch({
        type: UPDATE_DRUG_PRICE_BY_DRUG_ZONE_ID_FAIL,
        payload: error.response.data.message,
      });
    }
  };

// Delete DrugPrice
export const deleteDrugPrice = (id) => async (dispatch) => {
  try {
    dispatch({ type: DELETE_DRUG_PRICE_REQUEST });

    const { data } = await axiosInstance.delete(
      `/api/v1/admin/drugPrice/${id}`
    );

    dispatch({
      type: DELETE_DRUG_PRICE_SUCCESS,
      payload: data.success,
    });
  } catch (error) {
    dispatch({
      type: DELETE_DRUG_PRICE_FAIL,
      payload: error.response.data.message,
    });
  }
};

// Get DrugPrices Details
export const getDrugPriceDetails = (id) => async (dispatch) => {
  try {
    dispatch({ type: DRUG_PRICE_DETAILS_REQUEST });

    const { data } = await axiosInstance.get(`/api/v1/drugPrice/${id}`);

    dispatch({
      type: DRUG_PRICE_DETAILS_SUCCESS,
      payload: data.drugPrice,
    });
  } catch (error) {
    dispatch({
      type: DRUG_PRICE_DETAILS_FAIL,
      payload: error.response.data.message,
    });
  }
};

// Get DrugPricesByZoneId Details
export const getDrugPriceDetailsByZoneId = (id) => async (dispatch) => {
  try {
    dispatch({ type: DRUG_PRICE_DETAILS_BY_ZONE_ID_REQUEST });

    const { data } = await axiosInstance.get(`/api/v1/drugPriceByZone/${id}`);
    dispatch({
      type: DRUG_PRICE_DETAILS_BY_ZONE_ID_SUCCESS,
      payload: data.drugPrice,
    });
  } catch (error) {
    dispatch({
      type: DRUG_PRICE_DETAILS_BY_ZONE_ID_FAIL,
      payload: error.response.data.message,
    });
  }
};

// Get DrugPricesByDrugId Details
export const getDrugPriceDetailsByDrugId = (id) => async (dispatch) => {
  try {
    dispatch({ type: DRUG_PRICE_DETAILS_BY_DRUG_ID_REQUEST });

    const { data } = await axiosInstance.get(`/api/v1/drugPriceByDrug/${id}`);
    dispatch({
      type: DRUG_PRICE_DETAILS_BY_DRUG_ID_SUCCESS,
      payload: data.drugPrice,
    });
  } catch (error) {
    dispatch({
      type: DRUG_PRICE_DETAILS_BY_DRUG_ID_FAIL,
      payload: error.response.data.message,
    });
  }
};

// Get DrugPricesByDrugZoneId Details
export const getDrugPriceDetailsByDrugZoneId =
  (drugId, zoneId) => async (dispatch) => {
    try {
      dispatch({ type: DRUG_PRICE_DETAILS_BY_DRUG_ZONE_ID_REQUEST });

      const { data } = await axiosInstance.get(
        `/api/v1/drugPriceByDrugZone/${drugId}/${zoneId}`
      );
      dispatch({
        type: DRUG_PRICE_DETAILS_BY_DRUG_ZONE_ID_SUCCESS,
        payload: data.drugPrice,
      });
    } catch (error) {
      dispatch({
        type: DRUG_PRICE_DETAILS_BY_DRUG_ZONE_ID_FAIL,
        payload: error.response.data.message,
      });
    }
  };

// Clearing Errors
export const clearErrors = () => async (dispatch) => {
  dispatch({ type: CLEAR_ERRORS });
};
