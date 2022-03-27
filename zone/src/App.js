import { useSelector } from "react-redux";
import {
  BrowserRouter,
  Navigate,
  Route,
  Routes,
  useLocation,
  useNavigate,
} from "react-router-dom";
import { loadEmployee, loadUser } from "./actions/employeeAction";
import store from "./store";
import MainLayout from "./layout/MainLayout";
import {
  Drugs,
  Error404,
  Login,
  ForgotPassword,
  Dashboard,
  Employee,
  AddEmployee,
  DrugCategory,
  Zone,
  Chemical,
  ChangePassword,
  ResetPassword,
  Profile,
  UpdateEmployee,
} from "./pages";
import { useEffect } from "react";
import ProtectedRoute from "./components/Route/ProtectedRoute";
import UpdateDrug from "./pages/Drug/UpdateDrug";
import Products from "./pages/Products/Products";
import Banner from "./pages/Banners/Banners";
import Slider from "./pages/Sliders/Sliders";
import GeneralCoupon from "./pages/Coupons/GeneralCoupons";
import SingleCoupon from "./pages/Coupons/SingleCoupons";
import DeliveryArea from "./pages/DeliveryArea/DeliveryArea";
import Client from "./pages/Clients/Client";
import UpdatePayment from "./pages/Settings/UpdatePayment";
import NewOrder from "./pages/Settings/NewOrder";
import EditOrder from "./pages/Settings/EditOrder";
import UpdateOrderStatus from "./pages/Settings/UpdateOrderStatus";
import ProductSEO from "./pages/Settings/ProductSEO";
import DeliveredExport from "./pages/Settings/DeliveredExport";
import WebSetting from "./pages/Settings/WebSetting";
import BookedOrders from "./pages/Orders/BookedOrders";
import ProcessingOrders from "./pages/Orders/ProcessingOrders";
import DispatchOrders from "./pages/Orders/DispatchOrders";
import DeliverOrders from "./pages/Orders/DeliverOrders";
import DeliveredOrders from "./pages/Orders/DeliveredOrders";
import CancelledOrders from "./pages/Orders/CancelledOrders";
import Devices from "./pages/Devices/Devices";
import UpdateDevice from "./pages/Devices/UpdateDevice";
import UpdateProduct from "./pages/Products/UpdateProduct";

function App() {
  const { isAuthenticated, employee } = useSelector((state) => state.employee);
  useEffect(() => {
    store.dispatch(loadEmployee());
  }, []);

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" exact element={<MainLayout />}>
            <Route index element={<Dashboard />} />
            <Route path="/employee" element={<Employee />} />
            <Route path="/employee/:id" element={<UpdateEmployee />} />
            <Route path="/add-employee" element={<AddEmployee />} />
            <Route path="/drugs" element={<Drugs />} />
            <Route path="/drug/:id" element={<UpdateDrug />} />
            <Route path="/products" element={<Products />} />
            <Route path="/product/:id" element={<UpdateProduct />} />
            <Route path="/devices" element={<Devices />} />
            <Route path="/device/:id" element={<UpdateDevice />} />
            <Route path="/banners" element={<Banner />} />
            <Route path="/sliders" element={<Slider />} />
            <Route path="/general-coupons" element={<GeneralCoupon />} />
            <Route path="/single-coupons" element={<SingleCoupon />} />
            <Route path="/delivery-area" element={<DeliveryArea />} />
            <Route path="/clients" element={<Client />} />
            <Route path="/update-payment" element={<UpdatePayment />} />
            <Route path="/new-order" element={<NewOrder />} />
            <Route path="/edit-order" element={<EditOrder />} />
            <Route path="/product-seo" element={<ProductSEO />} />
            <Route path="/delivered-export" element={<DeliveredExport />} />
            <Route path="/update-order-status" element={<UpdateOrderStatus />} />
            <Route path="/web-settings" element={<WebSetting />} />
            <Route path="/booked-orders" element={<BookedOrders />} />
            <Route path="/processing-orders" element={<ProcessingOrders />} />
            <Route path="/dispatch-orders" element={<DispatchOrders />} />
            <Route path="/deliver-orders" element={<DeliverOrders />} />
            <Route path="/delivered-orders" element={<DeliveredOrders />} />
            <Route path="/cancelled-orders" element={<CancelledOrders />} />
            <Route path="/zone" exact element={<Zone />} />
            <Route path="/chemical" element={<Chemical />} />
            <Route path="/profile" element={<Profile />} />
          </Route>
          <Route path="/login" element={<Login />} />
          <Route path="/password/forgot" element={<ForgotPassword />} />
          <Route path="/password/reset:token" element={<ResetPassword />} />
          <Route path="/password/update" element={<ChangePassword />} />
          <Route path="*" element={<Error404 />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;

// export function ProtectedRoutes(props) {
//   const navigate = useNavigate();

//   if (localStorage.getItem('employee')) {
//     return <Route {...props}/>
//   }
//   else {
//     return navigate('/login')
//   }
// }

// function RequireAuth() {
//   const { isAuthenticated, employee } = useSelector((state) => state.employee);

//   // let auth = useAuth();
//   let location = useLocation();

//   if (isAuthenticated === false) {
//     return <Navigate to="/login" />;
//   }
// }
