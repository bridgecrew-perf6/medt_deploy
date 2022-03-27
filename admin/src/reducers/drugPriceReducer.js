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
  NEW_DRUG_PRICE_RESET,
  UPDATE_DRUG_PRICE_REQUEST,
  UPDATE_DRUG_PRICE_SUCCESS,
  UPDATE_DRUG_PRICE_FAIL,
  UPDATE_DRUG_PRICE_RESET,
  DELETE_DRUG_PRICE_REQUEST,
  DELETE_DRUG_PRICE_SUCCESS,
  DELETE_DRUG_PRICE_FAIL,
  DELETE_DRUG_PRICE_RESET,
  DRUG_PRICE_DETAILS_REQUEST,
  DRUG_PRICE_DETAILS_FAIL,
  DRUG_PRICE_DETAILS_SUCCESS,
  CLEAR_ERRORS,
  DRUG_PRICE_DETAILS_BY_ZONE_ID_REQUEST,
  DRUG_PRICE_DETAILS_BY_ZONE_ID_SUCCESS,
  DRUG_PRICE_DETAILS_BY_ZONE_ID_FAIL,
  DRUG_PRICE_DETAILS_BY_DRUG_ID_REQUEST,
  DRUG_PRICE_DETAILS_BY_DRUG_ID_SUCCESS,
  DRUG_PRICE_DETAILS_BY_DRUG_ID_FAIL,
} from "../constants/drugPriceConstants";

export const drugPricesReducer = (state = { drugPrices: [] }, action) => {
  switch (action.type) {
    case ALL_DRUG_PRICE_REQUEST:
    case ADMIN_DRUG_PRICE_REQUEST:
      return {
        loading: true,
        drugPrices: [],
      };
    case ALL_DRUG_PRICE_SUCCESS:
      return {
        loading: false,
        drugPrices: action.payload.drugPrices,
        // drugPricesCount: action.payload.drugPricesCount,
        // resultPerPage: action.payload.resultPerPage,
        // filteredDrugPricesCount: action.payload.filteredDrugPricesCount,
      };

    case ADMIN_DRUG_PRICE_SUCCESS:
      return {
        loading: false,
        drugPrices: action.payload,
      };
    case ALL_DRUG_PRICE_FAIL:
    case ADMIN_DRUG_PRICE_FAIL:
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

export const newDrugPriceReducer = (state = { drugPrice: {} }, action) => {
  switch (action.type) {
    case NEW_DRUG_PRICE_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case NEW_DRUG_PRICE_SUCCESS:
      return {
        loading: false,
        success: action.payload.success,
        drugPrice: action.payload.drugPrice,
      };
    case NEW_DRUG_PRICE_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case NEW_DRUG_PRICE_RESET:
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

export const drugPriceReducer = (state = {}, action) => {
  switch (action.type) {
    case DELETE_DRUG_PRICE_REQUEST:
    case UPDATE_DRUG_PRICE_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case DELETE_DRUG_PRICE_SUCCESS:
      return {
        ...state,
        loading: false,
        isDeleted: action.payload,
      };

    case UPDATE_DRUG_PRICE_SUCCESS:
      return {
        ...state,
        loading: false,
        isUpdated: action.payload,
      };
    case DELETE_DRUG_PRICE_FAIL:
    case UPDATE_DRUG_PRICE_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case DELETE_DRUG_PRICE_RESET:
      return {
        ...state,
        isDeleted: false,
      };
    case UPDATE_DRUG_PRICE_RESET:
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

export const drugPriceDetailsReducer = (state = { drugPrice: {} }, action) => {
  switch (action.type) {
    case DRUG_PRICE_DETAILS_REQUEST:
    case DRUG_PRICE_DETAILS_BY_ZONE_ID_REQUEST:
    case DRUG_PRICE_DETAILS_BY_DRUG_ID_REQUEST:
      return {
        loading: true,
        ...state,
      };
    case DRUG_PRICE_DETAILS_SUCCESS:
    case DRUG_PRICE_DETAILS_BY_ZONE_ID_SUCCESS:
    case DRUG_PRICE_DETAILS_BY_DRUG_ID_SUCCESS:
      return {
        loading: false,
        drugPrice: action.payload,
      };
    case DRUG_PRICE_DETAILS_FAIL:
    case DRUG_PRICE_DETAILS_BY_ZONE_ID_FAIL:
    case DRUG_PRICE_DETAILS_BY_DRUG_ID_FAIL:
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
