import React, { useEffect, createRef, useState } from 'react';
import { useTheme } from '../../../context/ThemeContext';
import UserRolesSelect from '../../UserRolesSelect';
import { LuDownload } from 'react-icons/lu';
import { extractUploads, generatePassword } from '../../../utils/truncateText';
import useWindowSize from '../../../utils/useWindwosSize';
import { useForm } from 'react-hook-form';
import { useSelector } from 'react-redux';

const AddEditUserModal = ({ show, user, onSave, onClose }) => {
  const { register, handleSubmit, setValue, getValues, formState: { errors } } = useForm({
    defaultValues: {
      _id: null,
      name: '',
      firstName: '',
      email: '',
      phoneNumber: '',
      roles: [],
      bio: '',
      image: null,
    }
  });

  const fileInputRef = createRef();
  const userState = useSelector(state => state.user)
  const {usersData} = userState
  const { theme } = useTheme();
  const [localImage, setLocalImage] = useState(null)
  const [locaRoles, setLocalRoles] = useState([])
  const apiUrl = import.meta.env.VITE_API_URL;

  useEffect(() => {
    if (user) {
      setValue('_id', user._id || null);
      setValue('name', user.name || '');
      setValue('firstName', user.firstName || '');
      setValue('phoneNumber', user.phoneNumber || '');
      setValue('email', user.email || '');
      setValue('roles', user.roles || []);
      setValue('bio', user.bio || '');
      setValue('image', user.image || null)
      setLocalRoles(user.roles || [])
      setLocalImage(user.image || null)
    } else {
      setValue('_id', null);
      setValue('name', '');
      setValue('firstName', '');
      setValue('phoneNumber', '');
      setValue('email', '');
      setValue('roles', []);
      setValue('bio', '');
      setValue('image', null)
      setLocalRoles([])
      setLocalImage(null)
    }
  }, [user, setValue]);

  useEffect(() => {
    if (show) {
      setValue('_id', user._id || null);
      setValue('name', user.name || '');
      setValue('firstName', user.firstName || '');
      setValue('phoneNumber', user.phoneNumber || '');
      setValue('email', user.email || '');
      setValue('roles', user.roles || []);
      setValue('bio', user.bio || '');
      setLocalImage(user.image || null)
    }
  }, [show, user, setValue]);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setValue('image', file); // We store the file object here
      setLocalImage(file)
    }
  };

  const handleRolesChange = (roles) => {
    setValue('roles', roles);
    setLocalRoles(roles)
  };

  const onSubmit = (data) => {
    console.log('Form data:', data); // Vérifiez que l'image est bien présente ici

    const userData = new FormData();
    userData.append('_id', data._id);
    userData.append('name', data.name);
    userData.append('firstName', data.firstName);
    userData.append('phoneNumber', data.phoneNumber);
    userData.append('email', data.email);
    userData.append('bio', data.bio);
    userData.append('password', generatePassword(12));
    userData.append('roles', JSON.stringify(data.roles));

    if (data.image instanceof File) {
      userData.append('image', data.image); // On ajoute l'image si c'est un fichier
    } else {
      userData.append('image', data.image);
    }
    onSave(data, userData);
  };

  const handleButtonClick = () => {
    fileInputRef.current.click();
  };

  const isUniqueName = (name) => {

    if(user._id){
      const userExists = usersData.some(
        (u) => u.name === name && u._id !== getValues('_id')
      );
      return !userExists || 'Le nom existe déjà';
    }else{
      const userExists = usersData.some(
        (u) => u.name === name 
      );
      return !userExists || 'Le nom existe déjà';
    }
    
  };

  const isUniqueEmail = (email) => {
    if(user._id){
      const emailExists = usersData.some(
        (u) => u.email === email && u._id !== getValues('_id')
      );
      return !emailExists || 'L\'email existe déjà';
    }else{
      const emailExists = usersData.some(
        (u) => u.email === email
      );
      return !emailExists || 'L\'email existe déjà';
    }
   
  };

  if (!show) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-center px-5">
      <div className={`${theme === 'dark' ? 'bg-gray-700' : 'bg-white'} w-full sm:w-3/5 z-50 400m:p-4 rounded`}>
        <h2 className={`mb-4 px-5 py-2 ${theme === 'dark' ? 'text-white' : 'text-gray-800'} hidden 545bp:block font-semibold`}>{getValues('_id') ? 'Editer l\'utilisateur' : 'Ajouter un utilisateur'}</h2>
        <form className='text-gray-500 flex-wrap-reverse 1400m:flex-nowrap flex justify-between' onSubmit={handleSubmit(onSubmit)}>
          <div className='w-full 1400m:w-2/3 bg-white rounded-xl shadow-sm px-5 py-2 400m:p-5'>
            <input {...register('_id')} type='text' className='hidden' />

            <div className='md:flex items-center justify-between gap-3'>
              <div className="mb-2 400m:mb-4 w-full">
                <label htmlFor="name" className="block">Nom</label>
                <input
                  type="text"
                  name="name"
                  id="name"
                  {...register('name', { 
                    required: 'Le nom est requis', 
                    minLength: { value: 3, message: 'Le nom doit contenir au moins 3 caractères' }, 
                    maxLength: { value: 55, message: 'Le nom ne peut pas dépasser 55 caractères' },
                    validate: isUniqueName
                  })}
                  className={`border p-2 w-full rounded-md bg-gray-200 ${errors.name && 'border-red-500'}`}
                />
                {errors.name && <p className="text-red-500 text-xs italic">{errors.name.message}</p>}
              </div>
              <div className="mb-2 400m:mb-4 w-full">
                <label htmlFor="firstName" className="block">Prénom</label>
                <input
                  type="text"
                  name="firstName"
                  id="firstName"
                  {...register('firstName', {maxLength: { value: 55, message: 'Le prénom ne peut pas dépasser 55 caractères' } })}
                  className={`border p-2 w-full rounded-md bg-gray-200 ${errors.firstName && 'border-red-500'}`}
                />
                {errors.firstName && <p className="text-red-500 text-xs italic">{errors.firstName.message}</p>}
              </div>
            </div>

            <div className='md:flex items-center justify-between gap-3'>
              <div className="mb-2 400m:mb-4 w-full">
                <label htmlFor="email" className="block">Email</label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  {...register('email', { 
                    required: 'L\'email est requis', 
                    pattern: { value: /^\S+@\S+\.\S+$/, message: 'L\'email n\'est pas valide' },
                    validate: isUniqueEmail
                  })}
                  className={`border p-2 w-full rounded-md bg-gray-200 ${errors.email && 'border-red-500'}`}
                />
                {errors.email && <p className="text-red-500 text-xs italic">{errors.email.message}</p>}
              </div>
              <div className="mb-2 400m:mb-4 w-full">
                <label htmlFor="tel" className="block">Numéro de téléphone</label>
                <input
                  type='tel'
                  name="phoneNumber"
                  id="tel"
                  {...register('phoneNumber')}
                  className="border p-2 w-full rounded-md bg-gray-200"
                />
              </div>
            </div>

            <div className="mb-2 400m:mb-4 block 1400m:hidden">
              <label htmlFor="bio" className="block">Photo (png,jpg,jpeg)</label>
              <input
                type='file'
                onChange={handleFileChange}
                className="border p-2 w-full rounded-md bg-gray-200"
              />
            </div>

            <div className="mb-2 400m:mb-4">
              <UserRolesSelect
                selectedRoles={locaRoles}
                onChange={handleRolesChange}
              />
            </div>

            <div className="mb-2 400m:mb-4">
              <label htmlFor="bio" className="block">Bio</label>
              <textarea
                name="bio"
                id="bio"
                {...register('bio', { minLength: { value: 10, message: 'La bio doit contenir au moins 10 caractères' }, maxLength: { value: 1024, message: 'La bio ne peut pas dépasser 1024 caractères' } })}
                className={`border p-2 w-full rounded-md bg-gray-200 ${errors.bio && 'border-red-500'}`}
              ></textarea>
              {errors.bio && <p className="text-red-500 text-xs italic">{errors.bio.message}</p>}
            </div>

            <div className="flex justify-end">
              <button type="button" className="bg-gray-500 text-white px-4 py-2 mr-2 rounded-md" onClick={onClose}>Annuler</button>
              <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded-md">{user._id ? "Mettre à jour":"Enregistrer"} </button>
            </div>

          </div>

          <div className="w-full hidden 1400m:w-1/3 bg-white flex-col rounded-xl shadow-sm p-5 1400m:flex items-center justify-center">
            {localImage && (
              <img
                src={typeof localImage === 'string' ? apiUrl + extractUploads(localImage) : URL.createObjectURL(localImage)}
                alt="Utilisateur"
                className="max-w-full max-h-full object-cover mb-3 h-72"
              />
            )}
            <div onClick={handleButtonClick} className="w-full flex items-center text-gray-500 justify-center flex-col border-2 border-dotted h-52 cursor-pointer border-violet-700">
              <input
                type="file"
                ref={fileInputRef}
                onChange={handleFileChange}
                className="hidden"
              />
              <span>{getValues('image')?.name || ''}</span>
              <span className="text-6xl mb-4 mt-4"><LuDownload /></span>
              <span className="text-lg">png, jpeg, jpg</span>
            </div>
            
          </div>
        </form>

      </div>
    </div>
  );
};

