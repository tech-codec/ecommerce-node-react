import { useContext, useEffect, useState } from 'react';
import logo from '../assets/logo-3.png';
import { Link } from 'react-router-dom';
import { FilterContext } from '../context/FilterContext';
import { CartContext } from '../context/CartContext';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../actions/authAction/auth.action';
import { TiShoppingCart } from "react-icons/ti";
import { LuUserRound } from "react-icons/lu";
import { TfiMenuAlt } from "react-icons/tfi";
import { SearchContext } from '../context/SearchContext';
import { truncateText } from '../utils/help';

const Navbar = () => {
  const [open, setOpen] = useState(false);
  //const [query, setQuery] = useState('');
  const {query, setQuery} = useContext(SearchContext)
  const [searchResults, setSearchResults] = useState([]);
  const auth = useSelector(state => state.auth);
  const dispatch = useDispatch();
  const { getTotalItems } = useContext(CartContext);
  const categoryState = useSelector(state => state.categories);
  const { categoriesData } = categoryState;
  const { filters, setFilters } = useContext(FilterContext);

  const { user } = auth;

  // Réinitialiser les filtres
  const renitialiseFilter = () => {
    setFilters({
      ...filters,
      minPrice: 0,
      maxPrice: 100000000,
      sortBy: '',
      selectedKeyword: ""
    });
    setQuery("");
  };

  // Déconnexion de l'utilisateur
  const onClick = () => {
    dispatch(logout());
  };

  // Gestion de la recherche
  const handleSearch = (e) => {
    e.preventDefault();
    if (query.trim()) {
      window.location.href = `/search?q=${query}`;
      renitialiseFilter();
      saveSearchHistory(query);
    } else {
      window.location.href = '/';
      renitialiseFilter();
      setQuery("");
    }
  };

  // Sauvegarder l'historique de recherche
  const saveSearchHistory = (query) => {
    let searchHistory = JSON.parse(localStorage.getItem('searchHistory')) || [];
    if (!searchHistory.includes(query)) {
      searchHistory.push(query);
      localStorage.setItem('searchHistory', JSON.stringify(searchHistory));
    }
  };

  // Récupérer les résultats de recherche
  const fetchResults = (searchQuery) => {
    if (!searchQuery) return;
    const filteredResults = categoriesData
      ?.flatMap(category => category.listMotCle.map(motcle => ({ category: category.name, keyword: motcle.toLowerCase() })))
      .filter(item => item.keyword.includes(searchQuery.toLowerCase()));
    const shuffledResults = filteredResults?.sort(() => 0.5 - Math.random());
    const selectedResults = shuffledResults?.slice(0, 6);
    setSearchResults(selectedResults);
  };

  // Initialiser `query` avec l'URL
  useEffect(() => {
    const queryFromURL = new URLSearchParams(window.location.search).get('q');
    if (queryFromURL) {
      setQuery(queryFromURL);
      fetchResults(queryFromURL);
    }
  }, []);

  // Récupérer les résultats de recherche lorsque `query` change
  useEffect(() => {
    if (query) {
      fetchResults(query);
    }
  }, [query]);

  const handleSetKeword = ()=>{
    setQuery('')
  }


  // Gestion du clic sur un mot clé de recherche
  const handleKeywordClick = (keyword) => {
    setQuery(keyword);
    setSearchResults([]);
    window.location.href = `/search?q=${keyword}`;
    renitialiseFilter();
  };

  return (
    <nav className='sticky py-2 bg-white top-0 z-50 px-5p md:px-10p '>
      <div className='flex justify-between items-center gap-1 height-e:gap-9'>
        <div className='cursor-pointer flex justify-between items-center gap-4'>
          <div className='hidden sc-1193:block cursor-pointer text-3xl sm:text-5xl xl:hidden' onClick={() => setOpen(!open)}>
            <ion-icon name="reorder-three-outline"></ion-icon>
          </div>
          <Link to={"/"}><img onClick={handleSetKeword} src={logo} alt="" className='h-9 sm:w-32 md:w-36 lg:w-44 md:h-12' /></Link>
        </div>

        <form onSubmit={handleSearch} className='relative hidden sc-1193:flex h-12 grow justify-between items-center rounded-3xl px-2 py-4 border-solid border-2 border-indigo-600'>
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className='w-full px-2 py-1 text-lg border-0 outline-none focus:ring-0 focus:outline-none'
          />
          <button type='submit' className='flex text-white gap-1 px-2 py-1 ml-2 text-sm justify-between items-center rounded-2xl bg-orange-500 hover:bg-orange-400 font-semibold'>
            <ion-icon name="search-outline"></ion-icon>
            <span>Rechercher</span>
          </button>
          {searchResults?.length > 0 && (
          <div className="absolute top-11 w-full left-0 right-0 bg-white shadow-lg z-50 border-solid border-2 border-indigo-600 rounded-3xl">
            <ul>
              {searchResults.map((result) => (
                <li key={result.keyword} className="p-2 border-b">
                  <div className="cursor-pointer px-1 sc-1193:px-2 flex items-center" onClick={() => handleKeywordClick(result.keyword)}>
                    <ion-icon name="search-outline"></ion-icon>
                    <span className='ml-2'>{result.keyword}</span> 
                  </div>
                </li>
              ))}
            </ul>
          </div>
        )}
        </form>
        
        <div className='flex justify-end gap-4 items-center relative'>
          <div className='hidden xl:flex xl:flex-col items-center justify-center cursor-pointer group'>
            <span className='font-semibold text-xl xl:text-2xl'><TfiMenuAlt /></span>
            <span className='font-semibold'>Produits</span>
            <ul className='absolute hidden z-auto top-3/4 left-0 bg-white rounded-xl border-2 py-7 w-full group-hover:block'>
              {categoriesData?.map(cat =>
                <Link key={cat._id} to={`/${cat.name.toLowerCase()}`} onClick={renitialiseFilter}>
                  <li className='w-full p-2 text-center hover:bg-gray-100'>{cat.name}</li>
                </Link>
              )}
            </ul>
          </div>

          {auth.isAuthenticated
            ? <>
              <div className='cursor-pointer'>
                <Link to={"/dashboard"}>
                  <div onClick={handleSetKeword} className='flex flex-col items-center justify-between hover:underline'>
                    <span className='text-xl xl:text-2xl'><LuUserRound /></span>
                    <span className='hidden sm:block '>{user?.name}</span>
                    <span className='block sm:hidden '>{ truncateText(user?.name, 4) }</span>
                  </div>
                </Link>
              </div>
              <button onClick={onClick} className="text-white xl:flex gap-1 px-2 py-1 ml-2 text-sm justify-between items-center rounded-2xl bg-orange-500 hover:bg-orange-400 font-semibold"> {`Se déconnecter`}</button>
            </>
            : <>
              <div className='cursor-pointer'>
                <Link to={"/signIn"}>
                  <div onClick={handleSetKeword} className='flex flex-col justify-between items-center hover:underline'>
                    <span className='text-xl xl:text-2xl'><LuUserRound /></span>
                    <span className='sm:text-sm'>Se connecter</span>
                  </div>
                </Link>
              </div>
              <Link to={"/signUp"}>
                <button onClick={handleSetKeword} className="text-white hidden xl:flex gap-1 px-2 py-1 ml-2 text-sm justify-between items-center rounded-2xl bg-orange-500 hover:bg-orange-400 font-semibold"> {`S'inscrire`}</button>
              </Link>
            </>
          }

          <div className='h-12 flex items-center cursor-pointer relative font-semibold hover:underline'>
            <Link to={"/cart"}>
              <div onClick={handleSetKeword} className='flex flex-col items-center justify-between'>
                <span className='text-xl xl:text-2xl'><TiShoppingCart /></span>
                <span className=''>Panier</span>
              </div>
            </Link>
            <Link to={"/cart"}>
              <span className='absolute w-5 h-5 flex items-center justify-center rounded-full bg-orange-500 hover:bg-orange-400 text-white text-xs font-semibold bottom-5 right-0'>{getTotalItems()}</span>
            </Link>
          </div>
        </div>

        {/* mobile phone */}
        <div className={` fixed z-50 flex justify-between xl:hidden cursor-pointer top-0 left-0 w-full h-full bg-white py-10 px-8 duration-500 ${open ? "left-0" : "left-[-100%]"} `}>
          <ul>
            {categoriesData?.map(cat =>
              <Link key={cat._id} to={`/${cat.name.toLowerCase()}`} onClick={renitialiseFilter}>
                <li className='py-4 px-1' onClick={() => setOpen(!open)}>{cat.name}</li>
              </Link>
            )}
            <Link to={"/shop"}>
              <li className='py-4 px-1' onClick={() =>{
                setOpen(!open)
                handleSetKeword()
                } }>Boutique</li>
            </Link>
          </ul>
          <div className='text-3xl' onClick={() => setOpen(!open)}>
            <ion-icon name="close"></ion-icon>
          </div>
        </div>
      </div>
      <div className='relative flex justify-between items-center gap-9 sc-1193:hidden'>
        <div className='flex relative flex-col items-center justify-center cursor-pointer text-5xl xl:hidden' onClick={() => setOpen(!open)}>
          <span className='mb-4'><ion-icon name="reorder-three-outline"></ion-icon></span>
          <span className='text-sm md:text-base absolute top-10'>Produits</span>
        </div>
        <form onSubmit={handleSearch} className='md:relative h-12 grow flex justify-between items-center rounded-3xl px-2 py-4 border-solid border-2 border-indigo-600'>
          <input type="text" value={query} onChange={(e) => setQuery(e.target.value)} className='w-full px-2 py-1 text-lg border-0 outline-none focus:ring-0 focus:outline-none' />
          <button type='submit' className='hidden md:flex text-white gap-1 px-2 py-1 ml-2 text-sm justify-between items-center rounded-2xl bg-orange-500 hover:bg-orange-400 font-semibold'>
            <ion-icon name="search-outline"></ion-icon>
            <span>Rechercher</span>
          </button>
          <button type='submit' className='flex md:hidden text-gray-500 pr-2 text-2xl'>
            <ion-icon name="search-outline"></ion-icon>
          </button>
          {searchResults?.length > 0 && (
          <div className="absolute top-16 md:top-11 w-full left-0 right-0 bg-white shadow-lg -z-50 border-solid border-2 border-indigo-600 rounded-3xl">
            <ul>
            {searchResults.map((result) => (
                <li key={result.keyword} className="p-2 border-b">
                  <div className="cursor-pointer px-1 sc-1193:px-2 flex items-center" onClick={() => handleKeywordClick(result.keyword)}>
                    <ion-icon name="search-outline"></ion-icon>
                    <span className='ml-2'>{result.keyword}</span> 
                  </div>
                </li>
              ))}
            </ul>
          </div>
        )}
        </form>
      </div>
    </nav>
  );
};

export default Navbar;