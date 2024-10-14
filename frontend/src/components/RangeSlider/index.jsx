import React from 'react'
import "./index.css"

const RangeSlider = ({ min, max, value, onChange, label }) => {
    return (
      <div className="mb-4">
        <label className="block text-gray-700 font-bold mb-2">{label}</label>
        <input
          type="range"
          min={min}
          max={max}
          value={value}
          onChange={onChange}
          className="w-full"
        />
        <div className="flex justify-between text-xs text-gray-600">
          <span>{min}</span>
          <span>{value}</span>
          <span>{max}</span>
        </div>
      </div>
    );
  };

export default RangeSlider