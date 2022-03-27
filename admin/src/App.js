import { useSelector } from "react-redux";
import {
  BrowserRouter,
  Navigate,
  Route,
  Routes,
  useLocation,
  useNavigate,
} from "react-router-dom";
import { loadUser } from "./actions/userAction";
import store from "./store";
import MainLayout from "./layout/MainLayout";
import {
  AddDrug,
  Drugs,
  Error404,
  Register,
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
import AddProduct from "./pages/Products/AddProduct";
import Products from "./pages/Products/Products";
import PinAmount from "./pages/PinAmount/pinAmount";
import AddDevice from "./pages/Devices/AddDevice";
import Devices from "./pages/Devices/Devices";
import Disease from "./pages/Diseases/Disease";
import UpdateDrug from "./pages/Drug/UpdateDrug";
import UpdateProduct from "./pages/Products/UpdateProduct";
import UpdateDevice from "./pages/Devices/UpdateDevice";
import DeviceCategory from "./pages/DeviceCategory/DeviceCategory";
import ProductCategory from "./pages/ProductCategory/ProductCategory";

function App() {
  const { isAuthenticated, user } = useSelector((state) => state.user);
  useEffect(() => {
    store.dispatch(loadUser());
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
            <Route path="/add-drug" element={<AddDrug />} />
            <Route path="/products" element={<Products />} />
            <Route path="/add-product" element={<AddProduct />} />
            <Route path="/product/:id" element={<UpdateProduct />} />
            <Route path="/devices" element={<Devices />} />
            <Route path="/add-device" element={<AddDevice />} />
            <Route path="/device/:id" element={<UpdateDevice />} />
            <Route path="/drug-category" element={<DrugCategory />} />
            <Route path="/device-category" element={<DeviceCategory />} />
            <Route path="/product-category" element={<ProductCategory />} />
            <Route path="/zone" exact element={<Zone />} />
            <Route path="/pin-amount" element={<PinAmount />} />
            <Route path="/chemicals" exact element={<Chemical />} />
            <Route path="/diseases" exact element={<Disease />} />
            <Route path="/profile" element={<Profile />} />
          </Route>
          <Route path="/register" element={<Register />} />
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

//   if (localStorage.getItem('user')) {
//     return <Route {...props}/>
//   }
//   else {
//     return navigate('/login')
//   }
// }

// function RequireAuth() {
//   const { isAuthenticated, user } = useSelector((state) => state.user);

//   // let auth = useAuth();
//   let location = useLocation();

//   if (isAuthenticated === false) {
//     return <Navigate to="/login" />;
//   }
// }
