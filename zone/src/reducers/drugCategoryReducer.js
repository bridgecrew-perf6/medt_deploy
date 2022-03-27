import {
  ALL_DRUGCATEGORY_FAIL,
  ALL_DRUGCATEGORY_REQUEST,
  ALL_DRUGCATEGORY_SUCCESS,
  ADMIN_DRUGCATEGORY_REQUEST,
  ADMIN_DRUGCATEGORY_SUCCESS,
  ADMIN_DRUGCATEGORY_FAIL,
  NEW_DRUGCATEGORY_REQUEST,
  NEW_DRUGCATEGORY_SUCCESS,
  NEW_DRUGCATEGORY_FAIL,
  NEW_DRUGCATEGORY_RESET,
  UPDATE_DRUGCATEGORY_REQUEST,
  UPDATE_DRUGCATEGORY_SUCCESS,
  UPDATE_DRUGCATEGORY_FAIL,
  UPDATE_DRUGCATEGORY_RESET,
  DELETE_DRUGCATEGORY_REQUEST,
  DELETE_DRUGCATEGORY_SUCCESS,
  DELETE_DRUGCATEGORY_FAIL,
  DELETE_DRUGCATEGORY_RESET,
  DRUGCATEGORY_DETAILS_REQUEST,
  DRUGCATEGORY_DETAILS_FAIL,
  DRUGCATEGORY_DETAILS_SUCCESS,
  CLEAR_ERRORS,
} from "../constants/drugCategoryConstants";

export const drugCategorysReducer = (state = { drugCategorys: [] }, action) => {
  switch (action.type) {
    case ALL_DRUGCATEGORY_REQUEST:
    case ADMIN_DRUGCATEGORY_REQUEST:
      return {
        loading: true,
        drugCategorys: [],
      };
    case ALL_DRUGCATEGORY_SUCCESS:
      return {
        loading: false,
        drugCategorys: action.payload.drugCategorys,
        drugCategorysCount: action.payload.drugCategorysCount,
        resultPerPage: action.payload.resultPerPage,
        filteredDrugCategorysCount: action.payload.filteredDrugCategorysCount,
      };

    case ADMIN_DRUGCATEGORY_SUCCESS:
      return {
        loading: false,
        drugCategorys: action.payload,
      };
    case ALL_DRUGCATEGORY_FAIL:
    case ADMIN_DRUGCATEGORY_FAIL:
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

export const newDrugCategoryReducer = (state = { drugCategory: {} }, action) => {
  switch (action.type) {
    case NEW_DRUGCATEGORY_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case NEW_DRUGCATEGORY_SUCCESS:
      return {
        loading: false,
        success: action.payload.success,
        drugCategory: action.payload.drugCategory,
      };
    case NEW_DRUGCATEGORY_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case NEW_DRUGCATEGORY_RESET:
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

export const drugCategoryReducer = (state = {}, action) => {
  switch (action.type) {
    case DELETE_DRUGCATEGORY_REQUEST:
    case UPDATE_DRUGCATEGORY_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case DELETE_DRUGCATEGORY_SUCCESS:
      return {
        ...state,
        loading: false,
        isDeleted: action.payload,
      };

    case UPDATE_DRUGCATEGORY_SUCCESS:
      return {
        ...state,
        loading: false,
        isUpdated: action.payload,
      };
    case DELETE_DRUGCATEGORY_FAIL:
    case UPDATE_DRUGCATEGORY_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case DELETE_DRUGCATEGORY_RESET:
      return {
        ...state,
        isDeleted: false,
      };
    case UPDATE_DRUGCATEGORY_RESET:
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

export const drugCategoryDetailsReducer = (state = { drugCategory: {} }, action) => {
  switch (action.type) {
    case DRUGCATEGORY_DETAILS_REQUEST:
      return {
        loading: true,
        ...state,
      };
    case DRUGCATEGORY_DETAILS_SUCCESS:
      return {
        loading: false,
        drugCategory: action.payload,
      };
    case DRUGCATEGORY_DETAILS_FAIL:
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
