import { useState } from 'react';
import { RiLockPasswordLine } from 'react-icons/ri';
import { AiFillEye, AiFillEyeInvisible } from 'react-icons/ai';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import LoadingLoader from "../components/LoadingLoader";
import { resetPassword } from '../../../admin/src/actions/authAction/auth.action';

function ResetPassword() {
  const auth = useSelector(state => state.auth);
  const dispatch = useDispatch();
  const { token } = useParams();

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
    <div className="flex items-center px-4 justify-center my-5p">
      <div className="w-full mx-2 lg:w-[550px] bg-white text-gray-800 shadow-md rounded-lg py-8 px-6">
        {error?.jetonError && (
          <div className='w-full text-white font-semibold px-4 py-5 bg-red-600 text-center rounded-md mb-4'>
            {error?.jetonError}
          </div>
        )}
        {loading && (
          <div className='flex items-center justify-center mb-4'>
            <LoadingLoader />
          </div>
        )}
        <p className='text-center text-lg font-semibold md:text-2xl mb-6'>
          Réinitialiser votre mot de passe
        </p>
        <form className="space-y-4" onSubmit={onSubmit}>
          {/* Mot de passe */}
          <div>
            <label className="block text-sm font-bold mb-1" htmlFor="password">
              <div className='flex items-center gap-1'>
                <RiLockPasswordLine className='text-lg' />
                <span>Nouveau mot de passe</span>
              </div>
            </label>
            <div className="relative">
              <input 
                type={showPassword ? "text" : "password"} 
                name='password' 
                value={password} 
                onChange={onChange} 
                className={`border w-full py-2 px-3 rounded focus:outline-none focus:ring-2 focus:ring-orange-500 ${error?.passwordLength ? 'border-red-500' : 'border-gray-300'}`}
                id="password" 
                placeholder="Entrez votre nouveau mot de passe" 
              />
              <button type="button" className="absolute right-2 top-2 text-gray-600" onClick={() => setShowPassword(!showPassword)}>
                {showPassword ? <AiFillEyeInvisible /> : <AiFillEye />}
              </button>
            </div>
            {error?.passwordLength && <p className="text-red-500 text-xs italic">{error?.passwordLength}</p>}
          </div>
          
          {/* Confirmation */}
          <div>
            <label className="block text-sm font-bold mb-1" htmlFor="confirmPassword">
              <div className='flex items-center gap-1'>
                <RiLockPasswordLine className='text-lg' />
                <span>Confirmez le mot de passe</span>
              </div>
            </label>
            <div className="relative">
              <input 
                type={showConfirmPassword ? "text" : "password"} 
                name='confirmPassword' 
                value={confirmPassword} 
                onChange={onChange} 
                className={`border w-full py-2 px-3 rounded focus:outline-none focus:ring-2 focus:ring-orange-500 ${error?.confirmPasswordError ? 'border-red-500' : 'border-gray-300'}`}
                id="confirmPassword" 
                placeholder="Confirmez votre mot de passe" 
              />
              <button type="button" className="absolute right-2 top-2 text-gray-600" onClick={() => setShowConfirmPassword(!showConfirmPassword)}>
                {showConfirmPassword ? <AiFillEyeInvisible /> : <AiFillEye />}
              </button>
            </div>
            {error?.confirmPasswordError && <p className="text-red-500 text-xs italic">{error?.confirmPasswordError}</p>}
          </div>
          
          <button className="w-full bg-orange-500 hover:bg-orange-400 text-white font-bold py-2 px-4 rounded focus:outline-none focus:ring-2 focus:ring-orange-500" type="submit">
            Modifier le mot de passe
          </button>
        </form>
        <div className="text-center mt-4">
          <Link to='/signIn' className="text-sm text-blue-500 hover:text-blue-700 font-medium">
            Se connecter
          </Link>
        </div>
      </div>
    </div>
  );
}

export default ResetPassword;
