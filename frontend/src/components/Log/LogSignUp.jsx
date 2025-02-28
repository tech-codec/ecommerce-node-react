import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { register } from '../../actions/authAction/auth.action';
import LoadingLoader from '../LoadingLoader';
import { Link } from 'react-router-dom';
import { IoEyeOff, IoEye } from "react-icons/io5";

function LogSignUp() {
  const auth = useSelector(state => state.auth);
  const dispatch = useDispatch();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: ""
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const { name, email, password, confirmPassword } = formData;

  const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });

  const { error,success, loading } = auth;

  const onSubmit = e => {
    e.preventDefault();
    dispatch(register({ name, email, password, confirmPassword }));
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  return (
    <div className='w-full lg:w-9/12 xl:w-3/5 bg-white mx-auto py-8 md:p-8 my-5p'>
      {
      success &&
        <div className='px-3 py-4 mx-3 mb-2 text-white text-base bg-green-600 md:px-8 text-center break-words max-w-full'>
          {success?.message}
        </div>
      }
      {
      loading &&
        <div className='px-3 md:px-8 flex items-center justify-center'>
          <LoadingLoader />
        </div>
      }
      <form className="bg-white shadow-md rounded px-3 md:px-8 md:pt-6 pb-8 mb-4" onSubmit={onSubmit}>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">
            Nom
          </label>
          <input type="text" value={name} name='name' onChange={onChange} className={`shadow ${error?.name && "border-red-500"} appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline`} id="name" placeholder="Entrez votre nom" />
          {error?.name && <p className="text-red-500 text-xs italic">{error?.name}</p>}
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
            Email
          </label>
          <input type="email" value={email} name='email' onChange={onChange} className={`shadow ${error?.email && "border-red-500"} appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline`} id="email" placeholder="Entrez votre email" />
          {error?.email && <p className="text-red-500 text-xs italic">{error?.email}</p>}
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
            Mot de passe
          </label>
          <div className="relative">
            <input type={showPassword ? "text" : "password"} value={password} name='password' onChange={onChange} className={`shadow ${error?.password && "border-red-500"} appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline`} id="password" placeholder="Entrez le mot de passe" />
            <span className="absolute inset-y-0 right-0 pr-3 flex items-center text-sm leading-5 cursor-pointer" onClick={togglePasswordVisibility}>
              {showPassword ? <IoEyeOff /> : <IoEye />}
            </span>
          </div>
          {error?.password && <p className="text-red-500 text-xs italic">{error?.password}</p>}
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="confirmPassword">
            Confirmez le mot de passe
          </label>
          <div className="relative">
            <input type={showConfirmPassword ? "text" : "password"} value={confirmPassword} name='confirmPassword' onChange={onChange} className={`shadow ${error?.confirmPassword && "border-red-500"} appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline`} id="confirmPassword" placeholder="Entrez à nouveau le mot de passe" />
            <span className="absolute inset-y-0 right-0 pr-3 flex items-center text-sm leading-5 cursor-pointer" onClick={toggleConfirmPasswordVisibility}>
              {showConfirmPassword ? <IoEyeOff /> : <IoEye />}
            </span>
          </div>
          {error?.confirmPassword && <p className="text-red-500 text-xs italic">{error?.confirmPassword}</p>}
        </div>

        <div className="flex items-center mb-4">
          <input id="default-checkbox" type="checkbox" value="" className="hover:cursor-pointer w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 focus:ring-2" />
          <label htmlFor="default-checkbox" className="hover:cursor-pointer ms-2 text-sm font-medium text-gray-900">{`j'accepte les conditions générales`}</label>
        </div>

        <div className='mb-6'>
          <button className="w-full bg-orange-500 hover:bg-orange-400 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type='submit'>
            Créer mon compte
          </button>
        </div>

        <div className="flex items-center">
          <label className="block text-gray-700 mb-4 text-sm font-bold" htmlFor="password">
            Avez-vous déjà un compte?
          </label>
          <Link to={'/signIn'}>
            <span className="inline-block align-baseline mb-4 font-bold text-sm text-blue-500 hover:text-blue-800 ml-2">
              Connectez-vous
            </span>
          </Link>
        </div>
      </form>
      <p className="text-center px-3 text-gray-500 text-xs">
        Accéder à votre compte sans avoir à vous authentifier pendant 30 jours.
      </p>
    </div>
  );
}

export default LogSignUp;