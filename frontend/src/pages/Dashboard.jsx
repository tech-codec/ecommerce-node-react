import { useContext } from "react";
import Sidebar from "../components/Dashboard/SideBar";
import Profile from "../components/Dashboard/Profile";
import { DashboardContext } from "../context/DashboradContext";
import UpdateProfile from "../components/Dashboard/UpdateProfile";
import UpdatePassword from "../components/Dashboard/UpdatePassword";
import Orders from "../components/Dashboard/Orders";
import OrderDetail from "../components/Dashboard/OrderDetail";

const Dashboard = () => {
  const { positionActive } = useContext(DashboardContext);

  return (
    <div className="px-5p md:px-10p lg:my-10 mb-6">
      <div className="flex flex-col sc-1193:flex-row gap-6">
        {/* Sidebar */}
        <aside className="w-full lg:w-1/4">
          <Sidebar />
        </aside>

        {/* Contenu principal */}
        <main className="w-full sc-1193:w-3/4 bg-white p-6 rounded-lg shadow-md transition-all">
          {positionActive === 1 && <Orders />}
          {positionActive === 2 && <Profile />}
          {positionActive === 3 && <UpdateProfile />}
          {positionActive === 4 && <UpdatePassword />}
          {positionActive === 5 && <OrderDetail />}
        </main>
      </div>
    </div>
  );
};

export default Dashboard;
