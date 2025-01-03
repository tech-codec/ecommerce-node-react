import { useEffect } from "react";
import { Carousel, initTWE } from "tw-elements";
import banner_1 from '../../assets/banner-1.jpg'
import banner_3 from '../../assets/banner-3.jpg'
import banner_4 from '../../assets/banniere-vente-ordinateur.avif'

function Index() {

    useEffect(() => {
        initTWE({ Carousel });
      }, []);
    
    return (
        <div
            id="carouselExampleControls"
            className="relative mb-10 rousel-height-1:mb-10"
            data-twe-carousel-init
            data-twe-ride="carousel">
            <div
                className="relative h-24 sm:h-40 lg:h-52 rousel-height-1:h-64 w-full overflow-hidden after:clear-both after:block after:content-['']">
                <div
                    className="relative float-left -mr-[100%] w-full transition-transform duration-[600ms] ease-in-out motion-reduce:transition-none"
                    data-twe-carousel-item
                    data-twe-carousel-active>
                    <img
                        src={banner_1}
                        className="block w-full"
                        alt="Wild Landscape" />
                        
                </div>
                
                <div
                    className="relative float-left -mr-[100%] hidden w-full transition-transform duration-[600ms] ease-in-out motion-reduce:transition-none"
                    data-twe-carousel-item>
                    <img
                        src={banner_3}
                        className="block w-full"
                        alt="Camera" />
                </div>
                
                <div
                    className="relative float-left -mr-[100%] hidden w-full transition-transform duration-[600ms] ease-in-out motion-reduce:transition-none"
                    data-twe-carousel-item>
                    <img
                        src={banner_4}
                        className="block w-full"
                        alt="Exotic Fruits" />
                </div>
            </div>

            
            <button
                className="absolute bottom-0 left-0 top-0 z-[1] flex w-[15%] items-center justify-center border-0 bg-none p-0 text-center text-white opacity-50 transition-opacity duration-150 ease-[cubic-bezier(0.25,0.1,0.25,1.0)] hover:text-white hover:no-underline hover:opacity-90 hover:outline-none focus:text-white focus:no-underline focus:opacity-90 focus:outline-none motion-reduce:transition-none"
                type="button"
                data-twe-target="#carouselExampleControls"
                data-twe-slide="prev">
                <span className="inline-block h-8 w-8">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth="1.5"
                        stroke="currentColor"
                        className="h-6 w-6">
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M15.75 19.5L8.25 12l7.5-7.5" />
                    </svg>
                </span>
                <span className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]"> Previous</span>
            </button>
            
            <button
                className="absolute bottom-0 right-0 top-0 z-[1] flex w-[15%] items-center justify-center border-0 bg-none p-0 text-center text-white opacity-50 transition-opacity duration-150 ease-[cubic-bezier(0.25,0.1,0.25,1.0)] hover:text-white hover:no-underline hover:opacity-90 hover:outline-none focus:text-white focus:no-underline focus:opacity-90 focus:outline-none motion-reduce:transition-none"
                type="button"
                data-twe-target="#carouselExampleControls"
                data-twe-slide="next">
                <span className="inline-block h-8 w-8">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth="1.5"
                        stroke="currentColor"
                        className="h-6 w-6">
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M8.25 4.5l7.5 7.5-7.5 7.5" />
                    </svg>
                </span>
                <span
                    className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]">Next</span>
            </button>
        </div>
    )
}

export default Index