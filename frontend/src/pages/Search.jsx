//import { useLocation } from 'react-router-dom';
import { useState, useEffect, useContext } from 'react';

import FilterPanel from '../components/FilterPanel'
import ListProducts from '../components/ListProducts'
import banner from "../assets/banner-3.jpg"
import { FilterContext } from '../context/FilterContext'
import ButtonFilter from '../components/ButtonFilter'
import FilterPanelMobil from '../components/FilterPanelMobil';

export default function Search({ products }) {
    const { filters, setFilters, applyFilters } = useContext(FilterContext)
    const [open, setOpen] = useState(false)

    //const listProductsFilters = applyFilters(products, filters)

    //const location = useLocation();
    const query = new URLSearchParams(window.location.search).get('q');
    //const {results, setResults, query} = useContext(SearchContext)
    const [results, setResults] = useState([]);
    const [lengthProducts, setLengthProducts] = useState(0)

    useEffect(() => {
        const fetchResults = () => {
            const filteredResults = products.filter(product =>
                product.name.toLowerCase().includes(query.toLowerCase())
            );
            setResults(filteredResults);
        };

        fetchResults();
    }, [query, products]);


    const listProductsFilters = applyFilters(results, filters)

    //console.log(listProductsFilters.length)

    useEffect(() => {
        const lengthproduct = () => {
            setLengthProducts(listProductsFilters.length)
            console.log(listProductsFilters.length)
        }

        lengthproduct()

    }, [listProductsFilters])


    return (
        <div className='px-5p md:px-10p mt-5'>
            <div className="w-full mb-6 h-32 banner_670:h-44 banner_890:h-52 visible_filter:h-60 bg-cover bg-no-repeat bg-center" style={{ backgroundImage: `url(${banner})` }} >
            </div>
            <p className='text-2xl sm:text-3xl text-gray-500 font-semibold mb-6'> {`${lengthProducts} résultats pour "${query}" `} </p>
            <div onClick={() => setOpen(!open)} className=' cursor-pointer'>
                <ButtonFilter />
            </div>
            <div className='flex justify-between  gap-2 '>
                <FilterPanel filters={filters} setFilters={setFilters} listMotCle={[]} />
                <ListProducts products={listProductsFilters} />
            </div>

            {/**mobil phone */}
            <div className={` fixed z-50 flex flex-col justify-between  visible_filter:hidden top-0 left-0 w-full h-full bg-white py-5 px-8 duration-500 ${open ? "left-0" : "left-[-100%]"} `}>
                <div className=''>
                    <div className='text-3xl mb-3 flex items-center justify-end cursor-pointer' >
                        <span onClick={() => setOpen(!open)}><ion-icon name="close"></ion-icon></span>
                    </div>
                    <FilterPanelMobil filters={filters} setFilters={setFilters} listMotCle={[]} />
                    <button className='shadow-xl w-full block visible_filter:hidden text-gray-700 border relative border-black py-2 rounded-2xl mt-8' onClick={() => setOpen(!open)}>
                        <span className='text-xl'>Afficher les résulats</span>
                    </button>
                </div>
            </div>

        </div>
    )
}
