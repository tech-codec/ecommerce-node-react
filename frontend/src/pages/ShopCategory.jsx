import { useContext, useState } from 'react'
import FilterPanel from "../components/FilterPanel"
import ListProducts from '../components/ListProducts'
import { FilterContext } from '../context/FilterContext'
import ButtonFilter from '../components/ButtonFilter'
import FilterPanelMobil from '../components/FilterPanelMobil'
import { extractUploads } from '../utils/help'
import { FaTimes } from 'react-icons/fa';

export default function ShopCategory({ banner, category, products, listMotCle }) {

  const { filters, setFilters, applyFilters } = useContext(FilterContext)

  const listProductsFilters = applyFilters(products, filters)
  const [open, setOpen] = useState(false)
  const apiUrl = import.meta.env.VITE_API_URL;


  return (
    <div className='px-5p md:px-10p mt-5'>
      <div className="w-full mb-6  h-56 banner_670:h-64 banner_890:h-96 visible_filter:h-450px bg-cover bg-no-repeat bg-center" style={{ backgroundImage: `url(${apiUrl + extractUploads(banner)})` }} >
      </div>
      <div onClick={() => setOpen(!open)} className=' cursor-pointer'>
        <ButtonFilter />
      </div>
      <div className='flex justify-between  gap-2 '>
        <FilterPanel filters={filters} setFilters={setFilters} listMotCle={listMotCle} />
        <ListProducts products={listProductsFilters} />
      </div>

      {/**mobil phone */}
      <div className={` fixed z-50 flex flex-col justify-between  visible_filter:hidden top-0 left-0 w-full h-full bg-white py-5 px-8 duration-500 ${open ? "left-0" : "left-[-100%]"} `}>
        <div className=''>

          <div className='text-2xl mb-3 flex items-center justify-end cursor-pointer'>
            <span onClick={() => setOpen(!open)}><FaTimes /></span>
          </div>

          <FilterPanelMobil filters={filters} setFilters={setFilters} listMotCle={listMotCle} />
          <button className='shadow-xl w-full block visible_filter:hidden text-gray-700 border relative border-black py-2 rounded-2xl mt-8' onClick={() => setOpen(!open)}>
            <span className='text-xl'>Afficher les résulats</span>
          </button>
        </div>
      </div>
    </div>
  )
}
