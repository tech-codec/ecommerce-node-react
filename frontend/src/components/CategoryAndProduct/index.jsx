import { useContext, useState, useEffect } from 'react';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import './CategoryAndProduct.css'; 
import { Link } from 'react-router-dom';
import { CartContext } from '../../context/CartContext';
import { useSelector } from 'react-redux';
import { extractUploads } from '../../utils/help';
import ReactPaginate from 'react-paginate';
import { FaCartPlus, FaPlus } from 'react-icons/fa';

function CategoryAndProduct() {
  const productState = useSelector(state => state.products);
  const categoryState = useSelector(state => state.categories);
  const { productsData } = productState;
  const { categoriesData, loading } = categoryState;
  const { addToCart } = useContext(CartContext);
  const apiUrl = import.meta.env.VITE_API_URL;

  const [currentPage, setCurrentPage] = useState(0);
  const [itemsPerPage, setItemsPerPage] = useState(3);

  useEffect(() => {
    // Change the number of items per page based on the screen size
    const updateItemsPerPage = () => {
      setItemsPerPage(window.innerWidth < 640 ? 24 : 3); // 640px is a common breakpoint for mobile devices
    };

    // Set the initial value
    updateItemsPerPage();

    // Update the value when the window is resized
    window.addEventListener('resize', updateItemsPerPage);

    // Clean up the event listener on component unmount
    return () => window.removeEventListener('resize', updateItemsPerPage);
  }, []);

  const handleOnClick = (value) => {
    addToCart(value);
  };

  const responsive = {
    superLargeDesktop: {
      breakpoint: { max: 4000, min: 3000 },
      items: 5.25
    },
    desktop: {
      breakpoint: { max: 3000, min: 1500 },
      items: 4.25
    },
    laptop: {
      breakpoint: { max: 1500, min: 1024 },
      items: 3.25
    },
    tablet: {
      breakpoint: { max: 1024, min: 640 },
      items: 2.25,
      partialVisibilityGutter: 15
    },
    mobile: {
      breakpoint: { max: 640, min: 0 },
      items: 1.02,
      partialVisibilityGutter: 15
    }
  };

  // Calculer les catégories à afficher pour la page actuelle
  const offset = currentPage * itemsPerPage;
  const currentCategories = categoriesData?.slice(offset, offset + itemsPerPage);

  // Calculer le nombre total de pages
  const pageCount = Math.ceil(categoriesData?.length / itemsPerPage);

  const handlePageClick = (event) => {
    setCurrentPage(event.selected);
  };

  return (
    <div className="category-and-product-container">
      {loading ? (
        <p>chargement</p>
      ) : (
        currentCategories.length > 0 &&
        currentCategories.map((cat) => (
          <div key={cat._id} className="mb-3">
            <h1 className="text-2xl lg:text-3xl font-semibold">{cat.name}</h1>
            <div className="mb-10 relative custom-carousel-container">
              <Carousel
                responsive={responsive}
                infinite={true}
                autoPlay={false}
                keyBoardControl={true}
                containerClass="carousel-container"
                removeArrowOnDeviceType={["tablet", "mobile"]}
                itemClass="carousel-item-padding-40-px custom-carousel-item"
              >
                {productsData?.filter((product) => product.category._id === cat._id)?.length > 0 ? (
                  productsData.filter((product) => product.category._id === cat._id).map((prd) => (
                    <div key={prd._id} className="rounded-lg border bg-white py-4 px-4 shadow-lg transition-transform transform hover:scale-105">
                      <Link to={`/product/${prd._id}`}>
                        <img src={apiUrl + extractUploads(prd.images?.[0])} alt="" className="rounded-lg m-auto w-40 h-40 cursor-pointer hover:shadow-lg transition-shadow duration-200" />
                      </Link>
                      <Link to={`/product/${prd._id}`}>
                        <div className="text-sm cursor-pointer text-gray-700 whitespace-normal mt-4 mb-8 text-center max-h-16 overflow-hidden overflow-ellipsis">
                          {prd.description}
                        </div>
                      </Link>
                      <div className="flex items-center justify-between">
                        <div className="flex flex-col">
                          <div className="text-gray-400">
                            <span>Ancien prix:</span><span className="line-through"> {prd.old_price} €</span>
                          </div>
                          <span className="font-semibold text-lg text-gray-900">{prd.new_price} €</span>
                        </div>
                        <div className="w-12 cursor-pointer h-12 rounded-full bg-orange-500 hover:bg-orange-400 flex items-center justify-center relative" onClick={() => handleOnClick(prd)}>
                          <div className="w-5 h-5">
                            <span className="text-xl text-white"><FaCartPlus /></span>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <p>Aucun produit disponible</p>
                )}
              </Carousel>
              <div className="scrollbar"></div>
            </div>
          </div>
        ))
      )}
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

export default CategoryAndProduct;