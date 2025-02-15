import React, { useEffect, useState } from 'react';
import { useTheme } from '../../../context/ThemeContext';
import { RiLockPasswordLine } from 'react-icons/ri';
import { AiFillEye, AiFillEyeInvisible } from 'react-icons/ai';
import { useForm } from 'react-hook-form';

const ResetPasswordUserModal = ({ show, user, onSave, onClose }) => {
  const { theme } = useTheme();
  const { register, handleSubmit, setValue, getValues, formState: { errors } } = useForm();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  useEffect(() => {
    if (user) {
      setValue('_id', user._id || null);
      setValue('password', '');
      setValue('confirmPassword', '');
    }
  }, [user, setValue]);

  const onSubmit = (data) => {
    onSave(data);
    console.log(data);
  };

  if (!show) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-center px-5">
      <div className={`${theme === 'dark' ? 'bg-gray-700' : 'bg-white'} w-550px p-4 rounded`}>
        <h2 className={`mb-4 ${theme === 'dark' ? 'text-white' : 'text-gray-800'} font-semibold`}>
          Réinitialiser le mot de passe
        </h2>
        <form className='text-gray-500' onSubmit={handleSubmit(onSubmit)}>
          <input name='_id' {...register('_id')} className='hidden' />
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2 cursor-pointer">
              <div className='flex items-center gap-1'>
                <span className='text-lg'><RiLockPasswordLine /></span>
                <span>Mot de passe</span>
              </div>
            </label>
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                {...register('password', { required: 'Le mot de passe est requis', minLength: { value: 6, message: 'Le mot de passe doit contenir au moins 6 caractères' } })}
                className={`shadow appearance-none border ${errors.password && 'border-red-500'} rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline`}
                placeholder="Entrez votre nouveau mot de passe"
              />
              <button
                type="button"
                className="absolute right-2 top-2"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <AiFillEyeInvisible /> : <AiFillEye />}
              </button>
            </div>
            {errors.password && <p className="text-red-500 text-xs italic">{errors.password.message}</p>}
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2 cursor-pointer">
              <div className='flex items-center gap-1'>
                <span className='text-lg'><RiLockPasswordLine /></span>
                <span>Confirmez le mot de passe</span>
              </div>
            </label>
            <div className="relative">
              <input
                type={showConfirmPassword ? 'text' : 'password'}
                {...register('confirmPassword', { 
                  required: 'La confirmation du mot de passe est requise',
                  validate: value => value === getValues('password') || 'Les mots de passe ne correspondent pas' 
                })}
                className={`shadow appearance-none border ${errors.confirmPassword && 'border-red-500'} rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline`}
                placeholder="Confirmez votre nouveau mot de passe"
              />
              <button
                type="button"
                className="absolute right-2 top-2"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              >
                {showConfirmPassword ? <AiFillEyeInvisible /> : <AiFillEye />}
              </button>
            </div>
            {errors.confirmPassword && <p className="text-red-500 text-xs italic">{errors.confirmPassword.message}</p>}
          </div>

          <div className="flex justify-end">
            <button type="button" className="bg-gray-500 text-white px-4 py-2 mr-2 rounded-md" onClick={onClose}>Annuler</button>
            <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded-md">Enregistrer</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ResetPasswordUserModal;