import { useState } from 'react';
import { RiLockPasswordLine } from 'react-icons/ri';
import { AiFillEye, AiFillEyeInvisible } from 'react-icons/ai';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import LoadingLoader from "../components/LoadingLoader";
import { resetPassword } from '../actions/authAction/auth.action';
import { useTheme } from '../context/ThemeContext';
import ThemeToggleButton from '../components/ThemeToggleButton';

function ResetPassword() {
  const auth = useSelector(state => state.auth);
  const dispatch = useDispatch();
  const { token } = useParams();
  const { theme } = useTheme();

  const [formData, setFormData] = useState({
    password: "",
    confirmPassword: ""
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const { password, confirmPassword } = formData;
  const { error, loading } = auth;

  const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = e => {
    e.preventDefault();
    dispatch(resetPassword(token, { password, confirmPassword }));
  };

  return (
    <div className={`flex items-center flex-col px-4 h-screen justify-center ${theme === 'dark' ? 'bg-gray-900' : 'bg-gray-200'}`}>
      <div className="flex justify-end mb-4">
          <ThemeToggleButton />
      </div>
      <div className={`w-full mx-2 299bp:mx-6 lg:w-550px ${theme === 'dark' ? 'bg-gray-800 text-white' : 'bg-white text-gray-800'} py-8 md:p-8 my-5p`}>
        {error?.jetonError &&
          <div className='px-3 md:px-8'>
            <div className='w-full text-white font-semibold px-4 py-5 bg-red-600 flex items-center justify-center '>
              <span>{error?.jetonError}</span>
            </div>
          </div>
        }
        {loading &&
          <div className='px-3 md:px-8 flex items-center justify-center'>
            <LoadingLoader />
          </div>
        }
        <p className='text-center mx-2 299bp:mx-6 text-lg font-semibold md:text-2xl'>Connectez-vous pour accéder à la page d'administration du site</p>
        <form className={`${theme === 'dark' ? 'bg-gray-800' : 'bg-white'} shadow-md rounded px-3 md:px-8 pt-6 pb-8 mb-4`} onSubmit={onSubmit}>
          <div className="mb-4">
            <label className="block text-sm font-bold mb-2 cursor-pointer" htmlFor="password">
              <div className='flex items-center gap-1'>
                <span className='text-lg'><RiLockPasswordLine /></span>
                <span>Mot de passe</span>
              </div>
            </label>
            <div className="relative">
              <input type={showPassword ? "text" : "password"} name='password' value={password} onChange={onChange} className={`shadow appearance-none border ${error?.passwordLength && 'border-red-500'} rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline ${theme === 'dark' ? 'bg-gray-700 text-white' : 'bg-gray-200 text-gray-700'}`} id="password" placeholder="Entrez votre nouveau mot de passe" />
              <button type="button" className="absolute right-2 top-2" onClick={() => setShowPassword(!showPassword)}>
                {showPassword ? <AiFillEyeInvisible /> : <AiFillEye />}
              </button>
            </div>
            {error?.passwordLength && <p className="text-red-500 text-xs italic">{error?.passwordLength}</p>}
          </div>

          <div className="mb-4">
            <label className="block text-sm font-bold mb-2 cursor-pointer" htmlFor="confirmPassword">
              <div className='flex items-center gap-1'>
                <span className='text-lg'><RiLockPasswordLine /></span>
                <span>Entrez à nouveau le mot de passe</span>
              </div>
            </label>
            <div className="relative">
              <input type={showConfirmPassword ? "text" : "password"} name='confirmPassword' value={confirmPassword} onChange={onChange} className={`shadow appearance-none border ${error?.confirmPasswordError && 'border-red-500'} rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline ${theme === 'dark' ? 'bg-gray-700 text-white' : 'bg-gray-200 text-gray-700'}`} id="confirmPassword" placeholder="Entrez à nouveau le mot de passe" />
              <button type="button" className="absolute right-2 top-2" onClick={() => setShowConfirmPassword(!showConfirmPassword)}>
                {showConfirmPassword ? <AiFillEyeInvisible /> : <AiFillEye />}
              </button>
            </div>
            {error?.confirmPasswordError && <p className="text-red-500 text-xs italic">{error?.confirmPasswordError}</p>}
          </div>

          <div className='mb-6'>
            <button className="w-full bg-orange-700 hover:bg-orange-800 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="submit">
              Modifier le mot de passe
            </button>
          </div>
          <div className="flex items-center justify-end">
            <Link to={'/login'}>
              <a className="inline-block align-baseline mb-4 font-bold text-sm text-blue-500 hover:text-blue-800">
                Se connecter
              </a>
            </Link>
          </div>
        </form>
        <p className="text-center text-gray-500 text-xs">
          Accéder à votre compte sans avoir à vous authentifier pendant 30 jours.
        </p>
      </div>
    </div>
  );
}

export default ResetPassword;