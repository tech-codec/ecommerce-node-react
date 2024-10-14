import React from 'react'

const RadioButton = ({ id, name, value, label, checked, onChange }) => {
    return (
      <div className="flex items-center">
        <input
          id={id}
          name={name}
          type="radio"
          value={value}
          checked={checked}
          onChange={onChange}
          className="hidden"
        />
        <label
          htmlFor={id}
          className="flex items-center cursor-pointer text-gray-700"
        >
          <span
            className={`
              w-4 h-4 inline-block mr-2 rounded-full border border-gray-400
              ${checked ? 'bg-orange-700 border-transparent' : 'bg-white'}
              transition duration-150 ease-in-out
            `}
          ></span>
          {label}
        </label>
      </div>
    );
  };

export default RadioButton