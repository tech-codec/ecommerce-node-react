import { useEffect } from "react";
import { Navigate, Route, Routes, useLocation } from "react-router-dom";
import { useTheme } from "../context/ThemeContext";
import SideBar from "./SideBar";
import Header from "./Header";
import Categories from "../pages/Categories";
import Dashboard from "../pages/Dashboard";
import Factures from "../pages/Factures";
import Users from "../pages/Users";
import Orders from "../pages/Orders";
import Products from "../pages/Products";
import Profile from "../pages/Profile";
import Roles from "../pages/Roles";
import UpdateProfil from "../pages/UpdateProfil";
import UpdatePassword from "../pages/UpdatePassword";

function usePageTracking() {
  const location = useLocation();

  useEffect(() => {
    localStorage.setItem('currentPage', location.pathname);
  }, [location]);
}

function PrivateRoutes() {
  const { theme } = useTheme();
  usePageTracking(); // Track the current page

  const savedPage = localStorage.getItem('currentPage') || '/dashboard';

  return (
    <div className={`flex justify-between w-full ${theme === 'dark' ? 'bg-gray-900' : 'bg-gray-200'} gap-0 `}>
      <SideBar />
      <div className="w-full lg:w-85p flex flex-col relative overflow-hidden ">
        <Header />
        <div className='py-4 mt-20 px-5 md:px-8 lg:px-11 '>
          <Routes>
            <Route path='/categories' element={<Categories />} />
            <Route path='/dashboard' element={<Dashboard />} />
            <Route path='/factures' element={<Factures />} />
            <Route path='/users' element={<Users />} />
            <Route path='/orders' element={<Orders />} />
            <Route path='/products' element={<Products />} />
            <Route path='/profil' element={<Profile />} />
            <Route path='/roles' element={<Roles />} />
            <Route path='/update-profil' element={<UpdateProfil />} />
            <Route path='/update-password' element={<UpdatePassword />} />
            <Route path="/" element={<Navigate to="/dashboard" />} />
            <Route path="*" element={<Navigate to={savedPage} />} />
          </Routes>
        </div>
      </div>
    </div>
  );
}

export default PrivateRoutes