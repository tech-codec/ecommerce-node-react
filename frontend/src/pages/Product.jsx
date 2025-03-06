import { useParams } from 'react-router-dom';
import ProductDetail from '../components/ProductDetail'
import ListProductSameCategorie from '../components/ListProductSameCategorie';
import { useSelector } from 'react-redux';
import LoadingLoader from '../components/LoadingLoader'

export default function Product() {
  const { productId } = useParams();
  const productState = useSelector(state => state.products)
  const {productsData, loading} = productState


  const product = productsData?.find(p => p._id === productId);
  
  const categorieState = useSelector(state => state.categories)

  return (

    <div className='px-5p md:px-10p mt-10'>
      {
        loading ||  categorieState.loading?  (
          <div className='px-3  md:px-8 flex items-center flex-col justify-center h-450px md:h-screen'>
            <LoadingLoader />
            <p className='text-xl text-gray-500 text-center mt-3'>Patientez quelques minutes le temps que les données chargent</p>
          </div>
        ) :(
      <>
      <ProductDetail product={product} />
      <h2 className='mt-4 lg:mt-7 mb-6 text-gray-900 text-2xl lg:text-3xl font-semibold'>Produits de la même catégorie</h2>
      <ListProductSameCategorie products={productsData} category={product.category}/>
      </>
        )}
    </div>
  );
}
