import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./Pages/Home";
import DetailProduct from "./Pages/Detail";
import Login from "./Pages/User/Login";
import PageNotFound from "./Components/PageNotFound";
import DefaultLayout from "./Layout/Default";
import NoNavLayout from "./Layout/NoNav";
import Register from "./Pages/User/Register";

import { Flip, ToastContainer } from 'react-toastify';
import Profile from "./Pages/User/Profile";
import UserLayout from "./Layout/User";
import Password from "./Pages/User/Password";
import Purchase from "./Pages/User/Purchase";
import Cart from "./Pages/Cart";

import 'react-toastify/dist/ReactToastify.css'
import CartLayout from "./Layout/Cart";


function App() {
  return (
    <Router>

      <Routes>

        <Route path="/" element={<DefaultLayout />}>
          <Route index element={<Home />} />
        </Route>

        <Route path="/detail" element={<DefaultLayout />}>
          <Route index element={<PageNotFound />} />
          <Route path=":productName" element={<DetailProduct />} />
        </Route>

        <Route path="/user" element={<NoNavLayout />}>
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
        </Route>

        <Route path="/user" element={<UserLayout />}>
          <Route index element={<></>} />
          <Route path="profile" element={<Profile />} />
          <Route path="password" element={<Password />} />
          <Route path="purchase" element={<Purchase />} />
        </Route>

        <Route path="/cart" element={<CartLayout />}>
          <Route index element={<Cart />} />
        </Route>

      </Routes>

      <ToastContainer
        transition={Flip}
        autoClose={2000}
        pauseOnFocusLoss={false}
      />
    </Router>
  );
}

export default App;