import React, { useState } from 'react';
import { Route, Routes, useLocation, Navigate } from "react-router-dom";
import Kabinet from "./components/Kabinet";
import Category from "./components/Pages/category";
import Xodimlar from "./components/Pages/xodimlar";
import Kontaktlar from "./components/Pages/kontaktlar";
import Vebinar from "./components/Pages/vebinar";
import Elonlar from "./components/Pages/elonlar";
import Kurslar from "./components/Pages/kurslar";
import Login from "./components/Pages/login";

function App(props) {
    const location = useLocation();
    const [isLoggedIn, setIsLoggedIn] = useState(false); // Track login state

    // Function to handle logout
    const handleLogout = () => {
        // Perform logout actions (e.g., clear session, tokens, etc.)
        setIsLoggedIn(false); // Update login state to false
    };

    console.log(location);

    return (
        <div className={"container-fluid p-0"}>
            {/* Render Login component on main page if not logged in */}
            {!isLoggedIn && location.pathname === "/" && <Login />}
            
            {/* Routes */}
            <Routes>
                <Route path={"/login"} element={<Login />} />

                {/* Protected routes */}
                <Route path={"/kabinet"} element={<Kabinet />}>
                    <Route path={"/kabinet/kurslar"} element={<Kurslar />} />
                    <Route path={"/kabinet/elonlar"} element={<Elonlar />} />
                    <Route path={"/kabinet/vebinar"} element={<Vebinar />} />
                    <Route path={"/kabinet/xodimlar"} element={<Xodimlar />} />
                    <Route path={"/kabinet/category"} element={<Category />} />
                    <Route path={"/kabinet/kontaktlar"} element={<Kontaktlar />} />
                </Route>

                {/* Redirect to login page if trying to access protected routes */}
                <Route
                    path="/*"
                    element={!isLoggedIn ? <Navigate to="/login" /> : <Navigate to="/kabinet" />}
                />
            </Routes>
        </div>
    );
}

export default App;
