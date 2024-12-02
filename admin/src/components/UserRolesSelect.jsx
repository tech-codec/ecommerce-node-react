
import { FaChevronDown } from 'react-icons/fa';
import React, { useState, useRef, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { selectedROlejoin } from '../utils/selectedRoles.js'

const UserRolesSelect = ({ selectedRoles, onChange, error }) => {
  const rolesState = useSelector(state => state.roles)
  const [isOpen, setIsOpen] = useState(false);
  const selectRef = useRef(null);
  const [rolesSelected, setROleSelected] = useState("")

  const toggleOpen = () => setIsOpen(!isOpen);

  const handleRolesChange = (role) => {
    const updatedRoles = selectedRoles.includes(role)
      ? selectedRoles.filter(r => r !== role)
      : [...selectedRoles, role];
    onChange(updatedRoles);
  };

  const handleClickOutside = (event) => {
    if (selectRef.current && !selectRef.current.contains(event.target)) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
    
  }, []);

  return (
    rolesState.rolesData
    &&
    <div ref={selectRef} className="relative mb-4">
      <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="roles">
        Rôles
      </label>
      <div
        className={`shadow flex items-center border ${error?.rolesError && "border-red-500"} justify-between rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline cursor-pointer`}
        onClick={toggleOpen}
      >
        <span>{selectedRoles.length > 0 ? selectedROlejoin(selectedRoles, rolesState.rolesData) : 'Sélectionner les rôles'}</span>
        <span><FaChevronDown /></span>
      </div>
      {error?.rolesError != "" && <p className="text-red-500 text-xs italic">{error?.rolesError}</p>}

      {isOpen && (
        <div className="absolute z-10 mt-1 w-full bg-white shadow-lg rounded">
          {rolesState.rolesData.map((role) => (
            <div
              key={role._id}
              className="px-4 py-2 hover:bg-gray-200 cursor-pointer"
              onClick={() => handleRolesChange(role._id)}
            >
              <input
                type="checkbox"
                checked={selectedRoles.includes(role._id)}
                onChange={() => handleRolesChange(role._id)}
                className="mr-2"
              />
              {role.name}
            </div>
          ))}
        </div>
      )}
    </div>

  );
};

export default UserRolesSelect;


