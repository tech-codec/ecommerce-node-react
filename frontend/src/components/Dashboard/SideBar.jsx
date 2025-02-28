import { useContext } from "react";
import { FaShoppingCart, FaUser, FaCog, FaLock } from "react-icons/fa";
import { DashboardContext } from "../../context/DashboradContext";

const Sidebar = () => {
    const { positionActive, setPositionActive } = useContext(DashboardContext);

    return (
        <div>
            {/* Sidebar pour Desktop (lg et plus) */}
            <div className="hidden sc-1193:flex flex-col bg-white shadow-lg w-64 h-screen fixed top-0 left-0 p-6">
                <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">Mon compte</h2>
                <nav className="space-y-4">
                    <button
                        onClick={() => setPositionActive(1)}
                        className={`flex items-center gap-3 p-3 rounded-lg transition-all
                        ${positionActive === 1 ? 'text-orange-500 bg-gray-100' : 'text-gray-700'}  
                        hover:text-orange-500 hover:bg-gray-100 w-full`}
                    >
                        <FaShoppingCart className="text-xl" />
                        <span className="font-medium">Commandes</span>
                    </button>

                    <button
                        onClick={() => setPositionActive(2)}
                        className={`flex items-center gap-3 p-3 rounded-lg transition-all
                        ${positionActive === 2 ? 'text-orange-500 bg-gray-100' : 'text-gray-700'}  
                        hover:text-orange-500 hover:bg-gray-100 w-full`}
                    >
                        <FaUser className="text-xl" />
                        <span className="font-medium">Profil</span>
                    </button>

                    <button
                        onClick={() => setPositionActive(3)}
                        className={`flex items-center gap-3 p-3 rounded-lg transition-all
                        ${positionActive === 3 ? 'text-orange-500 bg-gray-100' : 'text-gray-700'}  
                        hover:text-orange-500 hover:bg-gray-100 w-full`}
                    >
                        <FaCog className="text-xl" />
                        <span className="font-medium">Paramètres</span>
                    </button>

                    <button
                        onClick={() => setPositionActive(4)}
                        className={`flex items-center gap-3 p-3 rounded-lg transition-all
                        ${positionActive === 4 ? 'text-orange-500 bg-gray-100' : 'text-gray-700'}  
                        hover:text-orange-500 hover:bg-gray-100 w-full`}
                    >
                        <FaLock className="text-xl" />
                        <span className="font-medium">Mot de passe</span>
                    </button>
                </nav>
            </div>

            {/* Menu pour Mobile (< lg) */}
            <div className="sc-1193:hidden z-10 fixed bottom-0 left-0 w-full bg-white shadow-lg flex justify-around items-center py-4">
                <button
                    onClick={() => setPositionActive(1)}
                    className={`flex flex-col items-center text-gray-700 p-2 transition-all
                    ${positionActive === 1 ? 'text-orange-500' : ''}`}
                >
                    <FaShoppingCart className="text-2xl" />
                </button>

                <button
                    onClick={() => setPositionActive(2)}
                    className={`flex flex-col items-center text-gray-700 p-2 transition-all
                    ${positionActive === 2 ? 'text-orange-500' : ''}`}
                >
                    <FaUser className="text-2xl" />
                </button>

                <button
                    onClick={() => setPositionActive(3)}
                    className={`flex flex-col items-center text-gray-700 p-2 transition-all
                    ${positionActive === 3 ? 'text-orange-500' : ''}`}
                >
                    <FaCog className="text-2xl" />
                </button>

                <button
                    onClick={() => setPositionActive(4)}
                    className={`flex flex-col items-center text-gray-700 p-2 transition-all
                    ${positionActive === 4 ? 'text-orange-500' : ''}`}
                >
                    <FaLock className="text-2xl" />
                </button>
            </div>
        </div>
    );
};

export default Sidebar;
