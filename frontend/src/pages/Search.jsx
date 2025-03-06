import { useState, useEffect, useContext } from 'react';
import FilterPanel from '../components/FilterPanel';
import ListProducts from '../components/ListProducts';
import { FilterContext } from '../context/FilterContext';
import Carousel from '../components/Carousel';
import ButtonFilter from '../components/ButtonFilter';
import FilterPanelMobil from '../components/FilterPanelMobil';
import { FaTimes } from 'react-icons/fa';
import { useSelector } from 'react-redux';
import LoadingLoader from '../components/LoadingLoader'

export default function Search({ products, allCategories }) {
  const { filters, setFilters, applyFilters } = useContext(FilterContext);
  const [open, setOpen] = useState(false);
  const query = new URLSearchParams(window.location.search).get('q');
  const [searchKeyWords, setSearchKeyWords] = useState([]);
  const [results, setResults] = useState([]);
  const [lengthProducts, setLengthProducts] = useState(0);
  const productState = useSelector(state => state.products)
  const categorieState = useSelector(state => state.categories)
  const { loading } = productState;

  useEffect(() => {
    const fetchResults = () => {
      const filteredResults = products?.filter(product =>
        product.name.toLowerCase().includes(query.toLowerCase())
      );
      if (filteredResults !== null) {
        setResults(filteredResults);
      } else {
        setResults(products);
      }
    };

    fetchResults();
    fetchKewords(query);
  }, [query, products, allCategories]);

  const fetchKewords = (searchQuery) => {
    if (!searchQuery) return;
    const filteredResults = allCategories
      ?.flatMap(category => category.listMotCle.map(motcle => ({ category: category.name, keyword: motcle.toLowerCase() })))
      .filter(item => item.keyword.includes(searchQuery.toLowerCase()));
    const shuffledResults = filteredResults?.sort(() => 0.5 - Math.random());
    const selectedResults = shuffledResults?.slice(0, 6);
    setSearchKeyWords(selectedResults);
  };

  const listProductsFilters = applyFilters(results, filters);

  useEffect(() => {
    const lengthproduct = () => {
      setLengthProducts(listProductsFilters?.length);
      console.log(listProductsFilters?.length);
    };

    lengthproduct();
  }, [listProductsFilters]);

  return (
    <div className='px-5p md:px-10p mt-5'>
       {
        loading || categorieState.loading?  (
          <div className='px-3  md:px-8 flex items-center flex-col justify-center h-450px md:h-screen'>
            <LoadingLoader />
            <p className='text-xl text-gray-500 text-center mt-3'>Patientez quelques minutes le temps que les données chargent</p>
          </div>
        ) :(
      <>
      <Carousel />
      <p className='text-2xl sm:text-3xl text-gray-500 font-semibold mb-6'>{`${lengthProducts} résultats pour "${query}"`}</p>
      <div onClick={() => setOpen(!open)} className='cursor-pointer'>
        <ButtonFilter />
      </div>
      <div className='flex justify-between gap-2'>
        <FilterPanel filters={filters} setFilters={setFilters} listMotCle={searchKeyWords?.map(listMotCle => listMotCle.keyword)} />
        <ListProducts products={listProductsFilters} />
      </div>

      {/* Mobile phone */}
      <div className={`fixed z-50 flex flex-col justify-between visible_filter:hidden top-0 left-0 w-full h-full bg-white py-5 px-8 duration-500 ${open ? "left-0" : "left-[-100%]"}`}>
        <div>
          <div className='text-2xl mb-3 flex items-center justify-end cursor-pointer'>
            <span onClick={() => setOpen(!open)}><FaTimes /></span>
          </div>
          <FilterPanelMobil filters={filters} setFilters={setFilters} listMotCle={searchKeyWords?.map(listMotCle => listMotCle.keyword)} />
          <button className='shadow-xl w-full block visible_filter:hidden text-gray-700 border relative border-black py-2 rounded-2xl mt-8' onClick={() => setOpen(!open)}>
            <span className='text-xl'>Afficher les résultats</span>
          </button>
        </div>
      </div>
      </>
        )}
    </div>
  );
}