export default AddEditUserModal;






















// import React, { useState, useEffect, createRef } from 'react';
// import { useTheme } from '../../../context/ThemeContext';
// import UserRolesSelect from '../../UserRolesSelect';
// import { LuDownload } from 'react-icons/lu';
// import { extractUploads } from '../../../utils/truncateText';
// import useWindowSize from '../../../utils/useWindwosSize';

// const AddEditUserModal = ({ show, user, onSave, onClose }) => {
//   const [formUser, setFormUser] = useState({ _id: null, name: '', firstName: "", email: '', phoneNumber: "", roles: [], bio: "", image: null });
//   const [fileName, setFileName] = useState(null);
//   const fileInputRef = createRef();
//   const { width, height } = useWindowSize();
//   const { theme } = useTheme();
//   const apiUrl = import.meta.env.VITE_API_URL;

//   useEffect(() => {
//     if (user) {
//       setFormUser({
//         _id: user._id || null,
//         name: user.name || '',
//         firstName: user.firstName || '',
//         phoneNumber: user.phoneNumber || '',
//         email: user.email || '',
//         roles: user.roles || [],
//         bio: user.bio || '',
//         image: user.image || null
//       });
//     } else {
//       setFormUser({ _id: null, name: '', firstName: "", phoneNumber: "", email: '', roles: [], bio: "", image: null });
//     }
//   }, [user]);
  

