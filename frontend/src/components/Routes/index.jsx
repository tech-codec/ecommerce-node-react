import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import Shop from '../../pages/Shop'
import Cart from '../../pages/Cart'
import Product from '../../pages/Product'
import ShopCategory from '../../pages/ShopCategory'
import Navbar from '../Navbar'
import SignUp from '../../pages/SignUp'
import SignIn from '../../pages/SignIn'
import Shearch from "../../pages/Search"
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ForgotPassword from '../../pages/ForgotPassword'
import { useSelector } from 'react-redux'
import CreateCheckOutSuccess from '../../pages/CreateCheckOutSuccess'
import AccountActivation from '../../pages/AccountActivation'

const MyRoutes = () => {
  
  const productState = useSelector(state => state.products)
  const categoryState = useSelector(state => state.categories)

  const {productsData } = productState
  const {categoriesData, loading} = categoryState
  
  return (
    <Router>
      <Navbar/>
      <Routes>
        <Route path="/" element={<Shop/>} />
        {categoriesData?.map(cat=>
          <Route key={cat._id} path={`/${cat.name.toLowerCase()}`} element={<ShopCategory category={cat} banner={cat.image} products ={productsData?.filter(p => p.category === cat._id) } listMotCle ={cat.listMotCle} />} />
        )}
        {/* <Route path="/televisions" element={<ShopCategory category={"television"} />} />
        <Route path="/phones" element={<ShopCategory category={"phone"} />} />
        <Route path="/computers" element={<ShopCategory category={"computer"} />} />
        <Route path="/electro" element={<ShopCategory category={"electro"} />} /> */}
        <Route path='/search' element={<Shearch products={productsData} allCategories = {categoriesData}/>} />
        <Route path="/product" element={<Product/>} >
          <Route path=':productId' element={<Product/>}/>
        </Route>
        <Route path="/cart" element={<Cart/>} />
        <Route path='/checkout-success' element={<CreateCheckOutSuccess/>} />
        <Route path="/signUp" element={<SignUp/>} />
        <Route path="/signIn" element={<SignIn/>} />
        <Route path='/forgot-password' element={<ForgotPassword/>} />
        <Route path="/activate/:token" element={<AccountActivation />} />
        <Route path="*" element={<Navigate to="/" />}  />
        {/*<PrivateRoute exact path="/dashboard" component={Dashboard} />*/}
      </Routes>
      <ToastContainer />
    </Router>
  )
}

export default MyRoutes;
