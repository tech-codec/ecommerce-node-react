import React from 'react'

function index() {
  return (
    <button className='w-full block visible_filter:hidden text-gray-700 border relative border-black py-2 rounded-2xl mb-6'>
        <span className='font-bold text-xl absolute top-3 ' ><ion-icon name="options-outline"></ion-icon></span>
        <span className='ml-6 text-xl'>Filtrer</span>
    </button>
  )
}

export default index