//   useEffect(()=>{
//     if(show){
//       setFormUser(prevUser=>({
//         ...prevUser,
//         image: user.image
//       }))
//     }
//   },[show,user])

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setFormUser({ ...formUser, [name]: value });
//   };

//   const handleFileChange = (event) => {
//     const file = event.target.files[0];
//     if (file) {
//       setFormUser(prevState => ({
//         ...prevState,
//         image: file, // We store the file object here
//       }));
//       setFileName(file.name);
//     }
//   };

//   const handleRolesChange = (roles) => {
//     setFormUser((prevFormUser) => ({ ...prevFormUser, roles }));
//   };


//   const handleSubmit = () => {
//     console.log('Form data:', formUser); // Vérifiez que l'image est bien présente ici

//     const userData = new FormData();
//     userData.append('_id', formUser._id);
//     userData.append('name', formUser.name);
//     userData.append('firstName', formUser.firstName);
//     userData.append('phoneNumber', formUser.phoneNumber);
//     userData.append('email', formUser.email);
//     userData.append('bio', formUser.bio);
//     userData.append('roles', JSON.stringify(formUser.roles));

//     // Vérifiez ici si l'image est bien ajoutée au FormData
//     if (formUser.image instanceof File) {
//       userData.append('image', formUser.image); // On ajoute l'image si c'est un fichier
//     } else {
//       userData.append('image', formUser.image);
//     }
//     //const userDataObj = formDataToObject(userData);
//     onSave(formUser, userData);
//   };


//   const handleButtonClick = () => {
//     fileInputRef.current.click();
//   };

//   const handleRemoveImage = () => {
//     setFormUser(prevState => ({
//       ...prevState,
//       image: null
//     }));
//     setFileName(null);
//   };

//   if (!show) return null;

