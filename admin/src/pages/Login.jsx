import { useState } from 'react';
import { MdOutlineMailOutline } from "react-icons/md";
import { RiLockPasswordLine } from 'react-icons/ri';
import { AiFillEye, AiFillEyeInvisible } from 'react-icons/ai';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import LoadingLoader from "../components/LoadingLoader";
import { login } from '../actions/authAction/auth.action';
import { useTheme } from '../context/ThemeContext';
import ThemeToggleButton from '../components/ThemeToggleButton';

function Login() {
  const auth = useSelector(state => state.auth);
  const dispatch = useDispatch();
  const { theme } = useTheme();

  const [formData, setFormData] = useState({
    email: "",
    password: ""
  });

  const [showPassword, setShowPassword] = useState(false);

  const { email, password } = formData;
  const { error, loading } = auth;

  const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = e => {
    e.preventDefault();
    dispatch(login({ email, password }));
  };

  return (
    <div className={`flex items-center px-4 flex-col h-screen justify-center ${theme === 'dark' ? 'bg-gray-900' : 'bg-gray-200'}`}>
      <div className="flex justify-end mb-4">
          <ThemeToggleButton />
      </div>
      <div className={`w-full mx-2 299bp:mx-6 lg:w-550px ${theme === 'dark' ? 'bg-gray-800 text-white' : 'bg-white text-gray-800'} py-8 md:p-8 my-5p`}>
      
        {error?.error?.includes("activer") &&
          <div className='px-3 md:px-8'>
            <div className='w-full text-white font-semibold px-4 py-5 bg-red-600 flex items-center justify-center'>
              <span>{error?.error?.includes("activer") && error?.error}</span>
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
            <label className="block text-sm font-bold mb-2 cursor-pointer" htmlFor="email">
              <div className='flex items-center gap-1'>
                <span className='text-lg'><MdOutlineMailOutline /></span>
                <span>Email</span>
              </div>
            </label>
            <input type="email" name='email' value={email} onChange={onChange} className={`shadow appearance-none border ${error?.error?.includes("email") && 'border-red-500'} rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline ${theme === 'dark' ? 'bg-gray-700 text-white' : 'bg-gray-200 text-gray-700'}`} id="email" placeholder="Entrez votre email" />
            {error?.error?.includes("email") && <p className="text-red-500 text-xs italic">{error?.error}</p>}
          </div>
          <div className="mb-6">
            <div className='flex items-center justify-between'>
              <label className="block text-sm font-bold mb-2 cursor-pointer" htmlFor="password">
                <div className='flex items-center gap-1'>
                  <span className='text-lg'><RiLockPasswordLine /></span>
                  <span>Mot de passe</span>
                </div>
              </label>
              <Link to={'/forgot-password'}>
                <a className="inline-block align-baseline font-bold text-sm mb-2 text-blue-500 hover:text-blue-800">
                  Mot de passe oublié?
                </a>
              </Link>
            </div>

            <div className="relative">
              <input name='password' value={password} onChange={onChange} className={`shadow appearance-none border ${error?.error?.includes("passe") && 'border-red-500'} rounded w-full py-2 px-3 mb-3 leading-tight focus:outline-none focus:shadow-outline ${theme === 'dark' ? 'bg-gray-700 text-white' : 'bg-gray-200 text-gray-700'}`} id="password" type={showPassword ? "text" : "password"} placeholder="Entrez le mot de passe" />
              <button type="button" className="absolute right-2 top-2" onClick={() => setShowPassword(!showPassword)}>
                {showPassword ? <AiFillEyeInvisible /> : <AiFillEye />}
              </button>
            </div>
            {error?.error?.includes("passe") && <p className="text-red-500 text-xs italic">{error?.error}</p>}
          </div>
          <div className='mb-6'>
            <button className="w-full bg-orange-700 hover:bg-orange-800 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="submit">
              Se connecter
            </button>
          </div>
          <div className="flex items-center justify-between">
            <div className="flex items-center mb-4">
              <input id="default-checkbox" type="checkbox" value="" className="hover:cursor-pointer w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 focus:ring-2" />
              <label htmlFor="default-checkbox" className={`hover:cursor-pointer ms-2 text-sm font-medium ${theme === 'dark' ? 'text-gray-300' : 'text-gray-900'}`}>Rester connecté(e)</label>
            </div>
            <Link to={'/register'}>
              <a className="inline-block align-baseline mb-4 font-bold text-sm text-blue-500 hover:text-blue-800">
                créer un compte
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

export default Login;