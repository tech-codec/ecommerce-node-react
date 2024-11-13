import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { login } from '../../actions/authAction/auth.action'
import LoadingLoader from '../LoadingLoader'
import { Link } from 'react-router-dom'

function LogSignIn() {

  const auth = useSelector(state => state.auth)

  const dispatch = useDispatch()

  const {success, error, loading} = auth

  // const success = JSON.parse(auth.success)
  // const error = JSON.parse(auth.error)


  const [formData, setFormData] = useState({
    email: "",
    password: ""
  })

  const { email, password } = formData

  const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value })

  const onSubmit = e => {
    e.preventDefault()
    dispatch(login({ email, password }))
  }

  return (
    <div className='w-full lg:w-9/12 xl:w-3/5 bg-white mx-auto py-8 md:p-8 my-5p'>
      {success?.message?.includes("Connexion réussie") &&
        <div className='px-3 md:px-8'>
          <div className='w-full text-white font-semibold px-4 py-9 bg-green-500 flex items-center justify-center '>
            <span>{success.message}</span>
          </div>
        </div>
      }
      {error?.error.includes("activer") &&
        <div className='px-3 md:px-8'>
          <div className='w-full text-white font-semibold px-4 py-5 bg-red-600 flex items-center justify-center '>
            <span>{error?.error.includes("activer") && error?.error}</span>
          </div>
        </div>
      }
      {
        loading &&
        <div className='px-3 md:px-8 flex items-center justify-center'>
          <LoadingLoader />
        </div>

      }
      <form className="bg-white shadow-md rounded px-3 md:px-8 pt-6 pb-8 mb-4" onSubmit={onSubmit}>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
            Email
          </label>
          <input type="email" name='email' value={email} onChange={onChange} className={`shadow appearance-none border ${error?.error.includes("email") && 'border-red-500'} rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline`} id="email" placeholder="Entrez votre email" />
          {error?.error.includes("email") && <p className="text-red-500 text-xs italic">{error?.error}</p>}
        </div>
        <div className="mb-6">
          <div className='flex items-center justify-between'>
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
              Mot de passe
            </label>

            <Link to={'/forgot-password'}>
              <a className="inline-block align-baseline font-bold text-sm mb-2 text-blue-500 hover:text-blue-800">
                Mot de passe oublié?
              </a>
            </Link>

          </div>

          <input name='password' value={password} onChange={onChange} className={`shadow n appearance-none border ${error?.error.includes("passe") && 'border-red-500'} rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"`} id="password" type="password" placeholder="Entrez le mot de passe" />
          {error?.error.includes("passe") && <p className="text-red-500 text-xs italic">{error?.error}</p>}
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
          <Link to={'/signUp'}>
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
  )
}

export default LogSignIn