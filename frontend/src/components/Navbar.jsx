import {useState } from 'react'
import logo from '../assets/logo-3.png'
import panier from '../assets/panier.png'
import { Link } from 'react-router-dom'

const Navbar = () => {

  const [open, setOpen] = useState(false)

  return (
    <nav className='sticky py-2 bg-white top-0 z-50 px-5p md:px-10p '>

      <div className='flex justify-between items-center gap-1 height-e:gap-9 flex-wrap'>

        <div className='cursor-pointer flex justify-between items-center gap-4'>
          <div className='cursor-pointer text-3xl sm:text-5xl xl:hidden' onClick={() => setOpen(!open)}>
            <ion-icon name="reorder-three-outline"></ion-icon>
          </div>
          <Link to={"/"}><img src={logo} alt="" className='h-9 sm:w-32 md:w-36 lg:w-44 md:h-12' /></Link>
        </div>

        <div className='h-12 grow flex order-last md-wrap:order-2 justify-between  items-center rounded-3xl px-2 py-4 border-solid border-2 border-indigo-600'>
          <input type="text" className='w-full px-2 py-1 text-lg border-none outline-none bg-transparent' />
          <button className='flex gap-1 px-2 py-1 ml-2 text-sm  justify-between items-center rounded-2xl bg-orange-700 font-semibold'>
            <ion-icon name="search-outline"></ion-icon>
            <span>Rechercher</span>
          </button>
        </div>

        <div className='flex justify-end order-2 gap-4 items-center relative'>

          <div className='hidden xl:flex items-center justify-center cursor-pointer group'>
            <span className='text-3xl font-semibold'><ion-icon name="list-outline"></ion-icon> </span>
            <span className='font-semibold -mt-1'>Toutes les catégories</span>

            <ul className='absolute hidden z-50 top-3/4 left-0 bg-white rounded-xl border-2 py-7 w-full group-hover:block'>

              <Link to={"/clothes"}><li className='w-full p-2 text-center hover:bg-slate-400'>Vertements</li></Link>
              <Link to={"/televisions"}><li className='w-full p-2 text-center hover:bg-slate-400'>Télévisions</li></Link>
              <Link to={"/computers"}><li className='w-full p-2 text-center hover:bg-slate-400'>Ordinateurs</li></Link>
              <Link to={"/phones"}><li className='w-full p-2 text-center hover:bg-slate-400'>Téléphones</li></Link>
              <Link to={"/electro"}><li className='w-full p-2 text-center hover:bg-slate-400'>Électro menagère</li></Link>
            </ul>

          </div>

          <div className='cursor-pointer'>
            <Link to={"/signIn"}>
              <div className='flex items-center hover:underline'>
                <span className='text-xl sm:text-3xl mr-1'><ion-icon name="person-outline"></ion-icon></span>
                <span className='-mt-1'>Se connecter</span>
              </div>
            </Link>
          </div>

          <Link to={"/signUp"}>
            <button className="hidden xl:flex gap-1 px-2 py-1 ml-2 text-sm  justify-between items-center rounded-2xl bg-orange-700 font-semibold"> {`S'inscrire`}</button>
          </Link>

          <div className='h-12 flex items-center cursor-pointer relative font-semibold hover:underline'>
            <Link to={"/cart"}>
              <div className='flex items-center justify-between'>
                <img src={panier} className='w-5 h-5 sm:w-6 sm:h-6' alt="" />
                <span className='hidden xl:block ml-1'>Panier</span>
              </div>

            </Link>
            <span className='absolute text-orange-700 text-xs font-semibold top-0 left-1 sm:left-2'>23</span>

          </div>

        </div>

        {/* mobile phone */}

        <div className={` fixed z-50 flex justify-between xl:hidden cursor-pointer top-0 left-0 w-full h-full bg-white py-10 px-8 duration-500 ${open ? "left-0" : "left-[-100%]"} `}>
          <ul>

            <Link to={"/clothes"}>
              <li className='py-4 px-1' onClick={() => setOpen(!open)}>Vertements</li>
            </Link>
            <Link to={"/televisions"}>
              <li className='py-4 px-1' onClick={() => setOpen(!open)}>Télévisions</li>
            </Link>
            <Link to={"/computers"}>
              <li className='py-4 px-1' onClick={() => setOpen(!open)}>Ordinateurs</li>
            </Link>
            <Link to={"/phones"}>
              <li className='py-4 px-1' onClick={() => setOpen(!open)}>Téléphones</li>
            </Link>
            <Link to={"/electro"}>
              <li className='py-4 px-1' onClick={() => setOpen(!open)}>Électro menagère</li>
            </Link>
            <Link to={"/shop"}>
              <li className='py-4 px-1' onClick={() => setOpen(!open)}>Boutique</li>
            </Link>
          </ul>
          <div className='text-3xl' onClick={() => setOpen(!open)}>
            <ion-icon name="close"></ion-icon>
          </div>
        </div>



      </div>


    </nav>


  )
}

export default Navbar