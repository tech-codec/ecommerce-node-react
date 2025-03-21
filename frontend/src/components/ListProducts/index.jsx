import React, { useContext, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { CartContext } from '../../context/CartContext';
import { extractUploads } from '../../utils/help';
import { SearchContext } from '../../context/SearchContext';
import ReactPaginate from 'react-paginate';
import { FaCartPlus, FaPlus } from 'react-icons/fa';
import './ListProducts.css'; 

function ListProducts({ products }) {
  const { addToCart } = useContext(CartContext);
  const apiUrl = import.meta.env.VITE_API_URL;
  const { setQuery } = useContext(SearchContext);

  const [currentPage, setCurrentPage] = useState(0);
  const [itemsPerPage, setItemsPerPage] = useState(12);

  useEffect(() => {
    // Change the number of items per page based on the screen size
    const updateItemsPerPage = () => {
      setItemsPerPage(window.innerWidth < 640 ? 24 : 12); // 640px is a common breakpoint for mobile devices
    };

    // Set the initial value
    updateItemsPerPage();

    // Update the value when the window is resized
    window.addEventListener('resize', updateItemsPerPage);

    // Clean up the event listener on component unmount
    return () => window.removeEventListener('resize', updateItemsPerPage);
  }, []);

  const handleOnClick = (product) => {
    addToCart(product);
  };

  const handleSetKeyword = () => {
    setQuery("");
  };

  // Calculer les produits à afficher pour la page actuelle
  const offset = currentPage * itemsPerPage;
  const currentProducts = products?.slice(offset, offset + itemsPerPage);

  // Calculer le nombre total de pages
  const pageCount = Math.ceil(products?.length / itemsPerPage);

  const handlePageClick = (event) => {
    setCurrentPage(event.selected);
  };

  return (
    <div className="list-products container mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {currentProducts?.map((product) => (
          <div key={product._id} className="rounded-lg border bg-white py-4 px-4 shadow-lg transition-transform transform hover:scale-105">
            <Link to={`/product/${product._id}`} onClick={handleSetKeyword}>
              <img src={`${apiUrl}${extractUploads(product.images[0])}`} alt="" className="rounded-lg m-auto w-40 h-40 cursor-pointer hover:shadow-lg transition-shadow duration-200" />
            </Link>
            <Link to={`/product/${product._id}`} onClick={handleSetKeyword}>
              <div className="text-sm cursor-pointer text-gray-700 whitespace-normal mt-4 mb-8 text-center max-h-16 overflow-hidden overflow-ellipsis">
                {product.description}
              </div>
            </Link>
            <div className="flex items-center justify-between">
              <div className="flex flex-col">
                <div className="text-gray-400">
                  <span>Ancien prix:</span><span className="line-through"> {product.old_price} €</span>
                </div>
                <span className="font-semibold text-lg text-gray-900">{product.new_price} €</span>
              </div>
              <div className="w-12 cursor-pointer h-12 rounded-full bg-orange-500 hover:bg-orange-400 flex items-center justify-center relative" onClick={() => handleOnClick(product)}>
                <div className="w-5 h-5">
                  <span className="text-xl text-white"><FaCartPlus /></span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-6">
        <ReactPaginate
          previousLabel={"< Précédent"}
          nextLabel={"Suivant >"}
          breakLabel={"..."}
          breakClassName={"break-me"}
          pageCount={pageCount}
          marginPagesDisplayed={2}
          pageRangeDisplayed={2}
          onPageChange={handlePageClick}
          containerClassName={"pagination"}
          subContainerClassName={"pages pagination"}
          activeClassName={"active"}
          pageClassName={"page-item"}
          pageLinkClassName={"page-link"}
          previousClassName={"page-item"}
          previousLinkClassName={"page-link"}
          nextClassName={"page-item"}
          nextLinkClassName={"page-link"}
          breakLinkClassName={"page-link"}
        />
      </div>
    </div>
  );
}

export default ListProducts;