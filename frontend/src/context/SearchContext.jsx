import { createContext, useState } from 'react'

const SearchContext = createContext()

function SearchProvider({ children }) {

    const [query, setQuery] = useState('');
    const [results, setResults] = useState([]);


    return (
       <SearchContext.Provider value={{query, setQuery, results, setResults}}>
        {children}
       </SearchContext.Provider>
    )
}

export { SearchContext, SearchProvider }