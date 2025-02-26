import { BrowserRouter as Router, Routes, Route, Navigate} from 'react-router-dom';
import Login from '../../pages/Login';
import Register from '../../pages/Register';
import ForgotPassword from '../../pages/ForgotPassword';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';
import { useSelector } from 'react-redux';
import ActivateAccount from '../../pages/ActivateAccount';
import ResetPassword from '../../pages/ResetPassword';
import PrivateRoutes from '../PrivateRoutes';

function MyRoutes() {
  const auth = useSelector(state => state.auth);
  const {isAuthenticated, user} = auth

  console.log("auth 2 in router: " + JSON.stringify(auth));

  return (
    <Router>
      <Routes>
        {isAuthenticated && user.roles.some(r => (r.name === "admin" || r.name ==="employer" )) ? (
          <>
            <Route path="/*" element={<PrivateRoutes />} />
          </>
        ) : (
          <>
            <Route path='/login' element={<Login />} />
            <Route path='/register' element={<Register />} />
            <Route path='/forgot-password' element={<ForgotPassword />} />
            <Route path='/reset-password/:token' element={<ResetPassword />} />
            <Route path="/activate/:token" element={<ActivateAccount />} />
            <Route path="*" element={<Navigate to="/login" />} />
          </>
        )}
      </Routes>
      <ToastContainer />
    </Router>
  );
}

export default MyRoutes;