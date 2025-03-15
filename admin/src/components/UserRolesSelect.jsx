import { FaChevronDown } from 'react-icons/fa';
import { useState, useRef, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { selectedRolejoin } from '../utils/selectedRoles.js';
import { useTheme } from '../context/ThemeContext';

const UserRolesSelect = ({ selectedRoles, onChange, error }) => {
  const rolesState = useSelector(state => state.roles);
  const { theme } = useTheme();
  const [isOpen, setIsOpen] = useState(false);
  const selectRef = useRef(null);
 

  const toggleOpen = () => setIsOpen(!isOpen);

  const handleRolesChange = (role) => {
    const updatedRoles = selectedRoles.includes(role)
      ? selectedRoles?.filter(r => r !== role)
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
    rolesState.rolesData && (
      <div ref={selectRef} className="relative mb-4">
        <label className={`block text-sm font-bold mb-2 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-500'}`} htmlFor="roles">
          Rôles
        </label>
        <div
          className={`shadow flex items-center border ${error?.rolesError && "border-red-500"} justify-between rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline cursor-pointer ${theme === 'dark' ? 'bg-gray-700 text-gray-300' : 'bg-white text-gray-700'}`}
          onClick={toggleOpen}
        >
          <span>{selectedRoles.length > 0 ? selectedRolejoin(selectedRoles, rolesState.rolesData) : 'Sélectionner les rôles'}</span>
          <span><FaChevronDown /></span>
        </div>
        {error?.rolesError !== "" && <p className="text-red-500 text-xs italic">{error?.rolesError}</p>}

        {isOpen && (
          <div className={`absolute z-10 mt-1 w-full shadow-lg rounded ${theme === 'dark' ? 'bg-gray-800' : 'bg-white'}`}>
            {rolesState.rolesData.map((role) => (
              <div
                key={role._id}
                className={`px-4 py-2 cursor-pointer ${theme === 'dark' ? 'hover:bg-gray-700' : 'hover:bg-gray-200'}`}
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
    )
  );
};

export default UserRolesSelect;