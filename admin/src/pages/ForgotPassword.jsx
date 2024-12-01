import React, { useState } from 'react'

import { Link } from 'react-router-dom'


const ForgotPassword = () => {

    const [formData, setFormData] = useState({
        email: ""
    })



    const onChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value })
    }

    

    const onSubmit = (e) => {
        e.preventDefault()
    }

    return (
        <div className='w-full flex items-center h-screen justify-center' onSubmit={onSubmit}>

            <form className='w-full mx-6 md:w-550px bg-white py-5 px-5'>
                <div className='flex w-full text-lg text-center items-center justify-center font-semibold md:text-xl text-gray-500 mb-5'>
                    Saisissez votre adresse email pour réinitialiser votre mot de passe.
                </div>
                <div className='w-full mb-5'>
                    <input name='email' type='email' value={formData.email} onChange={onChange} className={`w-full bg-gray-300 text-gray-500 border border-red-500 mb-1  py-3 px-3 text-lg shadow-lg outline-none rounded-3xl`} placeholder='Entrez votre email' />
                   <p className="text-red-500 text-xs italic">error</p>
                </div>
                <div className='w-full text-white font-semibold items-center justify-center flex'>
                    <Link to={"/login"}>
                        <button className='py-2 px-4 shadow-lg mr-3 bg-orange-700 rounded-3xl'>
                            Se connecter
                        </button>
                    </Link>

                    <button type='submit' className='py-2 px-4 bg-orange-700 shadow-lg rounded-3xl'>
                        Envoyer
                    </button>
                </div>
            </form>

        </div>
    )
}

export default ForgotPassword