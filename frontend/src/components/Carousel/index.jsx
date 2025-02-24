import { useEffect } from 'react';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import { useSelector } from 'react-redux';
import { extractUploads } from '../../utils/help';

function Index() {


    const categoryState = useSelector(state => state.categories)

    const {categoriesData, loading} = categoryState
    const apiUrl = import.meta.env.VITE_API_URL;

  useEffect(() => {
    // Any additional initialization if necessary
  }, []);

  const responsive = {
    superLargeDesktop: {
      breakpoint: { max: 4000, min: 3000 },
      items: 1
    },
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 1
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 1
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1
    }
  };

  return (
    <div className="relative mb-6 md:mb-8">
        {
            loading
            ?<p>chargement</p>
            : <Carousel
            responsive={responsive}
            infinite={true}
            autoPlay={true}
            autoPlaySpeed={3000}
            keyBoardControl={true}
            containerClass="carousel-container"
            removeArrowOnDeviceType={["tablet", "mobile"]}
            dotListClass="custom-dot-list-style"
            itemClass="carousel-item-padding-40-px"
            showDots={true} // Show dots
            renderDotsOutside={true} // Render dots outside
          >
            {
    
               categoriesData.length > 0 && categoriesData?.map(category=> <div key={category._id} className="w-full mb-6 h-56 banner_670:h-64 banner_890:h-96 visible_filter:h-450px bg-cover bg-no-repeat bg-center" style={{ backgroundImage: `url(${apiUrl + extractUploads(category.image)})` }} />)
            }
           
          </Carousel>
        }
     
    </div>
  );
}

export default Index;
