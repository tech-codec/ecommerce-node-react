import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { forgotPassword } from '../actions/authAction/auth.action';
import LoadingLoader from '../components/LoadingLoader';
import { useTheme } from '../context/ThemeContext';
import ThemeToggleButton from '../components/ThemeToggleButton';

const ForgotPassword = () => {
  const [formData, setFormData] = useState({
    email: ""
  });

  const auth = useSelector(state => state.auth);
  const dispatch = useDispatch();
  const { theme } = useTheme();

  const { email } = formData;
  const { error, loading } = auth;

  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    dispatch(forgotPassword({ email }));
  };

  return (
    <div className={`w-full flex flex-col px-4 items-center h-screen justify-center ${theme === 'dark' ? 'bg-gray-900' : 'bg-gray-200'}`} onSubmit={onSubmit}>
      <div className="flex justify-end mb-4">
          <ThemeToggleButton />
      </div>
      <form className={`w-full mx-6 md:w-550px ${theme === 'dark' ? 'bg-gray-800 text-white' : 'bg-white text-gray-800'} py-5 px-5 rounded-lg shadow-md`}>
        {loading &&
          <div className='flex mb-2 w-full items-center justify-center font-semibold text-lg'>
            <LoadingLoader />
          </div>
        }
        <div className='flex w-full text-lg text-center items-center justify-center font-semibold md:text-xl mb-5'>
          Saisissez votre adresse email pour réinitialiser votre mot de passe.
        </div>
        <div className='w-full mb-5'>
          <input name='email' type='email' value={formData.email} onChange={onChange} className={`w-full ${theme === 'dark' ? 'bg-gray-700 text-white' : 'bg-gray-300 text-gray-700'} border ${error?.error?.includes("L'utilisateur avec cet") && "border-red-500"} mb-1 py-3 px-3 text-lg shadow-lg outline-none rounded-3xl`} placeholder='Entrez votre email' />
          {error?.error?.includes("L'utilisateur avec cet") && <p className="text-red-500 text-xs italic">{error.error}</p>}
        </div>
        <div className='w-full text-white font-semibold items-center justify-center flex'>
          <Link to={"/login"}>
            <button className='py-2 px-4 shadow-lg mr-3 bg-orange-700 rounded-3xl'>
              Se connecter
            </button>
          </Link>
          <button type='submit' className='py-2 px-4 bg-orange-700 shadow-lg rounded-3xl'>
            Envoyer
          </button>
        </div>
      </form>
    </div>
  );
};

export default ForgotPassword;