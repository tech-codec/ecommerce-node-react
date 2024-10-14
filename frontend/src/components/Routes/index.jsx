import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import Shop from '../../pages/Shop'
import Cart from '../../pages/Cart'
import Product from '../../pages/Product'
import ShopCategory from '../../pages/ShopCategory'
import Navbar from '../Navbar'
import SignUp from '../../pages/SignUp'
import SignIn from '../../pages/SignIn'
import { useContext } from 'react'
import { ProductAndCategoryContext } from '../../context/ProductAndCategoryContext'
import Shearch from "../../pages/Search"

const MyRoutes = () => {
  const {allCategoriesContext, allProductContext} = useContext(ProductAndCategoryContext)
  
  return (
    <Router>
      <Navbar/>
      <Routes>
        <Route path="/" element={<Shop/>} />
        {allCategoriesContext.map(cat=>
          <Route key={cat.name} path={`/${cat.name}`} element={<ShopCategory category={cat.name} banner={cat.image} products ={allProductContext.filter(p => p.category == cat.name) } listMotCle ={cat.listMotCle} />} />
        )}
        {/* <Route path="/televisions" element={<ShopCategory category={"television"} />} />
        <Route path="/phones" element={<ShopCategory category={"phone"} />} />
        <Route path="/computers" element={<ShopCategory category={"computer"} />} />
        <Route path="/electro" element={<ShopCategory category={"electro"} />} /> */}
        <Route path='/search' element={<Shearch products={allProductContext}/>} />
        <Route path="/product" element={<Product/>} >
          <Route path=':productId' element={<Product/>}/>
        </Route>
        <Route path="/cart" element={<Cart/>} />
        <Route path="/signUp" element={<SignUp/>} />
        <Route path="/signIn" element={<SignIn/>} />
        <Route path="*" element={<Navigate to="/" />}  />
      </Routes>
    </Router>
  )
}

export default MyRoutes;
