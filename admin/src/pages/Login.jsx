import React, { useState } from 'react'
import { MdOutlineMailOutline } from "react-icons/md";
import { RiLockPasswordLine } from 'react-icons/ri';
import { Link } from 'react-router-dom'

function Login() {

  const [formData, setFormData] = useState({
    email: "",
    password: ""
  })

  const { email, password } = formData

  const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value })

  const onSubmit = e => {
    e.preventDefault()
  }

  return (
    <div className='flex items-center h-screen justify-center'>
      <div className='w-full mx-2 299bp:mx-6 lg:w-550px  bg-white  py-8 md:p-8 my-5p'>
        <p className='text-center mx-2 299bp:mx-6 text-lg font-semibold text-gray-800 md:text-2xl'>Connectez vous pour accéder à la page d'administration su site</p>
        <form className="bg-white shadow-md rounded px-3 md:px-8 pt-6 pb-8 mb-4" onSubmit={onSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2 cursor-pointer" htmlFor="email">
              <div className='flex items-center gap-1'>
                <span className='text-lg'><MdOutlineMailOutline /></span>
                <span>Email</span>
              </div>
              
            </label>
            <input type="email" name='email' value={email} onChange={onChange} className={`shadow appearance-none border border-red-500 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline`} id="email" placeholder="Entrez votre email" />
            <p className="text-red-500 text-xs italic">error</p>
          </div>
          <div className="mb-6">
            <div className='flex items-center justify-between'>
              <label className="block text-gray-700 text-sm font-bold mb-2 cursor-pointer" htmlFor="password">
              <div className='flex items-center gap-1'>
                <span className='text-lg'><RiLockPasswordLine /></span>
                <span>Mot de passe</span>
              </div>
              </label>

              <Link to={'/forgot-password'}>
                <a className="inline-block align-baseline font-bold text-sm mb-2 text-blue-500 hover:text-blue-800">
                  Mot de passe oublié?
                </a>
              </Link>

            </div>

            <input name='password' value={password} onChange={onChange} className={`shadow appearance-none border 'border-red-500 rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"`} id="password" type="password" placeholder="Entrez le mot de passe" />
            <p className="text-red-500 text-xs italic">error</p>
          </div>
          <div className='mb-6'>
            <button className="w-full bg-orange-700 hover:bg-orange-800 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="submit">
              Se connecter
            </button>
          </div>
          <div className="flex items-center justify-between">
            <div className="flex items-center mb-4">
              <input id="default-checkbox" type="checkbox" value="" className="hover:cursor-pointer w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
              <label htmlFor="default-checkbox" className="hover:cursor-pointer ms-2 text-sm font-medium text-gray-900 dark:text-gray-300 ">Rester connecté(e)</label>
            </div>
            <Link to={'/register'}>
              <a className="inline-block align-baseline mb-4 font-bold text-sm text-blue-500 hover:text-blue-800">
                créer un compte
              </a>
            </Link>

          </div>
        </form>
        <p className="text-center text-gray-500 text-xs">
          Accéder à votre compte sans avoir à vous authentifier pendant 30 jours.
        </p>
      </div>
    </div>

  )
}

export default Login