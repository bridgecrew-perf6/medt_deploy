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
  NEW_PRODUCT_PRICE_RESET,
  UPDATE_PRODUCT_PRICE_REQUEST,
  UPDATE_PRODUCT_PRICE_SUCCESS,
  UPDATE_PRODUCT_PRICE_FAIL,
  UPDATE_PRODUCT_PRICE_RESET,
  DELETE_PRODUCT_PRICE_REQUEST,
  DELETE_PRODUCT_PRICE_SUCCESS,
  DELETE_PRODUCT_PRICE_FAIL,
  DELETE_PRODUCT_PRICE_RESET,
  PRODUCT_PRICE_DETAILS_REQUEST,
  PRODUCT_PRICE_DETAILS_FAIL,
  PRODUCT_PRICE_DETAILS_SUCCESS,
  CLEAR_ERRORS,
  PRODUCT_PRICE_DETAILS_BY_ZONE_ID_REQUEST,
  PRODUCT_PRICE_DETAILS_BY_ZONE_ID_SUCCESS,
  PRODUCT_PRICE_DETAILS_BY_ZONE_ID_FAIL,
  PRODUCT_PRICE_DETAILS_BY_PRODUCT_ID_REQUEST,
  PRODUCT_PRICE_DETAILS_BY_PRODUCT_ID_FAIL,
  PRODUCT_PRICE_DETAILS_BY_PRODUCT_ID_SUCCESS,
  PRODUCT_PRICE_DETAILS_BY_PRODUCT_ZONE_ID_SUCCESS,
  PRODUCT_PRICE_DETAILS_BY_PRODUCT_ZONE_ID_REQUEST,
  PRODUCT_PRICE_DETAILS_BY_PRODUCT_ZONE_ID_FAIL,
  UPDATE_PRODUCT_PRICE_BY_PRODUCT_ZONE_ID_REQUEST,
  UPDATE_PRODUCT_PRICE_BY_PRODUCT_ZONE_ID_RESET,
  UPDATE_PRODUCT_PRICE_BY_PRODUCT_ZONE_ID_SUCCESS,
  UPDATE_PRODUCT_PRICE_BY_PRODUCT_ZONE_ID_FAIL,
} from "../constants/productPriceConstants";

export const productPricesReducer = (state = { productPrices: [] }, action) => {
  switch (action.type) {
    case ALL_PRODUCT_PRICE_REQUEST:
    case ADMIN_PRODUCT_PRICE_REQUEST:
      return {
        loading: true,
        productPrices: [],
      };
    case ALL_PRODUCT_PRICE_SUCCESS:
      return {
        loading: false,
        productPrices: action.payload.productPrices,
        // productPricesCount: action.payload.productPricesCount,
        // resultPerPage: action.payload.resultPerPage,
        // filteredProductPricesCount: action.payload.filteredProductPricesCount,
      };

    case ADMIN_PRODUCT_PRICE_SUCCESS:
      return {
        loading: false,
        productPrices: action.payload,
      };
    case ALL_PRODUCT_PRICE_FAIL:
    case ADMIN_PRODUCT_PRICE_FAIL:
      return {
        loading: false,
        error: action.payload,
      };

    case CLEAR_ERRORS:
      return {
        ...state,
        error: null,
      };
    default:
      return state;
  }
};

export const newProductPriceReducer = (state = { productPrice: {} }, action) => {
  switch (action.type) {
    case NEW_PRODUCT_PRICE_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case NEW_PRODUCT_PRICE_SUCCESS:
      return {
        loading: false,
        success: action.payload.success,
        productPrice: action.payload.productPrice,
      };
    case NEW_PRODUCT_PRICE_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case NEW_PRODUCT_PRICE_RESET:
      return {
        ...state,
        success: false,
      };
    case CLEAR_ERRORS:
      return {
        ...state,
        error: null,
      };
    default:
      return state;
  }
};

export const productPriceReducer = (state = {}, action) => {
  switch (action.type) {
    case DELETE_PRODUCT_PRICE_REQUEST:
    case UPDATE_PRODUCT_PRICE_REQUEST:
    case UPDATE_PRODUCT_PRICE_BY_PRODUCT_ZONE_ID_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case DELETE_PRODUCT_PRICE_SUCCESS:
      return {
        ...state,
        loading: false,
        isDeleted: action.payload,
      };

    case UPDATE_PRODUCT_PRICE_SUCCESS:
    case UPDATE_PRODUCT_PRICE_BY_PRODUCT_ZONE_ID_SUCCESS:
      return {
        ...state,
        loading: false,
        isUpdated: action.payload,
      };
    case DELETE_PRODUCT_PRICE_FAIL:
    case UPDATE_PRODUCT_PRICE_FAIL:
    case UPDATE_PRODUCT_PRICE_BY_PRODUCT_ZONE_ID_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case DELETE_PRODUCT_PRICE_RESET:
      return {
        ...state,
        isDeleted: false,
      };
    case UPDATE_PRODUCT_PRICE_RESET:
    case UPDATE_PRODUCT_PRICE_BY_PRODUCT_ZONE_ID_RESET:
      return {
        ...state,
        isUpdated: false,
      };
    case CLEAR_ERRORS:
      return {
        ...state,
        error: null,
      };
    default:
      return state;
  }
};

export const productPriceDetailsReducer = (state = { productPrice: {} }, action) => {
  switch (action.type) {
    case PRODUCT_PRICE_DETAILS_REQUEST:
    case PRODUCT_PRICE_DETAILS_BY_ZONE_ID_REQUEST:
    case PRODUCT_PRICE_DETAILS_BY_PRODUCT_ID_REQUEST:
    case PRODUCT_PRICE_DETAILS_BY_PRODUCT_ZONE_ID_REQUEST:
      return {
        loading: true,
        ...state,
      };
    case PRODUCT_PRICE_DETAILS_SUCCESS:
    case PRODUCT_PRICE_DETAILS_BY_ZONE_ID_SUCCESS:
    case PRODUCT_PRICE_DETAILS_BY_PRODUCT_ID_SUCCESS:
    case PRODUCT_PRICE_DETAILS_BY_PRODUCT_ZONE_ID_SUCCESS:
      return {
        loading: false,
        productPrice: action.payload,
      };
    case PRODUCT_PRICE_DETAILS_FAIL:
    case PRODUCT_PRICE_DETAILS_BY_ZONE_ID_FAIL:
    case PRODUCT_PRICE_DETAILS_BY_PRODUCT_ID_FAIL:
    case PRODUCT_PRICE_DETAILS_BY_PRODUCT_ZONE_ID_FAIL:
      return {
        loading: false,
        error: action.payload,
      };

    case CLEAR_ERRORS:
      return {
        ...state,
        error: null,
      };
    default:
      return state;
  }
};
