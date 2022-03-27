import {
  ALL_DEVICE_FAIL,
  ALL_DEVICE_REQUEST,
  ALL_DEVICE_SUCCESS,
  ADMIN_DEVICE_REQUEST,
  ADMIN_DEVICE_SUCCESS,
  ADMIN_DEVICE_FAIL,
  NEW_DEVICE_REQUEST,
  NEW_DEVICE_SUCCESS,
  NEW_DEVICE_FAIL,
  NEW_DEVICE_RESET,
  UPDATE_DEVICE_REQUEST,
  UPDATE_DEVICE_SUCCESS,
  UPDATE_DEVICE_FAIL,
  UPDATE_DEVICE_RESET,
  DELETE_DEVICE_REQUEST,
  DELETE_DEVICE_SUCCESS,
  DELETE_DEVICE_FAIL,
  DELETE_DEVICE_RESET,
  DEVICE_DETAILS_REQUEST,
  DEVICE_DETAILS_FAIL,
  DEVICE_DETAILS_SUCCESS,
  NEW_REVIEW_REQUEST,
  NEW_REVIEW_SUCCESS,
  NEW_REVIEW_FAIL,
  NEW_REVIEW_RESET,
  ALL_REVIEW_REQUEST,
  ALL_REVIEW_SUCCESS,
  ALL_REVIEW_FAIL,
  DELETE_REVIEW_REQUEST,
  DELETE_REVIEW_SUCCESS,
  DELETE_REVIEW_FAIL,
  DELETE_REVIEW_RESET,
  CLEAR_ERRORS,
} from "../constants/deviceConstants";

export const devicesReducer = (state = { devices: [] }, action) => {
  switch (action.type) {
    case ALL_DEVICE_REQUEST:
    case ADMIN_DEVICE_REQUEST:
      return {
        loading: true,
        devices: [],
      };
    case ALL_DEVICE_SUCCESS:
      return {
        loading: false,
        devices: action.payload.devices,
        // devicesCount: action.payload.devicesCount,
        // resultPerPage: action.payload.resultPerPage,
        // filteredDevicesCount: action.payload.filteredDevicesCount,
      };

    case ADMIN_DEVICE_SUCCESS:
      return {
        loading: false,
        devices: action.payload,
      };
    case ALL_DEVICE_FAIL:
    case ADMIN_DEVICE_FAIL:
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

export const newDeviceReducer = (state = { device: {} }, action) => {
  switch (action.type) {
    case NEW_DEVICE_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case NEW_DEVICE_SUCCESS:
      return {
        loading: false,
        success: action.payload.success,
        device: action.payload.device,
      };
    case NEW_DEVICE_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case NEW_DEVICE_RESET:
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

export const deviceReducer = (state = {}, action) => {
  switch (action.type) {
    case DELETE_DEVICE_REQUEST:
    case UPDATE_DEVICE_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case DELETE_DEVICE_SUCCESS:
      return {
        ...state,
        loading: false,
        isDeleted: action.payload,
      };

    case UPDATE_DEVICE_SUCCESS:
      return {
        ...state,
        loading: false,
        isUpdated: action.payload,
      };
    case DELETE_DEVICE_FAIL:
    case UPDATE_DEVICE_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case DELETE_DEVICE_RESET:
      return {
        ...state,
        isDeleted: false,
      };
    case UPDATE_DEVICE_RESET:
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

export const deviceDetailsReducer = (state = { device: {} }, action) => {
  switch (action.type) {
    case DEVICE_DETAILS_REQUEST:
      return {
        loading: true,
        ...state,
      };
    case DEVICE_DETAILS_SUCCESS:
      return {
        loading: false,
        device: action.payload,
      };
    case DEVICE_DETAILS_FAIL:
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

export const newReviewReducer = (state = {}, action) => {
  switch (action.type) {
    case NEW_REVIEW_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case NEW_REVIEW_SUCCESS:
      return {
        loading: false,
        success: action.payload,
      };
    case NEW_REVIEW_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case NEW_REVIEW_RESET:
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

export const deviceReviewsReducer = (state = { reviews: [] }, action) => {
  switch (action.type) {
    case ALL_REVIEW_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case ALL_REVIEW_SUCCESS:
      return {
        loading: false,
        reviews: action.payload,
      };
    case ALL_REVIEW_FAIL:
      return {
        ...state,
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

export const reviewReducer = (state = {}, action) => {
  switch (action.type) {
    case DELETE_REVIEW_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case DELETE_REVIEW_SUCCESS:
      return {
        ...state,
        loading: false,
        isDeleted: action.payload,
      };
    case DELETE_REVIEW_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case DELETE_REVIEW_RESET:
      return {
        ...state,
        isDeleted: false,
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
