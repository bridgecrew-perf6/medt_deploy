import { useSelector } from "react-redux";
import {
  BrowserRouter,
  Navigate,
  Route,
  Routes,
  useLocation,
  useNavigate,
} from "react-router-dom";
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
  Zone,
  Chemical,
  ChangePassword,
  ResetPassword,
  Profile,
} from "./pages";
import { useEffect } from "react";
import ProtectedRoute from "./components/Route/ProtectedRoute";
import AddProduct from "./pages/Products/AddProduct";
import Products from "./pages/Products/Products";
import AddDevice from "./pages/Devices/AddDevice";
import Devices from "./pages/Devices/Devices";
import UpdateDrug from "./pages/Drug/UpdateDrug";
import UpdateProduct from "./pages/Products/UpdateProduct";
import UpdateDevice from "./pages/Devices/UpdateDevice";
import { loadEmployee } from "./actions/employeeAction";

function App() {
  // const { isAuthenticated, employee } = useSelector((state) => state.employee);
  useEffect(() => {
    store.dispatch(loadEmployee());
  }, []);

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" exact element={<MainLayout />}>
            <Route index element={<Dashboard />} />
            <Route path="/drugs" element={<Drugs />} />
            <Route path="/drug/:id" element={<UpdateDrug />} />
            <Route path="/add-drug" element={<AddDrug />} />
            <Route path="/products" element={<Products />} />
            <Route path="/add-product" element={<AddProduct />} />
            <Route path="/product/:id" element={<UpdateProduct />} />
            <Route path="/devices" element={<Devices />} />
            <Route path="/add-device" element={<AddDevice />} />
            <Route path="/device/:id" element={<UpdateDevice />} />
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
