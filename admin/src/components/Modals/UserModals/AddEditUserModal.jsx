import React, { useState, useEffect } from 'react';
import { useTheme } from '../../../context/ThemeContext';
import UserRolesSelect from '../../UserRolesSelect';

const AddEditUserModal = ({ show, user, roles, onSave, onClose }) => {
  const [formUser, setFormUser] = useState({ id: null, name: '', email: '', roles: [] });

  const { theme } = useTheme()


  useEffect(() => {
    if (user) {
      setFormUser({
        id: user.id,
        name: user.name,
        email: user.email,
        roles: user.roles || []
      });
    } else {
      setFormUser({ id: null, name: '', email: '', roles: [] });
    }
  }, [user]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormUser({ ...formUser, [name]: value });
  };

  const handleRolesChange = (roles) => {
    setFormUser((prevFormUser) => ({ ...prevFormUser, roles }));
  };


  const handleSubmit = () => {
    onSave(formUser);
  };

  if (!show) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-center px-5">
      <div className={`${theme === 'dark' ? 'bg-gray-700' : 'bg-white'} w-550px p-4 rounded`}>
        <h2 className={`mb-4 ${theme === 'dark' ? 'text-white' : 'text-gray-800'} font-semibold`}>{formUser.id ? 'Editer l\'utilisateur' : 'Ajouter un utilisateur'}</h2>
        <form className='text-gray-500'>
          <div className='md:flex items-center justify-between gap-3'>
            <div className="mb-4">
              <label htmlFor="name" className="block">Nom</label>
              <input
                type="text"
                name="name"
                id="name"
                value={formUser.name}
                onChange={handleInputChange}
                className="border p-2 w-full rounded-md bg-gray-200"
              />
            </div>
            <div className="mb-4">
              <label htmlFor="firstName" className="block">Prénom</label>
              <input
                type="text"
                name="firstName"
                id="firstName"
                value={formUser.name}
                onChange={handleInputChange}
                className="border p-2 w-full rounded-md bg-gray-200"
              />
            </div>
          </div>


          <div className='md:flex items-center justify-between gap-3'>
            <div className="mb-4">
              <label htmlFor="email" className="block">Email</label>
              <input
                type="email"
                name="email"
                id="email"
                value={formUser.email}
                onChange={handleInputChange}
                className="border p-2 w-full rounded-md bg-gray-200"
              />
            </div>
            <div className="mb-4">
              <label htmlFor="tel" className="block">Numéro de téléphone</label>
              <input
                type='tel'
                name="phoneNumber"
                id="tel"
                value={formUser.email}
                onChange={handleInputChange}
                className="border p-2 w-full rounded-md bg-gray-200"
              />
            </div>
          </div>


          <div className="mb-4">
            <label htmlFor="userName" className="block">Nom d'utilisateur</label>
            <input
              type="text"
              name="userName"
              id="userName"
              value={formUser.email}
              onChange={handleInputChange}
              className="border p-2 w-full rounded-md bg-gray-200"
            />
          </div>

          <div className="mb-4">
            <label className="block mb-1">Rôles</label>
            <UserRolesSelect
              roles={roles}
              selectedRoles={formUser.roles}
              onChange={handleRolesChange}
            />
          </div>
        </form>
        <div className="flex justify-end">
          <button className="bg-gray-500 text-white px-4 py-2 mr-2 rounded-md" onClick={onClose}>Annuler</button>
          <button className="bg-blue-500 text-white px-4 py-2 rounded-md" onClick={handleSubmit}>Enregistrer</button>
        </div>
      </div>
    </div>
  );
};

export default AddEditUserModal;
