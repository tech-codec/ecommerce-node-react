import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import Categories from '../../pages/Categories'
import Dashboard from '../../pages/Dashboard'
import Factures from '../../pages/Factures'
import Users from '../../pages/Users'
import Orders from '../../pages/Orders'
import Login from '../../pages/Login'
import Register from '../../pages/Register'
import ForgotPassword from '../../pages/ForgotPassword'
import Products from '../../pages/Products'
import Profile from '../../pages/Profile'
import Sidebar from '../SideBar'
import Header from '../Header'
import { useTheme } from '../../context/ThemeContext'
import UpdateProfil from '../../pages/UpdateProfil'
import UpdatePassword from '../../pages/UpdatePassword'
import Roles from '../../pages/Roles'

function MyRoutes() {
    const connected = true
    const {theme} = useTheme()
    return (
        <Router>
            {connected
                ?
                <div className={`flex justify-between w-full ${theme ==='dark' ? 'bg-gray-900' : 'bg-gray-200' } gap-0 `}>
                    <Sidebar />
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
                                <Route path="*" element={<Navigate to="/dashboard" />} />
                            </Routes>
                        </div>

                    </div>
                </div>
                :
                <Routes>
                    <Route path='/login' element={<Login />} />
                    <Route path='/register' element={<Register />} />
                    <Route path='/forgot-password' element={<ForgotPassword />} />
                    <Route path="*" element={<Navigate to="/login" />} />
                </Routes>
            }


        </Router>
    )
}

export default MyRoutes