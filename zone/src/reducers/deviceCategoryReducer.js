import {
  ALL_DEVICE_CATEGORY_FAIL,
  ALL_DEVICE_CATEGORY_REQUEST,
  ALL_DEVICE_CATEGORY_SUCCESS,
  ADMIN_DEVICE_CATEGORY_REQUEST,
  ADMIN_DEVICE_CATEGORY_SUCCESS,
  ADMIN_DEVICE_CATEGORY_FAIL,
  NEW_DEVICE_CATEGORY_REQUEST,
  NEW_DEVICE_CATEGORY_SUCCESS,
  NEW_DEVICE_CATEGORY_FAIL,
  NEW_DEVICE_CATEGORY_RESET,
  UPDATE_DEVICE_CATEGORY_REQUEST,
  UPDATE_DEVICE_CATEGORY_SUCCESS,
  UPDATE_DEVICE_CATEGORY_FAIL,
  UPDATE_DEVICE_CATEGORY_RESET,
  DELETE_DEVICE_CATEGORY_REQUEST,
  DELETE_DEVICE_CATEGORY_SUCCESS,
  DELETE_DEVICE_CATEGORY_FAIL,
  DELETE_DEVICE_CATEGORY_RESET,
  DEVICE_CATEGORY_DETAILS_REQUEST,
  DEVICE_CATEGORY_DETAILS_FAIL,
  DEVICE_CATEGORY_DETAILS_SUCCESS,
  CLEAR_ERRORS,
} from "../constants/deviceCategoryConstants";

export const deviceCategorysReducer = (
  state = { deviceCategorys: [] },
  action
) => {
  switch (action.type) {
    case ALL_DEVICE_CATEGORY_REQUEST:
    case ADMIN_DEVICE_CATEGORY_REQUEST:
      return {
        loading: true,
        deviceCategorys: [],
      };
    case ALL_DEVICE_CATEGORY_SUCCESS:
      return {
        loading: false,
        deviceCategorys: action.payload.deviceCategorys,
        deviceCategorysCount: action.payload.deviceCategorysCount,
        resultPerPage: action.payload.resultPerPage,
        filteredDeviceCategorysCount:
          action.payload.filteredDeviceCategorysCount,
      };

    case ADMIN_DEVICE_CATEGORY_SUCCESS:
      return {
        loading: false,
        deviceCategorys: action.payload,
      };
    case ALL_DEVICE_CATEGORY_FAIL:
    case ADMIN_DEVICE_CATEGORY_FAIL:
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

export const newDeviceCategoryReducer = (
  state = { deviceCategory: {} },
  action
) => {
  switch (action.type) {
    case NEW_DEVICE_CATEGORY_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case NEW_DEVICE_CATEGORY_SUCCESS:
      return {
        loading: false,
        success: action.payload.success,
        deviceCategory: action.payload.deviceCategory,
      };
    case NEW_DEVICE_CATEGORY_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case NEW_DEVICE_CATEGORY_RESET:
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

export const deviceCategoryReducer = (state = {}, action) => {
  switch (action.type) {
    case DELETE_DEVICE_CATEGORY_REQUEST:
    case UPDATE_DEVICE_CATEGORY_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case DELETE_DEVICE_CATEGORY_SUCCESS:
      return {
        ...state,
        loading: false,
        isDeleted: action.payload,
      };

    case UPDATE_DEVICE_CATEGORY_SUCCESS:
      return {
        ...state,
        loading: false,
        isUpdated: action.payload,
      };
    case DELETE_DEVICE_CATEGORY_FAIL:
    case UPDATE_DEVICE_CATEGORY_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case DELETE_DEVICE_CATEGORY_RESET:
      return {
        ...state,
        isDeleted: false,
      };
    case UPDATE_DEVICE_CATEGORY_RESET:
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

export const deviceCategoryDetailsReducer = (
  state = { deviceCategory: {} },
  action
) => {
  switch (action.type) {
    case DEVICE_CATEGORY_DETAILS_REQUEST:
      return {
        loading: true,
        ...state,
      };
    case DEVICE_CATEGORY_DETAILS_SUCCESS:
      return {
        loading: false,
        deviceCategory: action.payload,
      };
    case DEVICE_CATEGORY_DETAILS_FAIL:
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
