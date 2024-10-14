import React, { createContext, useState } from 'react'

const FilterContext = createContext()

function FilterProvider({children}) {

    const [filters, setFilters] = useState(
        {
          minPrice: 0,
          maxPrice: 100000000,
          sortBy: '',
          selectedKeyword:""
          //selectedKeywords:""
        }
      )
    
      const applyFilters = (listProducts, filters) => {
    
        let filteredProducts = listProducts.filter(product => {
          return (
            // (filter.keyword === '' || product.name.toLowerCase().includes(filters.keyword.toLowerCase())) &&
            product.new_price >= filters.minPrice &&
            product.new_price <= filters.maxPrice &&
            //(filters.selectedKeywords.length === 0 ||filters.selectedKeywords.every((keyword) => product.name.includes(keyword)))
            (filters.selectedKeyword === "" || product.name.toLowerCase().includes(filters.selectedKeyword.toLowerCase()))
          );
        });
    
        if (filters.sortBy === 'asc') {
          filteredProducts.sort((a, b) => a.new_price - b.new_price);
        } else if (filters.sortBy === 'desc') {
          filteredProducts.sort((a, b) => b.new_price - a.new_price);
        }
    
    
    
    
        return filteredProducts;
    
      };




    return (
        <FilterContext.Provider value={{filters, setFilters, applyFilters}}>
            {children}
        </FilterContext.Provider>
    )
}

export {FilterContext, FilterProvider}