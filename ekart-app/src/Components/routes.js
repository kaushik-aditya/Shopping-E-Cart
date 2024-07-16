import React, { useContext } from 'react'
import { Routes, Route, } from 'react-router-dom'
import LoginPage from './login';
import Logout from './logout';
import SignUpPage from './signuppage';
import EditProducts from './editproducts';
import NewProductForm from './newproductform';
import ProductPreview from './productpreview';
import ProductPreOrder from './productpreOrder';
import CheckOut from './checkout';
import CartProducts from './cartproduct';
import OrderDetails from './orderdetails';
import WebPage from './webpage';
import { Navigate } from 'react-router-dom';
export default function PageRoutes({ logOut }) {
    const isUserPresent = localStorage.getItem("user") !== null;
    

    return (
        <>
            <Routes>
                <Route path="/" element={<WebPage />} />
                <Route path="/log_out" element={<Logout logout={logOut} />} />
                <Route path="/log_in" element={<LoginPage />} />
                <Route
                    path="/add_product"
                    element={isUserPresent ? <NewProductForm /> : <Navigate to="/log_in" />}
                />
                <Route path="/all_products" element={<EditProducts />} />
                <Route path="/product_preview" element={<ProductPreview />} />
                <Route
                    path="/product_checkout"
                    element={isUserPresent ? <CheckOut /> : <Navigate to="/log_in" />}
                />
                <Route
                    path="/product_cart"
                    element={ <ProductPreOrder />}
                />
                <Route
                    path="/user_cart"
                    element={isUserPresent ? <CartProducts /> : <Navigate to="/log_in" />}
                />
                <Route
                    path="/order_details"
                    element={isUserPresent ? <OrderDetails /> : <Navigate to="/log_in" />}
                />
                <Route path="/sign_in" element={<SignUpPage />} />
            </Routes>
        </>
    )
}
