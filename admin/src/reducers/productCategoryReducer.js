import {
  ALL_PRODUCT_CATEGORY_FAIL,
  ALL_PRODUCT_CATEGORY_REQUEST,
  ALL_PRODUCT_CATEGORY_SUCCESS,
  ADMIN_PRODUCT_CATEGORY_REQUEST,
  ADMIN_PRODUCT_CATEGORY_SUCCESS,
  ADMIN_PRODUCT_CATEGORY_FAIL,
  NEW_PRODUCT_CATEGORY_REQUEST,
  NEW_PRODUCT_CATEGORY_SUCCESS,
  NEW_PRODUCT_CATEGORY_FAIL,
  NEW_PRODUCT_CATEGORY_RESET,
  UPDATE_PRODUCT_CATEGORY_REQUEST,
  UPDATE_PRODUCT_CATEGORY_SUCCESS,
  UPDATE_PRODUCT_CATEGORY_FAIL,
  UPDATE_PRODUCT_CATEGORY_RESET,
  DELETE_PRODUCT_CATEGORY_REQUEST,
  DELETE_PRODUCT_CATEGORY_SUCCESS,
  DELETE_PRODUCT_CATEGORY_FAIL,
  DELETE_PRODUCT_CATEGORY_RESET,
  PRODUCT_CATEGORY_DETAILS_REQUEST,
  PRODUCT_CATEGORY_DETAILS_FAIL,
  PRODUCT_CATEGORY_DETAILS_SUCCESS,
  CLEAR_ERRORS,
} from "../constants/productCategoryConstants";

export const productCategorysReducer = (state = { productCategorys: [] }, action) => {
  switch (action.type) {
    case ALL_PRODUCT_CATEGORY_REQUEST:
    case ADMIN_PRODUCT_CATEGORY_REQUEST:
      return {
        loading: true,
        productCategorys: [],
      };
    case ALL_PRODUCT_CATEGORY_SUCCESS:
      return {
        loading: false,
        productCategorys: action.payload.productCategorys,
        productCategorysCount: action.payload.productCategorysCount,
        resultPerPage: action.payload.resultPerPage,
        filteredProductCategorysCount: action.payload.filteredProductCategorysCount,
      };

    case ADMIN_PRODUCT_CATEGORY_SUCCESS:
      return {
        loading: false,
        productCategorys: action.payload,
      };
    case ALL_PRODUCT_CATEGORY_FAIL:
    case ADMIN_PRODUCT_CATEGORY_FAIL:
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

export const newProductCategoryReducer = (
  state = { productCategory: {} },
  action
) => {
  switch (action.type) {
    case NEW_PRODUCT_CATEGORY_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case NEW_PRODUCT_CATEGORY_SUCCESS:
      return {
        loading: false,
        success: action.payload.success,
        productCategory: action.payload.productCategory,
      };
    case NEW_PRODUCT_CATEGORY_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case NEW_PRODUCT_CATEGORY_RESET:
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

export const productCategoryReducer = (state = {}, action) => {
  switch (action.type) {
    case DELETE_PRODUCT_CATEGORY_REQUEST:
    case UPDATE_PRODUCT_CATEGORY_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case DELETE_PRODUCT_CATEGORY_SUCCESS:
      return {
        ...state,
        loading: false,
        isDeleted: action.payload,
      };

    case UPDATE_PRODUCT_CATEGORY_SUCCESS:
      return {
        ...state,
        loading: false,
        isUpdated: action.payload,
      };
    case DELETE_PRODUCT_CATEGORY_FAIL:
    case UPDATE_PRODUCT_CATEGORY_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case DELETE_PRODUCT_CATEGORY_RESET:
      return {
        ...state,
        isDeleted: false,
      };
    case UPDATE_PRODUCT_CATEGORY_RESET:
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

export const productCategoryDetailsReducer = (
  state = { productCategory: {} },
  action
) => {
  switch (action.type) {
    case PRODUCT_CATEGORY_DETAILS_REQUEST:
      return {
        loading: true,
        ...state,
      };
    case PRODUCT_CATEGORY_DETAILS_SUCCESS:
      return {
        loading: false,
        productCategory: action.payload,
      };
    case PRODUCT_CATEGORY_DETAILS_FAIL:
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
