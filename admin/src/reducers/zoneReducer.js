import {
  ALL_ZONE_FAIL,
  ALL_ZONE_REQUEST,
  ALL_ZONE_SUCCESS,
  ADMIN_ZONE_REQUEST,
  ADMIN_ZONE_SUCCESS,
  ADMIN_ZONE_FAIL,
  NEW_ZONE_REQUEST,
  NEW_ZONE_SUCCESS,
  NEW_ZONE_FAIL,
  NEW_ZONE_RESET,
  UPDATE_ZONE_REQUEST,
  UPDATE_ZONE_SUCCESS,
  UPDATE_ZONE_FAIL,
  UPDATE_ZONE_RESET,
  DELETE_ZONE_REQUEST,
  DELETE_ZONE_SUCCESS,
  DELETE_ZONE_FAIL,
  DELETE_ZONE_RESET,
  ZONE_DETAILS_REQUEST,
  ZONE_DETAILS_FAIL,
  ZONE_DETAILS_SUCCESS,
  CLEAR_ERRORS,
} from "../constants/zoneConstants";

export const zonesReducer = (state = { zones: [] }, action) => {
  switch (action.type) {
    case ALL_ZONE_REQUEST:
    case ADMIN_ZONE_REQUEST:
      return {
        loading: true,
        zones: [],
      };
    case ALL_ZONE_SUCCESS:
      return {
        loading: false,
        zones: action.payload.zones,
        zonesCount: action.payload.zonesCount,
        resultPerPage: action.payload.resultPerPage,
        filteredZonesCount: action.payload.filteredZonesCount,
      };

    case ADMIN_ZONE_SUCCESS:
      return {
        loading: false,
        zones: action.payload,
      };
    case ALL_ZONE_FAIL:
    case ADMIN_ZONE_FAIL:
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

export const newZoneReducer = (state = { zone: {} }, action) => {
  switch (action.type) {
    case NEW_ZONE_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case NEW_ZONE_SUCCESS:
      return {
        loading: false,
        success: action.payload.success,
        zone: action.payload.zone,
      };
    case NEW_ZONE_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case NEW_ZONE_RESET:
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

export const zoneReducer = (state = {}, action) => {
  switch (action.type) {
    case DELETE_ZONE_REQUEST:
    case UPDATE_ZONE_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case DELETE_ZONE_SUCCESS:
      return {
        ...state,
        loading: false,
        isDeleted: action.payload,
      };

    case UPDATE_ZONE_SUCCESS:
      return {
        ...state,
        loading: false,
        isUpdated: action.payload,
      };
    case DELETE_ZONE_FAIL:
    case UPDATE_ZONE_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case DELETE_ZONE_RESET:
      return {
        ...state,
        isDeleted: false,
      };
    case UPDATE_ZONE_RESET:
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

export const zoneDetailsReducer = (state = { zone: {} }, action) => {
  switch (action.type) {
    case ZONE_DETAILS_REQUEST:
      return {
        loading: true,
        ...state,
      };
    case ZONE_DETAILS_SUCCESS:
      return {
        loading: false,
        zone: action.payload,
      };
    case ZONE_DETAILS_FAIL:
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
