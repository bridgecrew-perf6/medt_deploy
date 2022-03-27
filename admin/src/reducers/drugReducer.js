import {
  ALL_DRUG_FAIL,
  ALL_DRUG_REQUEST,
  ALL_DRUG_SUCCESS,
  ADMIN_DRUG_REQUEST,
  ADMIN_DRUG_SUCCESS,
  ADMIN_DRUG_FAIL,
  NEW_DRUG_REQUEST,
  NEW_DRUG_SUCCESS,
  NEW_DRUG_FAIL,
  NEW_DRUG_RESET,
  UPDATE_DRUG_REQUEST,
  UPDATE_DRUG_SUCCESS,
  UPDATE_DRUG_FAIL,
  UPDATE_DRUG_RESET,
  DELETE_DRUG_REQUEST,
  DELETE_DRUG_SUCCESS,
  DELETE_DRUG_FAIL,
  DELETE_DRUG_RESET,
  DRUG_DETAILS_REQUEST,
  DRUG_DETAILS_FAIL,
  DRUG_DETAILS_SUCCESS,
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
} from "../constants/drugConstants";

export const drugsReducer = (state = { drugs: [] }, action) => {
  switch (action.type) {
    case ALL_DRUG_REQUEST:
    case ADMIN_DRUG_REQUEST:
      return {
        loading: true,
        drugs: [],
      };
    case ALL_DRUG_SUCCESS:
      return {
        loading: false,
        drugs: action.payload.drugs,
        // drugsCount: action.payload.drugsCount,
        // resultPerPage: action.payload.resultPerPage,
        // filteredDrugsCount: action.payload.filteredDrugsCount,
      };

    case ADMIN_DRUG_SUCCESS:
      return {
        loading: false,
        drugs: action.payload,
      };
    case ALL_DRUG_FAIL:
    case ADMIN_DRUG_FAIL:
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

export const newDrugReducer = (state = { drug: {} }, action) => {
  switch (action.type) {
    case NEW_DRUG_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case NEW_DRUG_SUCCESS:
      return {
        loading: false,
        success: action.payload.success,
        drug: action.payload.drug,
      };
    case NEW_DRUG_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case NEW_DRUG_RESET:
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

export const drugReducer = (state = {}, action) => {
  switch (action.type) {
    case DELETE_DRUG_REQUEST:
    case UPDATE_DRUG_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case DELETE_DRUG_SUCCESS:
      return {
        ...state,
        loading: false,
        isDeleted: action.payload,
      };

    case UPDATE_DRUG_SUCCESS:
      return {
        ...state,
        loading: false,
        isUpdated: action.payload,
      };
    case DELETE_DRUG_FAIL:
    case UPDATE_DRUG_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case DELETE_DRUG_RESET:
      return {
        ...state,
        isDeleted: false,
      };
    case UPDATE_DRUG_RESET:
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

export const drugDetailsReducer = (state = { drug: {} }, action) => {
  switch (action.type) {
    case DRUG_DETAILS_REQUEST:
      return {
        loading: true,
        ...state,
      };
    case DRUG_DETAILS_SUCCESS:
      return {
        loading: false,
        drug: action.payload,
      };
    case DRUG_DETAILS_FAIL:
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

export const drugReviewsReducer = (state = { reviews: [] }, action) => {
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
