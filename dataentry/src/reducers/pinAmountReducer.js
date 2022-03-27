import {
  ALL_PIN_AMOUNT_FAIL,
  ALL_PIN_AMOUNT_REQUEST,
  ALL_PIN_AMOUNT_SUCCESS,
  ADMIN_PIN_AMOUNT_REQUEST,
  ADMIN_PIN_AMOUNT_SUCCESS,
  ADMIN_PIN_AMOUNT_FAIL,
  NEW_PIN_AMOUNT_REQUEST,
  NEW_PIN_AMOUNT_SUCCESS,
  NEW_PIN_AMOUNT_FAIL,
  NEW_PIN_AMOUNT_RESET,
  UPDATE_PIN_AMOUNT_REQUEST,
  UPDATE_PIN_AMOUNT_SUCCESS,
  UPDATE_PIN_AMOUNT_FAIL,
  UPDATE_PIN_AMOUNT_RESET,
  DELETE_PIN_AMOUNT_REQUEST,
  DELETE_PIN_AMOUNT_SUCCESS,
  DELETE_PIN_AMOUNT_FAIL,
  DELETE_PIN_AMOUNT_RESET,
  PIN_AMOUNT_DETAILS_REQUEST,
  PIN_AMOUNT_DETAILS_FAIL,
  PIN_AMOUNT_DETAILS_SUCCESS,
  CLEAR_ERRORS,
} from "../constants/pinAmountConstants";

export const pinAmountsReducer = (state = { pinAmounts: [] }, action) => {
  switch (action.type) {
    case ALL_PIN_AMOUNT_REQUEST:
    case ADMIN_PIN_AMOUNT_REQUEST:
      return {
        loading: true,
        pinAmounts: [],
      };
    case ALL_PIN_AMOUNT_SUCCESS:
      return {
        loading: false,
        pinAmounts: action.payload.pinAmounts,
        pinAmountsCount: action.payload.pinAmountsCount,
        resultPerPage: action.payload.resultPerPage,
        filteredPinAmountsCount: action.payload.filteredPinAmountsCount,
      };

    case ADMIN_PIN_AMOUNT_SUCCESS:
      return {
        loading: false,
        pinAmounts: action.payload,
      };
    case ALL_PIN_AMOUNT_FAIL:
    case ADMIN_PIN_AMOUNT_FAIL:
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

export const newPinAmountReducer = (state = { pinAmount: {} }, action) => {
  switch (action.type) {
    case NEW_PIN_AMOUNT_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case NEW_PIN_AMOUNT_SUCCESS:
      return {
        loading: false,
        success: action.payload.success,
        pinAmount: action.payload.pinAmount,
      };
    case NEW_PIN_AMOUNT_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case NEW_PIN_AMOUNT_RESET:
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

export const pinAmountReducer = (state = {}, action) => {
  switch (action.type) {
    case DELETE_PIN_AMOUNT_REQUEST:
    case UPDATE_PIN_AMOUNT_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case DELETE_PIN_AMOUNT_SUCCESS:
      return {
        ...state,
        loading: false,
        isDeleted: action.payload,
      };

    case UPDATE_PIN_AMOUNT_SUCCESS:
      return {
        ...state,
        loading: false,
        isUpdated: action.payload,
      };
    case DELETE_PIN_AMOUNT_FAIL:
    case UPDATE_PIN_AMOUNT_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case DELETE_PIN_AMOUNT_RESET:
      return {
        ...state,
        isDeleted: false,
      };
    case UPDATE_PIN_AMOUNT_RESET:
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

export const pinAmountDetailsReducer = (state = { pinAmount: {} }, action) => {
  switch (action.type) {
    case PIN_AMOUNT_DETAILS_REQUEST:
      return {
        loading: true,
        ...state,
      };
    case PIN_AMOUNT_DETAILS_SUCCESS:
      return {
        loading: false,
        pinAmount: action.payload,
      };
    case PIN_AMOUNT_DETAILS_FAIL:
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
