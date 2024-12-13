
import { RiDashboardHorizontalFill } from "react-icons/ri";
import { SiSimpleanalytics } from "react-icons/si";
import { RiProductHuntLine } from "react-icons/ri";
import { PiUsersFourLight } from "react-icons/pi";
import { TbCategory } from "react-icons/tb";
import { TiShoppingCart } from "react-icons/ti";
import { LuUser2 } from "react-icons/lu";
import { useTheme } from "../../context/ThemeContext";
import { useEffect } from "react";
import { useState } from "react";
import { FaLongArrowAltLeft } from "react-icons/fa";
import { Link } from 'react-router-dom'
import { TfiControlEject } from "react-icons/tfi";
import { useSelector } from "react-redux";

function SideBar() {

    const { theme, toggleOpen, open } = useTheme()
    const [isSmallScreen, setIsSmallScreen] = useState(false);
    const auth = useSelector(state => state.auth)
    const {user} = auth
    const [isActiveDas, setIsActiveDas] = useState(false)
    const [isActiveProf, setIsActiveProf] = useState(false)
    const [isActiveProd, setIsActiveProd] = useState(false)
    const [isActiveCat, setIsActiveCat] = useState(false)
    const [isActiveOrd, setIsActiveOrd] = useState(false)
    const [isActiveUser, setIsActiveUser] = useState(false)
    const [isActiveRole, setIsActiveRole] = useState(false)

    console.log('mon user: '+user)

    const toggleIsactiveDas = () => {
        setIsActiveDas(true)
        setIsActiveCat(false)
        setIsActiveOrd(false)
        setIsActiveProd(false)
        setIsActiveUser(false)
        setIsActiveProf(false)
        setIsActiveRole(false)
    }

    const toggleIsactiveCat = () => {
        setIsActiveDas(false)
        setIsActiveCat(true)
        setIsActiveOrd(false)
        setIsActiveProd(false)
        setIsActiveUser(false)
        setIsActiveProf(false)
        setIsActiveRole(false)
    }

    const toggleIsactiveUser = () => {
        setIsActiveDas(false)
        setIsActiveCat(false)
        setIsActiveOrd(false)
        setIsActiveProd(false)
        setIsActiveUser(true)
        setIsActiveProf(false)
        setIsActiveRole(false)
    }

    const toggleIsactiveProf = () => {
        setIsActiveDas(false)
        setIsActiveCat(false)
        setIsActiveOrd(false)
        setIsActiveProd(false)
        setIsActiveUser(false)
        setIsActiveProf(true)
        setIsActiveRole(false)
    }

    const toggleIsactiveOrd = () => {
        setIsActiveDas(false)
        setIsActiveCat(false)
        setIsActiveOrd(true)
        setIsActiveProd(false)
        setIsActiveUser(false)
        setIsActiveProf(false)
        setIsActiveRole(false)
    }


    const toggleIsactiveProd = () => {
        setIsActiveDas(false)
        setIsActiveCat(false)
        setIsActiveOrd(false)
        setIsActiveProd(true)
        setIsActiveUser(false)
        setIsActiveProf(false)
        setIsActiveRole(false)
    }

    const toggleIsactiveRole = () => {
        setIsActiveDas(false)
        setIsActiveCat(false)
        setIsActiveOrd(false)
        setIsActiveProd(false)
        setIsActiveUser(false)
        setIsActiveProf(false)
        setIsActiveRole(true)
    }


    useEffect(() => {

        const checkScreenSize = () => {
            setIsSmallScreen(window.innerWidth < 1024)
        }

        checkScreenSize();

        window.addEventListener('resize', checkScreenSize)

        return () => {
            window.removeEventListener('resize', checkScreenSize);
        };

    }, [])

    return (
        <>
            <div className={`transform z-50 sticky top-0 h-screen left-0 transition-all duration-500 hidden lg:block ease-in-out grow ${!isSmallScreen ? 'translate-x-0 opacity-100' : 'translate-x-[-100%] opacity-0'} py-5 pl-5 pr-12 ${theme === 'dark' ? "bg-gray-700" : "bg-slate-900"} text-white `}>
                <Link to={'/dashboard'}>
                    <div onClick={toggleIsactiveDas} className="flex items-center justify-start font-semibold text-2xl mb-20">
                        <div className="flex items-center justify-center text-3xl w-10 h-10 rounded-xl bg-orange-700"><RiDashboardHorizontalFill /> </div>
                        <span className="ml-2">Administration</span>
                    </div>
                </Link>

                <div className="ml-4 text-gray-400 font-semibold text-lg mb-6">
                    <span>MENU</span>
                </div>
                <Link to={'/dashboard'}>
                    <div onClick={toggleIsactiveDas} className={`flex ${isActiveDas && "bg-gray-600"} items-center text-lg cursor-pointer text-gray-300 hover:text-white mb-3 px-4 py-2 hover:bg-gray-600 rounded-sm`}>
                        <SiSimpleanalytics />
                        <span className="ml-2">Tableau de bord</span>
                    </div>
                </Link>

                
                <Link to={'/products'}>
                    <div onClick={toggleIsactiveProd} className={`flex ${isActiveProd && "bg-gray-600"} items-center text-lg cursor-pointer text-gray-300 hover:text-white mb-3 px-4 py-2 hover:bg-gray-600 rounded-sm`}>
                        <RiProductHuntLine />
                        <span className="ml-2">Products</span>
                    </div>
                </Link>

                {user?.roles.some(r => r.name === "admin" || r.name =="employer") &&<Link to={'/users'}>
                    <div onClick={toggleIsactiveUser} className={`flex ${isActiveUser && "bg-gray-600"} items-center text-lg cursor-pointer text-gray-300 hover:text-white mb-3 px-4 py-2 hover:bg-gray-600 rounded-sm`}>
                        <PiUsersFourLight />
                        <span className="ml-2">Utilisateurs</span>
                    </div>
                </Link>
                }

                


                <Link to={'/roles'}>
                    <div onClick={toggleIsactiveRole} className={`flex ${isActiveRole && "bg-gray-600"} items-center text-lg cursor-pointer text-gray-300 hover:text-white mb-3 px-4 py-2 hover:bg-gray-600 rounded-sm`}>
                        <TfiControlEject />
                        <span className="ml-2">Roles</span>
                    </div>
                </Link>


                <Link to={'/categories'}>
                    <div onClick={toggleIsactiveCat} className={`flex ${isActiveCat && "bg-gray-600"} items-center text-lg cursor-pointer text-gray-300 hover:text-white mb-3 px-4 py-2 hover:bg-gray-600 rounded-sm`}>
                        <TbCategory />
                        <span className="ml-2">Catégories</span>
                    </div>
                </Link>

               
                <Link to={'/orders'}>
                    <div onClick={toggleIsactiveOrd} className={`flex ${isActiveOrd && "bg-gray-600"} items-center text-lg cursor-pointer text-gray-300 hover:text-white mb-3 px-4 py-2 hover:bg-gray-600 rounded-sm`}>
                        <TiShoppingCart />
                        <span className="ml-2">Commandes</span>
                    </div>
                </Link>


                <Link to={'/profil'}>
                    <div onClick={toggleIsactiveProf} className={`flex ${isActiveProf && "bg-gray-600"} items-center text-lg cursor-pointer text-gray-300 hover:text-white mb-3 px-4 py-2 hover:bg-gray-600 rounded-sm`}>
                        <LuUser2 />
                        <span className="ml-2">Profile</span>
                    </div>
                </Link>


            </div>

            {/**For the mobile */}

            <div className={`fixed top-0 left-0 h-full w-3/4 z-50 duration-500  lg:hidden  ${open ? 'left-0' : 'left-[-100%]'} py-5 pl-5 pr-12 ${theme === 'dark' ? "bg-gray-700" : "bg-slate-900"} text-white `}>
                <div className="flex items-center justify-between font-semibold text-2xl mb-20">
                    <Link to={'/dashbord'}>
                        <div onClick={toggleOpen} className="flex items-center justify-center gap-1 sm:gap-2">
                            <div className="flex items-center justify-center text-3xl w-10 h-10 rounded-xl bg-orange-700">
                                <RiDashboardHorizontalFill />
                            </div>
                            <div>
                                <span className=" text-xl sm:text-2xl hidden 400m:block">Administration</span>
                            </div>
                        </div>
                    </Link>


                    <div onClick={toggleOpen} className="text-2xl text-white cursor-pointer"><FaLongArrowAltLeft /></div>
                </div>
                <div className="ml-3 text-gray-400 font-semibold text-lg mb-6">
                    <span>MENU</span>
                </div>

                <Link to={'/dashboard'}>
                    <div onClick={toggleOpen} className="flex items-center text-lg cursor-pointer text-gray-300 hover:text-white mb-6">
                        <SiSimpleanalytics />
                        <span className="ml-2">Tableau de bord</span>
                    </div>
                </Link>

                <Link to={'/products'}>
                    <div onClick={toggleOpen} className="flex items-center text-lg cursor-pointer text-gray-300 hover:text-white mb-6">
                        <RiProductHuntLine />
                        <span className="ml-2">Products</span>
                    </div>
                </Link>

                <Link to={'/users'}>
                    <div onClick={toggleOpen} className="flex items-center text-lg cursor-pointer text-gray-300 hover:text-white mb-6">
                        <PiUsersFourLight />
                        <span className="ml-2">Utilisateurs</span>
                    </div>
                </Link>

                <Link to={'/roles'}>
                    <div onClick={toggleOpen} className="flex items-center text-lg cursor-pointer text-gray-300 hover:text-white mb-6">
                    <TfiControlEject />
                        <span className="ml-2">Roles</span>
                    </div>
                </Link>

                
                <Link to={'/categories'}>
                    <div onClick={toggleOpen} className="flex items-center text-lg cursor-pointer text-gray-300 hover:text-white mb-6">
                        <TbCategory />
                        <span className="ml-2">Catégories</span>
                    </div>
                </Link>

                <Link to={'/orders'}>
                    <div onClick={toggleOpen} className="flex items-center text-lg cursor-pointer text-gray-300 hover:text-white mb-6">
                        <TiShoppingCart />
                        <span className="ml-2">Commandes</span>
                    </div>
                </Link>

                <Link to={'/profil'}>
                    <div onClick={toggleOpen} className="flex items-center text-lg cursor-pointer text-gray-300 hover:text-white mb-6">
                        <LuUser2 />
                        <span className="ml-2">Profile</span>
                    </div>
                </Link>


            </div>

        </>

    )
}

export default SideBar