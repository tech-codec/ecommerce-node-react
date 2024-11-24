import React, { useState } from 'react';

import { FaChevronDown } from "react-icons/fa";

const UserRolesSelect = ({ roles, selectedRoles, onChange }) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleToggle = () => {
    setIsOpen(!isOpen);
  };

  const handleOptionClick = (role) => {
    const newSelectedRoles = selectedRoles.includes(role)
      ? selectedRoles.filter(r => r !== role)
      : [...selectedRoles, role];
    onChange(newSelectedRoles);
  };

  return (
    <div className="w-full">
      <div
        onClick={handleToggle}
        className="border-gray-300 cursor-pointer border p-2 w-full rounded-md bg-gray-200 flex items-center justify-between"
      >
        <span>{selectedRoles.length > 0 ? selectedRoles.join(', ') : 'Selectionnez un ou plussieurs roles'}</span>
        <span><FaChevronDown/></span>
        
      </div>
      {isOpen && (
        <div className="absolute border border-gray-300 rounded-md bg-white w-auto mt-1 z-10 max-h-48 overflow-y-auto shadow-lg">
          {roles.map((role) => (
            <div
              key={role}
              onClick={() => handleOptionClick(role)}
              className={`p-2 cursor-pointer hover:bg-gray-200 ${selectedRoles.includes(role) ? 'bg-blue-100' : ''}`}
            >
              {role}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default UserRolesSelect;
