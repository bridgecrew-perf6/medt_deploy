import {
  LOGIN_REQUEST,
  LOGIN_FAIL,
  LOGIN_SUCCESS,
  NEW_EMPLOYEE_REQUEST,
  NEW_EMPLOYEE_SUCCESS,
  NEW_EMPLOYEE_RESET,
  NEW_EMPLOYEE_FAIL,
  LOAD_EMPLOYEE_REQUEST,
  LOAD_EMPLOYEE_SUCCESS,
  LOAD_EMPLOYEE_FAIL,
  LOGOUT_SUCCESS,
  LOGOUT_FAIL,
  UPDATE_PROFILE_REQUEST,
  UPDATE_PROFILE_SUCCESS,
  UPDATE_PROFILE_FAIL,
  UPDATE_PROFILE_RESET,
  UPDATE_PASSWORD_REQUEST,
  UPDATE_PASSWORD_SUCCESS,
  UPDATE_PASSWORD_RESET,
  UPDATE_PASSWORD_FAIL,
  FORGOT_PASSWORD_REQUEST,
  FORGOT_PASSWORD_SUCCESS,
  FORGOT_PASSWORD_FAIL,
  RESET_PASSWORD_REQUEST,
  RESET_PASSWORD_SUCCESS,
  RESET_PASSWORD_FAIL,
  ALL_EMPLOYEES_REQUEST,
  ALL_EMPLOYEES_SUCCESS,
  ALL_EMPLOYEES_FAIL,
  DELETE_EMPLOYEE_REQUEST,
  DELETE_EMPLOYEE_SUCCESS,
  DELETE_EMPLOYEE_FAIL,
  DELETE_EMPLOYEE_RESET,
  UPDATE_EMPLOYEE_REQUEST,
  UPDATE_EMPLOYEE_SUCCESS,
  UPDATE_EMPLOYEE_FAIL,
  UPDATE_EMPLOYEE_RESET,
  EMPLOYEE_DETAILS_REQUEST,
  EMPLOYEE_DETAILS_SUCCESS,
  EMPLOYEE_DETAILS_FAIL,
  CLEAR_ERRORS,
} from "../constants/employeeConstants";

export const employeeReducer = (state = { employee: {} }, action) => {
  switch (action.type) {
    case LOGIN_REQUEST:
    case NEW_EMPLOYEE_REQUEST:
    case LOAD_EMPLOYEE_REQUEST:
      return {
        loading: true,
        isAuthenticated: false,
      };
    case LOGIN_SUCCESS:
    case NEW_EMPLOYEE_SUCCESS:
    case LOAD_EMPLOYEE_SUCCESS:
      return {
        ...state,
        loading: false,
        isAuthenticated: true,
        employee: action.payload,
      };

    case LOGOUT_SUCCESS:
      return {
        loading: false,
        employee: null,
        isAuthenticated: false,
      };
    case LOGIN_FAIL:
    case NEW_EMPLOYEE_FAIL:
      return {
        ...state,
        loading: false,
        isAuthenticated: false,
        employee: null,
        error: action.payload,
      };

    case LOAD_EMPLOYEE_FAIL:
      return {
        loading: false,
        isAuthenticated: false,
        employee: null,
        error: action.payload,
      };

    case LOGOUT_FAIL:
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

export const employeeAdminReducer = (state = {}, action) => {
  switch (action.type) {
    case DELETE_EMPLOYEE_REQUEST:
    case UPDATE_EMPLOYEE_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case DELETE_EMPLOYEE_SUCCESS:
      return {
        ...state,
        loading: false,
        isDeleted: action.payload,
      };

    case UPDATE_EMPLOYEE_SUCCESS:
      return {
        ...state,
        loading: false,
        isUpdated: action.payload,
      };
    case DELETE_EMPLOYEE_FAIL:
    case UPDATE_EMPLOYEE_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case DELETE_EMPLOYEE_RESET:
      return {
        ...state,
        isDeleted: false,
      };
    case UPDATE_EMPLOYEE_RESET:
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

export const profileReducer = (state = {}, action) => {
  switch (action.type) {
    case UPDATE_PROFILE_REQUEST:
    case UPDATE_PASSWORD_REQUEST:
    case DELETE_EMPLOYEE_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case UPDATE_PROFILE_SUCCESS:
    case UPDATE_PASSWORD_SUCCESS:
      return {
        ...state,
        loading: false,
        isUpdated: action.payload,
      };

    case DELETE_EMPLOYEE_SUCCESS:
      return {
        ...state,
        loading: false,
        isDeleted: action.payload.success,
        message: action.payload.message,
      };

    case UPDATE_PROFILE_FAIL:
    case UPDATE_PASSWORD_FAIL:
    case DELETE_EMPLOYEE_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    case UPDATE_PROFILE_RESET:
    case UPDATE_PASSWORD_RESET:
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

export const forgotPasswordReducer = (state = {}, action) => {
  switch (action.type) {
    case FORGOT_PASSWORD_REQUEST:
    case RESET_PASSWORD_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case FORGOT_PASSWORD_SUCCESS:
      return {
        ...state,
        loading: false,
        message: action.payload,
      };

    case RESET_PASSWORD_SUCCESS:
      return {
        ...state,
        loading: false,
        success: action.payload,
      };

    case FORGOT_PASSWORD_FAIL:
    case RESET_PASSWORD_FAIL:
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

export const allEmployeesReducer = (state = { employees: [] }, action) => {
  switch (action.type) {
    case ALL_EMPLOYEES_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case ALL_EMPLOYEES_SUCCESS:
      return {
        ...state,
        loading: false,
        employees: action.payload,
      };

    case ALL_EMPLOYEES_FAIL:
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

export const employeeDetailsReducer = (state = { employee: {} }, action) => {
  switch (action.type) {
    case EMPLOYEE_DETAILS_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case EMPLOYEE_DETAILS_SUCCESS:
      return {
        ...state,
        loading: false,
        employee: action.payload,
      };

    case EMPLOYEE_DETAILS_FAIL:
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

export const newEmployeeReducer = (state = { employee: {} }, action) => {
  switch (action.type) {
    case NEW_EMPLOYEE_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case NEW_EMPLOYEE_SUCCESS:
      return {
        loading: false,
        success: action.payload.success,
        employee: action.payload.employee,
      };
    case NEW_EMPLOYEE_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case NEW_EMPLOYEE_RESET:
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
