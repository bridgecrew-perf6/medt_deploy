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
  NEW_DEVICE_PRICE_RESET,
  UPDATE_DEVICE_PRICE_REQUEST,
  UPDATE_DEVICE_PRICE_SUCCESS,
  UPDATE_DEVICE_PRICE_FAIL,
  UPDATE_DEVICE_PRICE_RESET,
  DELETE_DEVICE_PRICE_REQUEST,
  DELETE_DEVICE_PRICE_SUCCESS,
  DELETE_DEVICE_PRICE_FAIL,
  DELETE_DEVICE_PRICE_RESET,
  DEVICE_PRICE_DETAILS_REQUEST,
  DEVICE_PRICE_DETAILS_FAIL,
  DEVICE_PRICE_DETAILS_SUCCESS,
  CLEAR_ERRORS,
  DEVICE_PRICE_DETAILS_BY_ZONE_ID_REQUEST,
  DEVICE_PRICE_DETAILS_BY_ZONE_ID_SUCCESS,
  DEVICE_PRICE_DETAILS_BY_ZONE_ID_FAIL,
  DEVICE_PRICE_DETAILS_BY_DEVICE_ID_FAIL,
  DEVICE_PRICE_DETAILS_BY_DEVICE_ID_REQUEST,
  DEVICE_PRICE_DETAILS_BY_DEVICE_ID_SUCCESS,
  DEVICE_PRICE_DETAILS_BY_DEVICE_ZONE_ID_FAIL,
  DEVICE_PRICE_DETAILS_BY_DEVICE_ZONE_ID_REQUEST,
  DEVICE_PRICE_DETAILS_BY_DEVICE_ZONE_ID_SUCCESS,
  UPDATE_DEVICE_PRICE_BY_DEVICE_ZONE_ID_REQUEST,
  UPDATE_DEVICE_PRICE_BY_DEVICE_ZONE_ID_SUCCESS,
  UPDATE_DEVICE_PRICE_BY_DEVICE_ZONE_ID_FAIL,
  UPDATE_DEVICE_PRICE_BY_DEVICE_ZONE_ID_RESET,
} from "../constants/devicePriceConstants";

export const devicePricesReducer = (state = { devicePrices: [] }, action) => {
  switch (action.type) {
    case ALL_DEVICE_PRICE_REQUEST:
    case ADMIN_DEVICE_PRICE_REQUEST:
      return {
        loading: true,
        devicePrices: [],
      };
    case ALL_DEVICE_PRICE_SUCCESS:
      return {
        loading: false,
        devicePrices: action.payload.devicePrices,
        // devicePricesCount: action.payload.devicePricesCount,
        // resultPerPage: action.payload.resultPerPage,
        // filteredDevicePricesCount: action.payload.filteredDevicePricesCount,
      };

    case ADMIN_DEVICE_PRICE_SUCCESS:
      return {
        loading: false,
        devicePrices: action.payload,
      };
    case ALL_DEVICE_PRICE_FAIL:
    case ADMIN_DEVICE_PRICE_FAIL:
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

export const newDevicePriceReducer = (state = { devicePrice: {} }, action) => {
  switch (action.type) {
    case NEW_DEVICE_PRICE_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case NEW_DEVICE_PRICE_SUCCESS:
      return {
        loading: false,
        success: action.payload.success,
        devicePrice: action.payload.devicePrice,
      };
    case NEW_DEVICE_PRICE_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case NEW_DEVICE_PRICE_RESET:
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

export const devicePriceReducer = (state = {}, action) => {
  switch (action.type) {
    case DELETE_DEVICE_PRICE_REQUEST:
    case UPDATE_DEVICE_PRICE_REQUEST:
    case UPDATE_DEVICE_PRICE_BY_DEVICE_ZONE_ID_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case DELETE_DEVICE_PRICE_SUCCESS:
      return {
        ...state,
        loading: false,
        isDeleted: action.payload,
      };

    case UPDATE_DEVICE_PRICE_SUCCESS:
    case UPDATE_DEVICE_PRICE_BY_DEVICE_ZONE_ID_SUCCESS:
      return {
        ...state,
        loading: false,
        isUpdated: action.payload,
      };
    case DELETE_DEVICE_PRICE_FAIL:
    case UPDATE_DEVICE_PRICE_FAIL:
    case UPDATE_DEVICE_PRICE_BY_DEVICE_ZONE_ID_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case DELETE_DEVICE_PRICE_RESET:
      return {
        ...state,
        isDeleted: false,
      };
    case UPDATE_DEVICE_PRICE_RESET:
    case UPDATE_DEVICE_PRICE_BY_DEVICE_ZONE_ID_RESET:
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

export const devicePriceDetailsReducer = (
  state = { devicePrice: {} },
  action
) => {
  switch (action.type) {
    case DEVICE_PRICE_DETAILS_REQUEST:
    case DEVICE_PRICE_DETAILS_BY_ZONE_ID_REQUEST:
    case DEVICE_PRICE_DETAILS_BY_DEVICE_ID_REQUEST:
    case DEVICE_PRICE_DETAILS_BY_DEVICE_ZONE_ID_REQUEST:
      return {
        loading: true,
        ...state,
      };
    case DEVICE_PRICE_DETAILS_SUCCESS:
    case DEVICE_PRICE_DETAILS_BY_ZONE_ID_SUCCESS:
    case DEVICE_PRICE_DETAILS_BY_DEVICE_ID_SUCCESS:
    case DEVICE_PRICE_DETAILS_BY_DEVICE_ZONE_ID_SUCCESS:
      return {
        loading: false,
        devicePrice: action.payload,
      };
    case DEVICE_PRICE_DETAILS_FAIL:
    case DEVICE_PRICE_DETAILS_BY_ZONE_ID_FAIL:
    case DEVICE_PRICE_DETAILS_BY_DEVICE_ID_FAIL:
    case DEVICE_PRICE_DETAILS_BY_DEVICE_ZONE_ID_FAIL:
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
