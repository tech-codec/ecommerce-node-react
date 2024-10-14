import { useContext, useState } from 'react'
import FilterPanel from "../components/FilterPanel"
import ListProducts from '../components/ListProducts'
import { FilterContext } from '../context/FilterContext'
import ButtonFilter from '../components/ButtonFilter'
import FilterPanelMobil from '../components/FilterPanelMobil'

export default function ShopCategory({ banner, category, products, listMotCle }) {

  // const [filters, setFilters] = useState(
  //   {
  //     minPrice: 0,
  //     maxPrice: 100000000,
  //     sortBy: '',
  //     selectedKeyword:""
  //     //selectedKeywords:""
  //   }
  // )

  // const applyFilters = (listProducts, filters) => {

  //   let filteredProducts = listProducts.filter(product => {
  //     return (
  //       // (filter.keyword === '' || product.name.toLowerCase().includes(filters.keyword.toLowerCase())) &&
  //       product.new_price >= filters.minPrice &&
  //       product.new_price <= filters.maxPrice &&
  //       //(filters.selectedKeywords.length === 0 ||filters.selectedKeywords.every((keyword) => product.name.includes(keyword)))
  //       (filters.selectedKeyword === "" || product.name.toLowerCase().includes(filters.selectedKeyword.toLowerCase()))
  //     );
  //   });

  //   if (filters.sortBy === 'asc') {
  //     filteredProducts.sort((a, b) => a.new_price - b.new_price);
  //   } else if (filters.sortBy === 'desc') {
  //     filteredProducts.sort((a, b) => b.new_price - a.new_price);
  //   }




  //   return filteredProducts;

  // };

  const { filters, setFilters, applyFilters } = useContext(FilterContext)

  const listProductsFilters = applyFilters(products, filters)
  const [open, setOpen] = useState(false)


  return (
    <div className='px-5p md:px-10p mt-5'>
      <div className="w-full mb-6 h-32 banner_670:h-44 banner_890:h-52 visible_filter:h-60 bg-cover bg-no-repeat bg-center" style={{ backgroundImage: `url(${banner})` }} >
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
        <div className='text-3xl mb-3 flex items-center justify-end cursor-pointer' >
          <span onClick={() => setOpen(!open)}><ion-icon name="close"></ion-icon></span>
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
