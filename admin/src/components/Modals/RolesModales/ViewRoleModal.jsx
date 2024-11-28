import React from 'react';
import { useTheme } from '../../../context/ThemeContext';

const ViewRoleModal = ({ show, user, onClose }) => {

  const {theme} = useTheme()

  if (!show) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 px-5 flex justify-center items-center">
      <div className={`${theme === 'dark' ? 'bg-gray-700' : 'bg-white'} w-550px p-4 rounded`}>
        <h2 className={`mb-4 ${theme === 'dark' ? 'text-white' : 'text-gray-800'} font-semibold`}>Visualiser l'utilisateur</h2>
        <p className='mb-2 text-gray-500'><strong>Nom:</strong> {user?.name}</p>
        <p className='mb-2 text-gray-500'><strong>Prénom:</strong> {user?.email}</p>
        <p className='mb-2 text-gray-500'><strong>Email:</strong> {user?.name}</p>
        <p className='mb-2 text-gray-500'><strong>Téléphnone:</strong> {user?.email}</p>
        <p className='mb-2 text-gray-500'><strong>Nom d'utilisateur:</strong> {user?.email}</p>
        <div className="flex justify-end mt-4">
          <button className="bg-gray-500 text-white px-4 py-2" onClick={onClose}>Fermer</button>
        </div>
      </div>
    </div>
  );
};

export default ViewRoleModal;