
import all_categories from "../../assets/catgory";
import all_product from "../../assets/all_product";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./index.css";


function index() {

    const settings = {
        className: "center",
        infinite: true,
        centerPadding: "60px",
        slidesToShow: 6,
        swipeToSlide: true,
        nextArrow: <SampleNextArrow />,
        prevArrow: <SamplePrevArrow />,
        appendDots: dots => (
            <div className="overflow-hidden">
              <ul className="flex justify-center whitespace-nowrap overflow-hidden"> {dots} </ul>
            </div>
          ),
        afterChange: function(index) {
          console.log(
            `Slider Changed to: ${index + 1}, background: #222; color: #bada55`
          );
        },
        responsive: [
            {
              breakpoint: 1650,
              settings: {
                slidesToShow: 5,
                infinite: true,
                
              }
            },
            {
              breakpoint: 1350,
              settings: {
                slidesToShow: 4,
              }
            },
            {
              breakpoint: 1150,
              settings: {
                slidesToShow: 3,
              }
            },
            {
                breakpoint: 950,
                settings: {
                  slidesToShow: 2,
                  arrows: false,
                  dots:true
                }
            },
            {
                breakpoint: 650,
                settings: {
                  slidesToShow: 1,
                  slidesToScroll: 1,
                  arrows: false,
                  dots:true
                }
            },
            
          ]
      };

    return (
        all_categories.map(cat =>
            <>
                <div key={cat} className="mb-3">
                    <h1 className="text-xl font-semibold">{cat}</h1>
                </div>
                <div className="mb-10">
                    {
                        <Slider {...settings}>
                            {all_product.filter(product => product.category == cat).map(prd =>

                                <div key={prd.id} className="rounded-lg border border-orange-700 py-4 px-4">
                                    <img src={prd.image} alt="" className="rounded-lg m-auto w-40 h-40" />
                                    <div className="text-sm text-gray-700 whitespace-normal mt-4 mb-8 text-center max-h-16 overflow-hidden overflow-ellipsis">
                                        {prd.description}
                                    </div>
                                    <div className="flex items-center justify-between">
                                        <div className="flex flex-col">
                                            <div className="text-gray-400">
                                                <span>Ancien prix:</span><span className="line-through"> {prd.old_price}</span>
                                            </div>

                                            <span className="font-semibold text-lg text-gray-900">{prd.new_price} FCFA</span>
                                        </div>
                                        <div className="w-12 h-12 rounded-full bg-orange-600 hover:bg-orange-700 flex items-center justify-center relative">
                                            <span className="text-lg absolute top-2 left-0 text-white"><ion-icon name="add-outline"></ion-icon></span>
                                            <div className="w-5 h-5">
                                                <span className="text-2xl text-white"><ion-icon name="cart-outline"></ion-icon></span>
                                            </div>


                                        </div>
                                    </div>
                                </div>

                            )
                            }
                        </Slider>
                    }
                </div>
            </>

        )
    )
}

const SampleNextArrow = (props) => {
    const { className, style, onClick } = props;
    return (
      <div
        className={`${className} hidden md:hidden`} // Hide on small screens, show on medium and larger
        style={{ ...style, display: "block", background: "black" }}
        onClick={onClick}
      />
    );
  };
  
  const SamplePrevArrow = (props) => {
    const { className, style, onClick } = props;
    return (
      <div
        className={`${className} hidden md:hidden`} // Hide on small screens, show on medium and larger
        style={{ ...style, display: "block", background: "black" }}
        onClick={onClick}
      />
    );
  };

export default index