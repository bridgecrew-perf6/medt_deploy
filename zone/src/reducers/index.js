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
// Drugs
import {
  drugsReducer,
  drugReducer,
  newDrugReducer,
  drugDetailsReducer,
} from "./drugReducer";
// Drug Prices
import {
  drugPricesReducer,
  drugPriceReducer,
  newDrugPriceReducer,
  drugPriceDetailsReducer,
} from "./drugPriceReducer";
// Employees
import {
  allEmployeesReducer,
  // forgotPasswordReducer,
  // profileReducer,
  employeeDetailsReducer,
  newEmployeeReducer,
  employeeReducer,
  employeeAdminReducer,
} from "./employeeReducer";
// Zones
import {
  newZoneReducer,
  zoneDetailsReducer,
  zoneReducer,
  zonesReducer,
} from "./zoneReducer";
// Drug Category
import {
  newDrugCategoryReducer,
  drugCategoryDetailsReducer,
  drugCategoryReducer,
  drugCategorysReducer,
} from "./drugCategoryReducer";
// Chemicals
import {
  newChemicalReducer,
  chemicalDetailsReducer,
  chemicalReducer,
  chemicalsReducer,
} from "./chemicalReducer";
// Product Category
import {
  newProductCategoryReducer,
  productCategoryDetailsReducer,
  productCategoryReducer,
  productCategorysReducer,
} from "./productCategoryReducer";
// Product Price
import {
  newProductPriceReducer,
  productPriceDetailsReducer,
  productPriceReducer,
  productPricesReducer,
} from "./productPriceReducer";
// Pin Amount
import {
  newPinAmountReducer,
  pinAmountDetailsReducer,
  pinAmountReducer,
  pinAmountsReducer,
} from "./pinAmountReducer";
// devices
import {
  deviceDetailsReducer,
  deviceReducer,
  devicesReducer,
  newDeviceReducer,
} from "./deviceReducer";
// Device Price
import {
  devicePriceDetailsReducer,
  devicePriceReducer,
  devicePricesReducer,
  newDevicePriceReducer,
} from "./devicePriceReducer";
// Diseases
import {
  diseaseDetailsReducer,
  diseaseReducer,
  diseasesReducer,
  newDiseaseReducer,
} from "./diseaseReducer";
// Device Category
import {
  deviceCategoryDetailsReducer,
  deviceCategoryReducer,
  deviceCategorysReducer,
  newDeviceCategoryReducer,
} from "./deviceCategoryReducer";
// Orders
import {
  allOrdersReducer,
  myOrdersReducer,
  newOrderReducer,
  orderDetailsReducer,
  orderReducer,
} from "./orderReducer";

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

  // DevicePrice
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

  // Orders
  newOrder: newOrderReducer,
  myOrders: myOrdersReducer,
  orderDetails: orderDetailsReducer,
  allOrders: allOrdersReducer,
  order: orderReducer,
});

export default rootReducer;
