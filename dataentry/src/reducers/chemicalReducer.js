import {
  ALL_CHEMICAL_FAIL,
  ALL_CHEMICAL_REQUEST,
  ALL_CHEMICAL_SUCCESS,
  ADMIN_CHEMICAL_REQUEST,
  ADMIN_CHEMICAL_SUCCESS,
  ADMIN_CHEMICAL_FAIL,
  NEW_CHEMICAL_REQUEST,
  NEW_CHEMICAL_SUCCESS,
  NEW_CHEMICAL_FAIL,
  NEW_CHEMICAL_RESET,
  UPDATE_CHEMICAL_REQUEST,
  UPDATE_CHEMICAL_SUCCESS,
  UPDATE_CHEMICAL_FAIL,
  UPDATE_CHEMICAL_RESET,
  DELETE_CHEMICAL_REQUEST,
  DELETE_CHEMICAL_SUCCESS,
  DELETE_CHEMICAL_FAIL,
  DELETE_CHEMICAL_RESET,
  CHEMICAL_DETAILS_REQUEST,
  CHEMICAL_DETAILS_FAIL,
  CHEMICAL_DETAILS_SUCCESS,
  CLEAR_ERRORS,
  CHEMICALS_BY_DRUG_CATEGORY_SUCCESS,
  CHEMICALS_BY_DRUG_CATEGORY_REQUEST,
  CHEMICALS_BY_DRUG_CATEGORY_FAIL,
} from "../constants/chemicalConstants";

export const chemicalsReducer = (state = { chemicals: [] }, action) => {
  switch (action.type) {
    case ALL_CHEMICAL_REQUEST:
    case ADMIN_CHEMICAL_REQUEST:
    case CHEMICALS_BY_DRUG_CATEGORY_REQUEST:
      return {
        loading: true,
        chemicals: [],
      };
    case ALL_CHEMICAL_SUCCESS:
      return {
        loading: false,
        chemicals: action.payload.chemicals,
        chemicalsCount: action.payload.chemicalsCount,
        resultPerPage: action.payload.resultPerPage,
        filteredChemicalsCount: action.payload.filteredChemicalsCount,
      };

    case ADMIN_CHEMICAL_SUCCESS:
    case CHEMICALS_BY_DRUG_CATEGORY_SUCCESS:
      return {
        loading: false,
        chemicals: action.payload,
      };
    case ALL_CHEMICAL_FAIL:
    case ADMIN_CHEMICAL_FAIL:
    case CHEMICALS_BY_DRUG_CATEGORY_FAIL:
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

export const newChemicalReducer = (state = { chemical: {} }, action) => {
  switch (action.type) {
    case NEW_CHEMICAL_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case NEW_CHEMICAL_SUCCESS:
      return {
        loading: false,
        success: action.payload.success,
        chemical: action.payload.chemical,
      };
    case NEW_CHEMICAL_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case NEW_CHEMICAL_RESET:
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

export const chemicalReducer = (state = {}, action) => {
  switch (action.type) {
    case DELETE_CHEMICAL_REQUEST:
    case UPDATE_CHEMICAL_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case DELETE_CHEMICAL_SUCCESS:
      return {
        ...state,
        loading: false,
        isDeleted: action.payload,
      };

    case UPDATE_CHEMICAL_SUCCESS:
      return {
        ...state,
        loading: false,
        isUpdated: action.payload,
      };
    case DELETE_CHEMICAL_FAIL:
    case UPDATE_CHEMICAL_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case DELETE_CHEMICAL_RESET:
      return {
        ...state,
        isDeleted: false,
      };
    case UPDATE_CHEMICAL_RESET:
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

export const chemicalDetailsReducer = (state = { chemical: {} }, action) => {
  switch (action.type) {
    case CHEMICAL_DETAILS_REQUEST:
      return {
        loading: true,
        ...state,
      };
    case CHEMICAL_DETAILS_SUCCESS:
      return {
        loading: false,
        chemical: action.payload,
      };
    case CHEMICAL_DETAILS_FAIL:
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
