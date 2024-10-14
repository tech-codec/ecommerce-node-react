import { createContext} from 'react'
import all_categories from '../assets/catgory'
import all_product from '../assets/all_product'

const ProductAndCategoryContext = createContext()

function ProductAndCategoryProvider({children}) {

    const allCategoriesContext = all_categories
    const allProductContext = all_product



    return (
        <ProductAndCategoryContext.Provider value={{allCategoriesContext, allProductContext}}>
            {children}
        </ProductAndCategoryContext.Provider>
    )
}


export { ProductAndCategoryContext, ProductAndCategoryProvider }
