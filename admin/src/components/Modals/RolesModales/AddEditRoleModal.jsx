import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useTheme } from '../../../context/ThemeContext';
import { useSelector } from 'react-redux';

const AddEditRoleModal = ({ show, role, onSave, onClose }) => {
  const { theme } = useTheme();
  const roleState = useSelector(state => state.roles);
  const { rolesData } = roleState;

  const {
    register,
    handleSubmit,
    setValue,
    getValues,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: ''
    }
  });

  useEffect(() => {
    if (role) {
      setValue('_id', role._id);
      setValue('name', role.name);
    } else {
      setValue('_id', null);
      setValue('name', '');
    }
  }, [role, setValue]);

  useEffect(() => {
    if (show) {
      setValue('_id', role._id);
      setValue('name', role.name || '');
    }
  }, [show, role, setValue]);

  const onSubmit = (data) => {
    onSave(data);
    console.log(data);
  };

  const isUniqueName = (name) => {
    if (role?._id) {
      const roleExists = rolesData.some(
        (r) => r.name === name && r._id !== getValues('_id')
      );
      return !roleExists || 'Le nom existe déjà';
    } else {
      const roleExists = rolesData.some(
        (r) => r.name === name
      );
      return !roleExists || 'Le nom existe déjà';
    }
  };

  if (!show) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-center px-5">
      <div className={`${theme === 'dark' ? 'bg-gray-700' : 'bg-white'} w-550px p-4 rounded`}>
        <h2 className={`mb-4 ${theme === 'dark' ? 'text-white' : 'text-gray-800'} font-semibold`}>
          {role?._id ? 'Editer le rôle' : 'Ajouter un rôle'}
        </h2>
        <form onSubmit={handleSubmit(onSubmit)} className='text-gray-500'>
          <div className='md:flex items-center '>
            <div className="mb-4 w-full">
              <label htmlFor="name" className="block">Nom du rôle</label>
              <input
                type="text"
                name="name"
                id="name"
                {...register('name', {
                  required: 'Le nom du rôle est requis',
                  minLength: {
                    value: 3,
                    message: 'Le nom du rôle doit comporter au moins 3 lettres'
                  },
                  maxLength: {
                    value: 150,
                    message: 'Le nom du rôle ne peut pas dépasser 150 lettres'
                  },
                  validate: isUniqueName
                })}
                className={`border p-2 w-full rounded-md bg-gray-200 ${errors.name ? 'border-red-500' : ''}`}
                placeholder='Entrer le nom du rôle'
              />
              {errors.name && <p className="text-red-500 text-xs italic">{errors.name.message}</p>}
            </div>
          </div>
          <div className="flex justify-end">
            <button type="button" className="bg-gray-500 text-white px-4 py-2 mr-2 rounded-md" onClick={onClose}>Annuler</button>
            <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded-md">{role?._id ? "Mettre à jour":"Enregistrer"} </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddEditRoleModal;