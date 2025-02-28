import { useState } from 'react';
import { Link } from 'react-router-dom';
import UserRolesSelect from '../components/UserRolesSelect';
import { useDispatch, useSelector } from 'react-redux';
import { register } from '../actions/authAction/auth.action';
import LoadingLoader from '../components/LoadingLoader';
import { AiFillEye, AiFillEyeInvisible } from 'react-icons/ai';
import { useTheme } from '../context/ThemeContext';
import ThemeToggleButton from '../components/ThemeToggleButton';

function Register() {
  const auth = useSelector(state => state.auth);
  const dispatch = useDispatch();
  const { theme } = useTheme();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    roles: [],
    password: "",
    confirmPassword: ""
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const { name, email, roles, password, confirmPassword } = formData;
  const { error, success, loading } = auth;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleRolesChange = (selectedRoles) => {
    setFormData({
      ...formData,
      roles: selectedRoles
    });
  };

  const onSumit = e => {
    e.preventDefault();
    console.log({ name, email, roles, password, confirmPassword });
    dispatch(register({ name, email, roles, password, confirmPassword }));
  };

  return (
    <div className={`flex items-center flex-col px-4 justify-center  my-3 ${theme === 'dark' ? 'bg-gray-900' : 'bg-gray-200'}`}>
      <div className="flex justify-end mb-4 mt-9">
          <ThemeToggleButton />
      </div>
      <div className={`w-full mx-2 299bp:mx-8 md:w-550px ${theme === 'dark' ? 'bg-gray-800 text-white' : 'bg-white text-gray-800'} py-8 md:p-8 my-5p`}>
      {
      success &&
        <div className='px-3 py-4 mx-3 mb-2 text-white text-base bg-green-600 md:px-8 text-center break-words max-w-full'>
          {success?.message}
        </div>
      }
        {loading &&
          <div className='px-3 md:px-8 flex items-center justify-center'>
            <LoadingLoader />
          </div>
        }
        <p className='text-center text-lg font-semibold md:text-2xl'>Créer un compte</p>
        <form className={`${theme === 'dark' ? 'bg-gray-800' : 'bg-white'} shadow-md rounded px-3 md:px-8 pt-6 pb-8 mb-4`} onSubmit={onSumit}>
          <div className="mb-4">
            <label className="block text-sm font-bold mb-2" htmlFor="name">
              Nom
            </label>
            <input type="text" value={name} name='name' onChange={handleChange} className={`shadow ${error?.name && "border-red-500"} border appearance-none rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline ${theme === 'dark' ? 'bg-gray-700 text-white' : 'bg-gray-200 text-gray-700'}`} id="name" placeholder="Entrez votre nom" />
            {error?.name && <p className="text-red-500 text-xs italic">{error?.name}</p>}
          </div>

          <div className="mb-4">
            <label className="block text-sm font-bold mb-2" htmlFor="email">
              Email
            </label>
            <input type="email" value={email} name='email' onChange={handleChange} className={`shadow ${error?.email && "border-red-500"} appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline ${theme === 'dark' ? 'bg-gray-700 text-white' : 'bg-gray-200 text-gray-700'}`} id="email" placeholder="Entrez votre email" />
            {error?.email && <p className="text-red-500 text-xs italic">{error?.email}</p>}
          </div>

          <UserRolesSelect selectedRoles={roles} error={error} onChange={handleRolesChange} />

          <div className="mb-4">
            <label className="block text-sm font-bold mb-2" htmlFor="password">
              Mot de passe
            </label>
            <div className="relative">
              <input type={showPassword ? "text" : "password"} value={password} name='password' onChange={handleChange} className={`shadow ${error?.password && "border-red-500"} appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline ${theme === 'dark' ? 'bg-gray-700 text-white' : 'bg-gray-200 text-gray-700'}`} id="password" placeholder="Entrez le mot de passe" />
              <button type="button" className="absolute right-2 top-2" onClick={() => setShowPassword(!showPassword)}>
                {showPassword ? <AiFillEyeInvisible /> : <AiFillEye />}
              </button>
            </div>
            {error?.password && <p className="text-red-500 text-xs italic">{error?.password}</p>}
          </div>

          <div className="mb-4">
            <label className="block text-sm font-bold mb-2" htmlFor="confirmPassword">
              Confirmez le mot de passe
            </label>
            <div className="relative">
              <input type={showConfirmPassword ? "text" : "password"} value={confirmPassword} name='confirmPassword' onChange={handleChange} className={`shadow ${error?.confirmPassword && "border-red-500"} appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline ${theme === 'dark' ? 'bg-gray-700 text-white' : 'bg-gray-200 text-gray-700'}`} id="confirmPassword" placeholder="Entrez à nouveau le mot de passe" />
              <button type="button" className="absolute right-2 top-2" onClick={() => setShowConfirmPassword(!showConfirmPassword)}>
                {showConfirmPassword ? <AiFillEyeInvisible /> : <AiFillEye />}
              </button>
            </div>
            {error?.confirmPassword && <p className="text-red-500 text-xs italic">{error?.confirmPassword}</p>}
          </div>

          <div className="flex items-center">
            <label className="block mb-4 text-sm font-bold" htmlFor="password">
              Avez-vous déjà un compte?
            </label>
            <Link to={'/login'}>
              <a className="inline-block align-baseline mb-4 font-bold text-sm text-blue-500 hover:text-blue-800 ml-2">
                Connectez-vous
              </a>
            </Link>
          </div>

          <div className="flex items-center mb-4">
            <input id="default-checkbox" type="checkbox" value="" className={`hover:cursor-pointer w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 focus:ring-2 ${theme === 'dark' ? 'dark:bg-gray-700 dark:border-gray-600' : ''}`} />
            <label htmlFor="default-checkbox" className={`hover:cursor-pointer ms-2 text-sm font-medium ${theme === 'dark' ? 'text-gray-300' : 'text-gray-900'}`}>{`j'accepte les conditions générales`}</label>
          </div>

          <div className='mb-6'>
            <button className="w-full bg-orange-700 hover:bg-orange-800 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type='submit'>
              Créer mon compte
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Register;