import React, { useState, useEffect } from 'react';
import { useTheme } from '../../../context/ThemeContext';
import { CgDanger } from "react-icons/cg";

const DeleteRoleModal = ({ show, currentUserId, onDelete, onClose }) => {
  const [formUser, setFormUser] = useState({ id: null, name: '', email: '' });

  const {theme} = useTheme()

  const handleSubmit = () => {
    onDelete(currentUserId);
  };

  if (!show) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 px-5 flex justify-center items-center">
      <div className={`${theme === 'dark' ? 'bg-gray-700' : 'bg-white'} w-550px p-4 rounded`}>
        <div className='flex items-center flex-col'>
            <di className='mb-6 text-red-500 text-6xl'><CgDanger /></di>
            <p className='text-gray-500 mb-6 text-lg md:text-xl text-center'>Etes-vous sûr de vouloir supprimer <br/> cet utilisateur ?</p>
        </div>
        <div className="flex items-center justify-center">
          <button className="bg-gray-500 text-white px-4 py-2 mr-2 rounded-md" onClick={onClose}>Anuller</button>
          <button className="bg-red-500 text-white px-4 py-2 rounded-md" onClick={handleSubmit}>Oui</button>
        </div>
      </div>
    </div>
  );
};

export default DeleteRoleModal;
