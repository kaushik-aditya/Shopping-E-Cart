import { Outlet } from "react-router-dom";
import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import HomeNavbar from "./appbar";

const Layout = () => {
    return (
        <>
            
            <HomeNavbar />
            <Outlet />
            
        </>
    )
};

export default Layout;