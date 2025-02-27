import React from 'react';
import { FaSlidersH } from 'react-icons/fa';

function Index() {
  return (
    <button className='w-full block visible_filter:hidden text-gray-700 border relative border-black py-2 rounded-2xl mb-6'>
      <span className='font-bold text-xl absolute top-3'>
        <FaSlidersH />
      </span>
      <span className='ml-6 text-xl'>Filtrer</span>
    </button>
  );
}

export default Index;