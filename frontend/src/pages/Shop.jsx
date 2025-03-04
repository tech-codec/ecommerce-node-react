
import { useSelector } from 'react-redux'
import Carousel from '../components/Carousel'
import CategoryAndProduct from '../components/CategoryAndProduct'

import LoadingLoader from '../components/LoadingLoader'

export default function Shop() {
  const productState = useSelector(state => state.products)
  const { loading } = productState;
  return (
    <div className='px-5p md:px-10p  mt-5'>
      {
        loading ?  (
          <div className='px-3 md:px-8 flex items-center flex-col justify-center h-screen'>
            <LoadingLoader />
          </div>
        ) :(
          <>
            <Carousel/>
            <CategoryAndProduct/>
          </>
          
        )
      }
    
       
    </div>
  )
}
