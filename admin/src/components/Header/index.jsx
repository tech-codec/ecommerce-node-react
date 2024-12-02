import { IoIosNotificationsOutline } from "react-icons/io";
import { IoChevronDown } from "react-icons/io5";
import userImage from "../../assets/images/avatar_image.png"
import { MdDarkMode } from "react-icons/md";
import { MdLightMode } from "react-icons/md";
import { useTheme } from "../../context/ThemeContext";
import { RiDashboardHorizontalFill } from "react-icons/ri";
import { IoMenuOutline } from "react-icons/io5";
import { LuUser2 } from "react-icons/lu";
import { IoSettingsOutline } from "react-icons/io5";
import { BiLogOut } from "react-icons/bi";
import { useState } from "react";
import { RiLockPasswordLine } from "react-icons/ri";
import {Link} from 'react-router-dom'
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../actions/authAction/auth.action";

function Header() {

    const auth = useSelector(state => state.auth)
    const dispatch = useDispatch()

    

    const { theme, toggleTheme, toggleOpen } = useTheme()
    const {user} = auth
    const [openSousMenu, setOpenSousMenu] = useState(false)

    console.log(user.image)

    const handleLogout = ()=>{
        dispatch(logout())
    }

    const toggleSousMenu = () => {
        setOpenSousMenu(!openSousMenu)
    }

    return (
        <div className={`w-full fixed z-40 left-0 top-0 flex items-center justify-between lg:block px-5 md:px-8 lg:px-11 py-3 ${theme === 'dark' ? "bg-gray-700 text-white" : "bg-white text-gray-500"}  `}>
            <div className="flex items-center justify-between gap-2 400m:gap-4 text-white lg:hidden">
                <div onClick={toggleOpen} className="flex cursor-pointer items-center justify-center text-gray-800  text-4xl w-8 h-8 rounded-sm bg-white border border-gray-500 shadow-lg"> <IoMenuOutline /> </div>
                <Link to={'/dashboard'}><div className="flex cursor-pointer items-center justify-center text-2xl w-8 h-8 rounded-md bg-orange-700"><RiDashboardHorizontalFill /> </div></Link>
            </div>
            <div className="flex items-center justify-between lg:justify-end gap-2 400m:gap-4">
                <div className={`w-14 h-8 flex items-center  ${theme === 'dark' ? "bg-purple-700 " : "bg-gray-200"} text-gray-500 rounded-3xl px-1 cursor-pointer`} onClick={toggleTheme}>
                    <div className={`w-6 h-6 text-lg flex items-center justify-center bg-white rounded-full transform transition-transform duration-500 ease-in-out ${theme === 'dark' ? "translate-x-6" : "translate-x-0"} `}>
                        {theme === 'dark'
                            ?
                            <MdDarkMode />
                            :
                            <MdLightMode />
                        }
                    </div>
                </div>
                <div className="bg-gray-200 rounded-full w-8 h-8 flex items-center justify-center text-2xl cursor-pointer text-gray-500">
                    <IoIosNotificationsOutline />
                </div>
                <div onClick={toggleSousMenu} className="flex items-center justify-between gap-2 cursor-pointer ">
                    <span className="hidden lg:block">{user.name}</span>
                    <img src={userImage} alt="" className="w-12 h-12 rounded-full" />
                    <div className="text-lg hidden sm:block">
                        <IoChevronDown />
                    </div>

                </div>
            </div>

            {
                openSousMenu &&
                <div className={`${theme === 'dark' ? "bg-gray-700 text-gray-300" : "bg-white text-gray-500"} float-right   w-64  text-base top-full right-5 rounded-sm absolute  py-5`}>

                    <Link to={'/profil'}>
                        <div onClick={toggleSousMenu} className="flex items-center justify-start px-5 mb-4 gap-2 cursor-pointer hover:text-purple-700">
                            <div className="text-xl"><LuUser2 /></div>
                            <span>Profile</span>
                        </div>
                    </Link>
                   
                   <Link to={'/update-profil'}>
                   <div onClick={toggleSousMenu} className="flex items-center justify-start px-5  mb-4 gap-2 cursor-pointer hover:text-purple-700">
                        <div className="text-xl"> <IoSettingsOutline /></div>
                        <span>Paramètre du compte</span>
                    </div>
                   </Link>

                   <Link to={'/update-password'}>
                   <div onClick={toggleSousMenu} className="flex items-center justify-start px-5  mb-4 gap-2 cursor-pointer hover:text-purple-700">
                        <div className="text-xl"> <RiLockPasswordLine /></div>
                        <span>Modifier le mot de passe</span>
                    </div>
                   </Link>
                   
                    <div onClick={handleLogout} className={`flex w-full border-t  ${theme === 'dark' ? "border-gray-600" : "border-gray-200"} pt-5 px-5 items-center justify-start gap-2 mt-8 cursor-pointer hover:text-purple-700`}>
                        <div className="text-xl">
                            <BiLogOut />
                        </div>
                        <span>Déconnexion</span>
                    </div>
                </div>
            }

        </div>
    )
}

export default Header