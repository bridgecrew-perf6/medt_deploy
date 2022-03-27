import {
  LOGIN_REQUEST,
  LOGIN_FAIL,
  LOGIN_SUCCESS,
  NEW_EMPLOYEE_REQUEST,
  NEW_EMPLOYEE_SUCCESS,
  NEW_EMPLOYEE_FAIL,
  LOAD_EMPLOYEE_REQUEST,
  LOAD_EMPLOYEE_SUCCESS,
  LOAD_EMPLOYEE_FAIL,
  LOGOUT_SUCCESS,
  LOGOUT_FAIL,
  UPDATE_PROFILE_REQUEST,
  UPDATE_PROFILE_SUCCESS,
  UPDATE_PROFILE_FAIL,
  UPDATE_PASSWORD_REQUEST,
  UPDATE_PASSWORD_SUCCESS,
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
  UPDATE_EMPLOYEE_REQUEST,
  UPDATE_EMPLOYEE_SUCCESS,
  UPDATE_EMPLOYEE_FAIL,
  EMPLOYEE_DETAILS_REQUEST,
  EMPLOYEE_DETAILS_SUCCESS,
  EMPLOYEE_DETAILS_FAIL,
  CLEAR_ERRORS,
} from "../constants/employeeConstants";
import { axiosInstance } from "../config";

// Login
export const login = (email, password) => async (dispatch) => {
  try {
    dispatch({ type: LOGIN_REQUEST });

    const config = { headers: { "Content-Type": "application/json" } };

    const { data } = await axiosInstance.post(
      `/api/v1/login`,
      { email, password },
      config
    );

    dispatch({ type: LOGIN_SUCCESS, payload: data.employee });
  } catch (error) {
    dispatch({ type: LOGIN_FAIL, payload: error.response.data.message });
  }
};

// Register
export const createEmployee = (employeeData) => async (dispatch) => {
  try {
    dispatch({ type: NEW_EMPLOYEE_REQUEST });

    const config = { headers: { "Content-Type": "application/json" } };

    const { data } = await axiosInstance.post(
      `/api/v1/employee/register`,
      employeeData,
      config
    );

    dispatch({ type: NEW_EMPLOYEE_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: NEW_EMPLOYEE_FAIL,
      payload: error.response.data.message,
    });
  }
};

// Load Employee
export const loadEmployee = () => async (dispatch) => {
  try {
    dispatch({ type: LOAD_EMPLOYEE_REQUEST });

    const { data } = await axiosInstance.get(`/api/v1/me`);

    dispatch({ type: LOAD_EMPLOYEE_SUCCESS, payload: data.employee });
  } catch (error) {
    dispatch({
      type: LOAD_EMPLOYEE_FAIL,
      payload: error.response.data.message,
    });
  }
};

// Logout Employee
export const logout = () => async (dispatch) => {
  try {
    await axiosInstance.get(`/api/v1/logout`);

    dispatch({ type: LOGOUT_SUCCESS });
  } catch (error) {
    dispatch({ type: LOGOUT_FAIL, payload: error.response.data.message });
  }
};

// Update Profile
export const updateProfile = (employeeData) => async (dispatch) => {
  try {
    dispatch({ type: UPDATE_PROFILE_REQUEST });

    const config = { headers: { "Content-Type": "multipart/form-data" } };

    const { data } = await axiosInstance.put(`/api/v1/me/update`, employeeData, config);

    dispatch({ type: UPDATE_PROFILE_SUCCESS, payload: data.success });
  } catch (error) {
    dispatch({
      type: UPDATE_PROFILE_FAIL,
      payload: error.response.data.message,
    });
  }
};

// Update Password
export const updatePassword = (passwords) => async (dispatch) => {
  try {
    dispatch({ type: UPDATE_PASSWORD_REQUEST });

    const config = { headers: { "Content-Type": "application/json" } };

    const { data } = await axiosInstance.put(
      `/api/v1/password/update`,
      passwords,
      config
    );

    dispatch({ type: UPDATE_PASSWORD_SUCCESS, payload: data.success });
  } catch (error) {
    dispatch({
      type: UPDATE_PASSWORD_FAIL,
      payload: error.response.data.message,
    });
  }
};

// Forgot Password
export const forgotPassword = (email) => async (dispatch) => {
  try {
    dispatch({ type: FORGOT_PASSWORD_REQUEST });

    const config = { headers: { "Content-Type": "application/json" } };

    const { data } = await axiosInstance.post(`/api/v1/password/forgot`, email, config);

    dispatch({ type: FORGOT_PASSWORD_SUCCESS, payload: data.message });
  } catch (error) {
    dispatch({
      type: FORGOT_PASSWORD_FAIL,
      payload: error.response.data.message,
    });
  }
};

// Reset Password
export const resetPassword = (token, passwords) => async (dispatch) => {
  try {
    dispatch({ type: RESET_PASSWORD_REQUEST });

    const config = { headers: { "Content-Type": "application/json" } };

    const { data } = await axiosInstance.put(
      `/api/v1/password/reset/${token}`,
      passwords,
      config
    );

    dispatch({ type: RESET_PASSWORD_SUCCESS, payload: data.success });
  } catch (error) {
    dispatch({
      type: RESET_PASSWORD_FAIL,
      payload: error.response.data.message,
    });
  }
};

// get All Employees
export const getAllEmployees = () => async (dispatch) => {
  try {
    dispatch({ type: ALL_EMPLOYEES_REQUEST });
    const { data } = await axiosInstance.get(`/api/v1/admin/employees`);

    dispatch({ type: ALL_EMPLOYEES_SUCCESS, payload: data.employees });
  } catch (error) {
    dispatch({
      type: ALL_EMPLOYEES_FAIL,
      payload: error.response.data.message,
    });
  }
};

// get  Employee Details
export const getEmployeeDetails = (id) => async (dispatch) => {
  try {
    dispatch({ type: EMPLOYEE_DETAILS_REQUEST });
    const { data } = await axiosInstance.get(`/api/v1/admin/employee/${id}`);

    dispatch({ type: EMPLOYEE_DETAILS_SUCCESS, payload: data.employee });
  } catch (error) {
    dispatch({
      type: EMPLOYEE_DETAILS_FAIL,
      payload: error.response.data.message,
    });
  }
};

// Update Employee
export const updateEmployee = (id, employeeData) => async (dispatch) => {
  try {
    dispatch({ type: UPDATE_EMPLOYEE_REQUEST });

    const config = { headers: { "Content-Type": "application/json" } };

    const { data } = await axiosInstance.put(
      `/api/v1/admin/employee/${id}`,
      employeeData,
      config
    );

    dispatch({ type: UPDATE_EMPLOYEE_SUCCESS, payload: data.success });
  } catch (error) {
    dispatch({
      type: UPDATE_EMPLOYEE_FAIL,
      payload: error.response.data.message,
    });
  }
};

// Delete Employee
export const deleteEmployee = (id) => async (dispatch) => {
  try {
    dispatch({ type: DELETE_EMPLOYEE_REQUEST });

    const { data } = await axiosInstance.delete(`/api/v1/admin/employee/${id}`);

    dispatch({ type: DELETE_EMPLOYEE_SUCCESS, payload: data.success });
  } catch (error) {
    dispatch({
      type: DELETE_EMPLOYEE_FAIL,
      payload: error.response.data.message,
    });
  }
};

// Clearing Errors
export const clearErrors = () => async (dispatch) => {
  dispatch({ type: CLEAR_ERRORS });
};
