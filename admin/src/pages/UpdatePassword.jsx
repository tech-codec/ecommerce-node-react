import { useState } from 'react';
import { useTheme } from '../context/ThemeContext';
import { AiFillEye, AiFillEyeInvisible } from 'react-icons/ai';
import { useDispatch, useSelector } from 'react-redux';
import { updatePasswordUser } from '../actions/userAction/user.action';

const UpdatePassword = () => {
  const auth = useSelector(state => state.auth);
  const { user} = auth;
  const { theme } = useTheme();
  const userDataState = useSelector(state => state.user)
  const {error} = userDataState
  const dispatch = useDispatch()
  const [password, setPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(updatePasswordUser(user._id, {password,newPassword,confirmPassword}))
  };

  return (
    <div className='w-full'>
      <div className='mb-8 flex items-center justify-between flex-wrap gap-2'>
        <h2 className={`text-2xl font-semibold ${theme === 'dark' ? 'text-white' : 'text-gray-800'}`}>Modifier votre mot de passe</h2>
        <h4 className='text-base'><span className='text-gray-500 cursor-pointer'>Tableau de bord / </span><span className='text-purple-700'>Modifier votre mot de passe</span></h4>
      </div>

      <div className={`flex py-10 items-center justify-center ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
        <div className="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-lg w-full max-w-lg">
          <h2 className="text-2xl font-bold mb-6 text-center">Modifier le mot de passe</h2>
          
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label className="block mb-2">Mot de passe actuel</label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  className="w-full p-2 border border-gray-300 rounded dark:bg-gray-700 dark:border-gray-600"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
                <button
                  type="button"
                  className="absolute right-2 top-2"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <AiFillEyeInvisible /> : <AiFillEye />}
                </button>
              </div>
              {error?.passwordError && <p className="mb-4 text-red-500">{error.passwordError}</p>}
            </div>
            <div className="mb-4">
              <label className="block mb-2">Nouveau mot de passe</label>
              <div className="relative">
                <input
                  type={showNewPassword ? 'text' : 'password'}
                  className="w-full p-2 border border-gray-300 rounded dark:bg-gray-700 dark:border-gray-600"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  required
                />
                <button
                  type="button"
                  className="absolute right-2 top-2"
                  onClick={() => setShowNewPassword(!showNewPassword)}
                >
                  {showNewPassword ? <AiFillEyeInvisible /> : <AiFillEye />}
                </button>
              </div>
              {error?.newPasswordLength && <p className="mb-4  text-red-500">{error.newPasswordLength}</p>}
            </div>
            <div className="mb-6">
              <label className="block mb-2">Confirmer le nouveau mot de passe</label>
              <div className="relative">
                <input
                  type={showConfirmPassword ? 'text' : 'password'}
                  className="w-full p-2 border border-gray-300 rounded dark:bg-gray-700 dark:border-gray-600"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                />
                <button
                  type="button"
                  className="absolute right-2 top-2"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                >
                  {showConfirmPassword ? <AiFillEyeInvisible /> : <AiFillEye />}
                </button>
              </div>
              {error?.confirmPasswordError && <p className="mb-4 text-red-500">{error.confirmPasswordError}</p>}
            </div>
            <button
              type="submit"
              className="w-full bg-blue-500 hover:bg-blue-600 text-white py-2 rounded transition duration-200"
            >
              Modifier le mot de passe
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default UpdatePassword;