import { combineReducers } from "redux";
import {
  newProductReducer,
  newReviewReducer,
  productDetailsReducer,
  productReducer,
  productReviewsReducer,
  productsReducer,
  reviewReducer,
} from "./productReducer";

import { drugsReducer, drugReducer, newDrugReducer, drugDetailsReducer } from "./drugReducer";
import { drugPricesReducer, drugPriceReducer, newDrugPriceReducer, drugPriceDetailsReducer } from "./drugPriceReducer";

import {
  allUsersReducer,
  forgotPasswordReducer,
  profileReducer,
  userDetailsReducer,
  userReducer,
} from "./userReducer";

import {
  allEmployeesReducer,
  // forgotPasswordReducer,
  // profileReducer,
  employeeDetailsReducer,
  newEmployeeReducer,
  employeeReducer,
  employeeAdminReducer,
} from "./employeeReducer";

import {
  newZoneReducer,
  zoneDetailsReducer,
  zoneReducer,
  zonesReducer,
} from "./zoneReducer";

import {
  newDrugCategoryReducer,
  drugCategoryDetailsReducer,
  drugCategoryReducer,
  drugCategorysReducer,
} from "./drugCategoryReducer";

import {
  newChemicalReducer,
  chemicalDetailsReducer,
  chemicalReducer,
  chemicalsReducer,
} from "./chemicalReducer";
import { newProductCategoryReducer, productCategoryDetailsReducer, productCategoryReducer, productCategorysReducer } from "./productCategoryReducer";
import { newProductPriceReducer, productPriceDetailsReducer, productPriceReducer, productPricesReducer } from "./productPriceReducer";
import { newPinAmountReducer, pinAmountDetailsReducer, pinAmountReducer, pinAmountsReducer } from "./pinAmountReducer";
import { deviceDetailsReducer, deviceReducer, devicesReducer, newDeviceReducer } from "./deviceReducer";
import { devicePriceDetailsReducer, devicePriceReducer, devicePricesReducer, newDevicePriceReducer } from "./devicePriceReducer";
import { diseaseDetailsReducer, diseaseReducer, diseasesReducer, newDiseaseReducer } from "./diseaseReducer";
import { deviceCategoryDetailsReducer, deviceCategoryReducer, deviceCategorysReducer, newDeviceCategoryReducer } from "./deviceCategoryReducer";

const rootReducer = combineReducers({
  // Products
  products: productsReducer,
  productDetails: productDetailsReducer,
  newProduct: newProductReducer,
  product: productReducer,
  productReviews: productReviewsReducer,
  review: reviewReducer,
  newReview: newReviewReducer,

  // ProductPrice
  productPrices: productPricesReducer,
  productPrice: productPriceReducer,
  productPriceDetails: productPriceDetailsReducer,
  newProductPrice: newProductPriceReducer,

  // Drugs
  drugs: drugsReducer,
  drug: drugReducer,
  drugDetails: drugDetailsReducer,
  newDrug: newDrugReducer,

  // DrugsPrice
  drugPrices: drugPricesReducer,
  drugPrice: drugPriceReducer,
  drugPriceDetails: drugPriceDetailsReducer,
  newDrugPrice: newDrugPriceReducer,

  // Devices
  devices: devicesReducer,
  device: deviceReducer,
  deviceDetails: deviceDetailsReducer,
  newDevice: newDeviceReducer,

  // DrugsPrice
  devicePrices: devicePricesReducer,
  devicePrice: devicePriceReducer,
  devicePriceDetails: devicePriceDetailsReducer,
  newDevicePrice: newDevicePriceReducer,

  // DrugCategorys
  drugCategorys: drugCategorysReducer,
  newDrugCategory: newDrugCategoryReducer,
  drugCategoryDetails: drugCategoryDetailsReducer,
  drugCategory: drugCategoryReducer,

  // ProductCategorys
  productCategorys: productCategorysReducer,
  newProductCategory: newProductCategoryReducer,
  productCategoryDetails: productCategoryDetailsReducer,
  productCategory: productCategoryReducer,

  // DeviceCategorys
  deviceCategorys: deviceCategorysReducer,
  newDeviceCategory: newDeviceCategoryReducer,
  deviceCategoryDetails: deviceCategoryDetailsReducer,
  deviceCategory: deviceCategoryReducer,

  // Users
  user: userReducer,
  profile: profileReducer,
  forgotPassword: forgotPasswordReducer,
  allUsers: allUsersReducer,
  userDetails: userDetailsReducer,

  // Employees
  allEmployees: allEmployeesReducer,
  newEmployee: newEmployeeReducer,
  employeeDetails: employeeDetailsReducer,
  employee: employeeReducer,
  employeeAdmin: employeeAdminReducer,

  // Zones
  zones: zonesReducer,
  newZone: newZoneReducer,
  zoneDetails: zoneDetailsReducer,
  zone: zoneReducer,

  // Chemicals
  chemicals: chemicalsReducer,
  newChemical: newChemicalReducer,
  chemicalDetails: chemicalDetailsReducer,
  chemical: chemicalReducer,

  // Diseases
  diseases: diseasesReducer,
  newDisease: newDiseaseReducer,
  diseaseDetails: diseaseDetailsReducer,
  disease: diseaseReducer,

  // PinAmount
  pinAmounts: pinAmountsReducer,
  newPinAmount: newPinAmountReducer,
  pinAmountDetails: pinAmountDetailsReducer,
  pinAmount: pinAmountReducer,
});

export default rootReducer;
