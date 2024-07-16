import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Logout({logout}) {

    const navigate = useNavigate();

    useEffect(() => {
        console.log("User has been logged out successfully.");

        setTimeout(() => {
            logout();
            localStorage.clear("user");
            localStorage.clear("token");

            navigate("/");
        }, 1500); 
    }, [navigate]);

    return (
        <h1>Logging out...</h1>
    );
}
