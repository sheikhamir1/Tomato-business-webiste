import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import EcommerceNavbar from "./Components/MainNavbar.jsx";
import Login_Comp from "./Components/Login_Comp.jsx";
import Signup_Comp from "./Components/Signup_Comp.jsx";
import HomePage from "./Components/HomePage.jsx";
import Footer from "./Components/Footer.jsx";
import Cart_Comp from "./Components/Cart_Comp.jsx";
import Profile_Comp from "./Components/Profile_Comp.jsx";
import ProductList from "./Components/ProductList_Compt.jsx";
import MyOrders from "./Components/MyOrder_comp.jsx";
import ProductsByCategory from "./Components/ProductsByCategory.jsx";

// _____  _  __
// / ____|| |/ /
// | (___  | ' /
//  \___ \ |  <
//  ____) || . \
// |_____/ |_|\_\

// 👨‍💻 web site Created by Amir Sohail Sheikh
function App() {
  return (
    <>
      <>
        <BrowserRouter>
          <EcommerceNavbar />
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/login_comp" element={<Login_Comp />} />
            <Route path="/profile" element={<Profile_Comp />} />
            <Route path="/signup" element={<Signup_Comp />} />
            <Route path="/cart" element={<Cart_Comp />} />
            <Route path="/ProductList" element={<ProductList />} />
            <Route path="/MyOrder" element={<MyOrders />} />
            <Route path="/products" element={<ProductsByCategory />} />
          </Routes>
          <Footer />
        </BrowserRouter>

        {/* 
        all done
        */}
      </>
    </>
  );
}

export default App;