//   return (
//     <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-center px-5">
//       <div className={`${theme === 'dark' ? 'bg-gray-700' : 'bg-white'} w-full sm:w-3/5 z-50 400m:p-4 rounded`}>
//         <h2 className={`mb-4 px-5 py-2 ${theme === 'dark' ? 'text-white' : 'text-gray-800'} hidden 545bp:block font-semibold`}>{formUser._id ? 'Editer l\'utilisateur' : 'Ajouter un utilisateur'}</h2>
//         <form className='text-gray-500 flex-wrap-reverse 1400m:flex-nowrap flex justify-between '>
//           <div className='w-full 1400m:w-2/3 bg-white rounded-xl shadow-sm px-5 py-2 400m:p-5'>
//             <input name='_id' type='text' value={formUser._id} onChange={handleInputChange} className='hidden' />
//             <div className='md:flex items-center justify-between gap-3'>
//               <div className="mb-2 400m:mb-4 w-full">
//                 <label htmlFor="name" className="block">Nom</label>
//                 <input
//                   type="text"
//                   name="name"
//                   id="name"
//                   value={formUser.name}
//                   onChange={handleInputChange}
//                   className="border p-2 w-full rounded-md bg-gray-200"
//                 />
//               </div>
//               <div className="mb-2 400m:mb-4 w-full">
//                 <label htmlFor="firstName" className="block">Prénom</label>
//                 <input
//                   type="text"
//                   name="firstName"
//                   id="firstName"
//                   value={formUser.firstName}
//                   onChange={handleInputChange}
//                   className="border p-2 w-full rounded-md bg-gray-200"
//                 />
//               </div>
//             </div>

//             <div className='md:flex items-center justify-between gap-3'>
//               <div className="mb-2 400m:mb-4 w-full">
//                 <label htmlFor="email" className="block">Email</label>
//                 <input
//                   type="email"
//                   name="email"
//                   id="email"
//                   value={formUser.email}
//                   onChange={handleInputChange}
//                   className="border p-2 w-full rounded-md bg-gray-200"
//                 />
//               </div>
//               <div className="mb-2 400m:mb-4 w-full">
//                 <label htmlFor="tel" className="block">Numéro de téléphone</label>
//                 <input
//                   type='tel'
//                   name="phoneNumber"
//                   id="tel"
//                   value={formUser.phoneNumber}
//                   onChange={handleInputChange}
//                   className="border p-2 w-full rounded-md bg-gray-200"
//                 />
//               </div>
//             </div>

//             <div className="mb-2 400m:mb-4 block 1400m:hidden">
//               <label htmlFor="bio" className="block">Photo (png,jpg,jpeg)</label>
//               <input
//                type='file'
//                 onChange={handleFileChange}
//                 className="border p-2 w-full rounded-md bg-gray-200"
//               />
//             </div>

//             <div className="mb-2 400m:mb-4">
//               <UserRolesSelect
//                 selectedRoles={formUser.roles}
//                 onChange={handleRolesChange}
//               />
//             </div>

//             <div className="mb-2 400m:mb-4">
//               <label htmlFor="bio" className="block">Bio</label>
//               <textarea
//                 name="bio"
//                 id="bio"
//                 value={formUser.bio}
//                 onChange={handleInputChange}
//                 className="border p-2 w-full rounded-md bg-gray-200"
//               ></textarea>
//             </div>

//             <div className="flex justify-end">
//               <button className="bg-gray-500 text-white px-4 py-2 mr-2 rounded-md" onClick={onClose}>Annuler</button>
//               <button className="bg-blue-500 text-white px-4 py-2 rounded-md" onClick={handleSubmit}>Enregistrer</button>
//             </div>

//           </div>

//           <div className="w-full hidden 1400m:w-1/3 bg-white flex-col  rounded-xl shadow-sm p-5 1400m:flex items-center justify-center">
//             {formUser.image && (
//               <img
//                 src={typeof formUser.image === 'string' ? apiUrl + extractUploads(formUser.image) : URL.createObjectURL(formUser.image)}
//                 alt="Utilisateur"
//                 className="max-w-full max-h-full object-cover mb-3 h-72 "
//               />
//             )}
//             <div onClick={handleButtonClick} className="w-full flex items-center text-gray-500 justify-center flex-col border-2 border-dotted h-52 cursor-pointer border-violet-700">
//               <input
//                 type="file"
//                 ref={fileInputRef}
//                 onChange={handleFileChange}
//                 className="hidden"
//               />
//               <span>{fileName}</span>
//               <span className="text-6xl mb-4 mt-4"><LuDownload /></span>
//               <span className="text-lg">png, jpeg, jpg</span>
//             </div>
//             {formUser.image && (
//               <button
//                 type="button"
//                 onClick={handleRemoveImage}
//                 className="mt-4 bg-red-500 text-white px-4 py-2 rounded-md"
//               >
//                 Supprimer l'image
//               </button>
//             )}
//           </div>
//         </form>

//       </div>
//     </div>
//   );
// };

// export default AddEditUserModal;


