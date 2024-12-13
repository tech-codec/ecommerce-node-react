// import React, { useState, useEffect } from 'react';
// import { useTheme } from '../../../context/ThemeContext';
// import { useSelector } from 'react-redux';
// import { RiLockPasswordLine } from 'react-icons/ri';

// const ResetPasswordUserModal = ({ show, user, onSave, onClose }) => {
//   const [formUser, setFormUser] = useState({_id:null, password: '', confirmPassword: ''});

//   const { theme } = useTheme()
//   const userState = useSelector(state => state.user)

//   const {error} = userState

//   const {password, confirmPassword} = formUser


//   useEffect(() => {
//     if (user) {
//       setFormUser({
//         _id:user._id || null,
//         password: user.password || "",
//         confirmPassword: user.confirmPassword || ""
//       });
//     } 
//   }, [user]);

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setFormUser({ ...formUser, [name]: value });
//   };


//   const handleSubmit = () => {
//     onSave(formUser);

//     setTimeout(()=>{
//       if(error?.passwordLength || error?.confirmPasswordError){
      
//         onClose(true)
//       }else{
//         onClose(false)
//       }
//     }, 9000)
    
//     console.log(formUser)
//   };

//   if (!show) return null;

//   return (
//     <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-center px-5">
//       <div className={`${theme === 'dark' ? 'bg-gray-700' : 'bg-white'} w-550px p-4 rounded`}>
//         <h2 className={`mb-4 ${theme === 'dark' ? 'text-white' : 'text-gray-800'} font-semibold`}>Renitialiser le mot de passe</h2>
//         <form className='text-gray-500'>
//           <input name='_id' value={user._id} className='hidden'/>
//         <div className="mb-4">
//             <label className="block text-gray-700 text-sm font-bold mb-2 cursor-pointer" htmlFor="email">
//               <div className='flex items-center gap-1'>
//                 <span className='text-lg'><RiLockPasswordLine /></span>
//                 <span>Mot de passe</span>
//               </div>
              
//             </label>
//             <input type="password" name='password' value={password} onChange={handleInputChange} className={`shadow appearance-none border ${error?.passwordLength && 'border-red-500'} rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline`} id="email" placeholder="Entrez votre nouveau mot de passe" />
//             {error?.passwordLength && <p className="text-red-500 text-xs italic">{error?.passwordLength}</p>}
//           </div>

//           <div className="mb-4">
//             <label className="block text-gray-700 text-sm font-bold mb-2 cursor-pointer" htmlFor="email">
//               <div className='flex items-center gap-1'>
//                 <span className='text-lg'><RiLockPasswordLine /></span>
//                 <span>Mot de passe</span>
//               </div>
              
//             </label>
//             <input type="password" name='confirmPassword' value={confirmPassword} onChange={handleInputChange} className={`shadow appearance-none border ${error?.confirmPasswordError && 'border-red-500'} rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline`} id="email" placeholder="Entrez votre nouveau mot de passe" />
//             {error?.confirmPasswordError && <p className="text-red-500 text-xs italic">{error?.confirmPasswordError}</p>}
//           </div>

//         </form>
//         <div className="flex justify-end">
//           <button className="bg-gray-500 text-white px-4 py-2 mr-2 rounded-md" onClick={()=>onClose(false)}>Annuler</button>
//           <button className="bg-blue-500 text-white px-4 py-2 rounded-md" onClick={handleSubmit}>Enregistrer</button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ResetPasswordUserModal;


import React, { useEffect } from 'react';
import { useTheme } from '../../../context/ThemeContext';
import { RiLockPasswordLine } from 'react-icons/ri';
import { useForm, useFormContext } from 'react-hook-form';

const ResetPasswordUserModal = ({ show, user, onSave, onClose }) => {
  const { theme } = useTheme();

  const { register, handleSubmit, setValue, getValues, formState: { errors } } = useForm();

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
          Renitialiser le mot de passe
        </h2>
        <form className='text-gray-500' onSubmit={handleSubmit(onSubmit)}>
          <input name='_id' {...register('_id')} className='hidden' />
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2 cursor-pointer" htmlFor="password">
              <div className='flex items-center gap-1'>
                <span className='text-lg'><RiLockPasswordLine /></span>
                <span>Mot de passe</span>
              </div>
            </label>
            <input
              type="password"
              name='password'
              {...register('password', { required: 'Le mot de passe est requis', minLength: { value: 6, message: 'Le mot de passe doit contenir au moins 6 caractères' } })}
              className={`shadow appearance-none border ${errors.password && 'border-red-500'} rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline`}
              placeholder="Entrez votre nouveau mot de passe"
            />
            {errors.password && <p className="text-red-500 text-xs italic">{errors.password.message}</p>}
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2 cursor-pointer" htmlFor="confirmPassword">
              <div className='flex items-center gap-1'>
                <span className='text-lg'><RiLockPasswordLine /></span>
                <span>Confirmez le mot de passe</span>
              </div>
            </label>
            <input
              type="password"
              name='confirmPassword'
              {...register('confirmPassword', { 
                required: 'La confirmation du mot de passe est requise',
                validate: value => value === getValues('password') || 'Les mots de passe ne correspondent pas' 
              })}
              className={`shadow appearance-none border ${errors.confirmPassword && 'border-red-500'} rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline`}
              placeholder="Confirmez votre nouveau mot de passe"
            />
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
