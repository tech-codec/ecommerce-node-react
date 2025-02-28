import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import Shop from '../../pages/Shop'
import Cart from '../../pages/Cart'
import Product from '../../pages/Product'
import ShopCategory from '../../pages/ShopCategory'
import Navbar from '../Navbar'
import SignUp from '../../pages/SignUp'
import SignIn from '../../pages/SignIn'
import Search from "../../pages/Search"
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ForgotPassword from '../../pages/ForgotPassword'
import { useSelector } from 'react-redux'
import CreateCheckOutSuccess from '../../pages/CreateCheckOutSuccess'
import AccountActivation from '../../pages/AccountActivation'
import Dashboard from '../../pages/Dashboard'
import Footer from '../Footer'
import ResetPassword from '../../pages/ResetPassword'
import ScrollToTopButton from '../ScrollToTopButton'

const MyRoutes = () => {

  const productState = useSelector(state => state.products)
  const categoryState = useSelector(state => state.categories)

  const { productsData } = productState
  const { categoriesData } = categoryState

  const categories = ["télévision", "vêtement", "ordinateur", "téléphone"]

  return (
    <Router>
      <div className='flex flex-col min-h-screen'>
        <Navbar />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Shop />} />

            {categories.map(cat =>
              <Route
                key={cat}
                path={`/${cat.toLowerCase()}`}
                element={
                  <ShopCategory
                    category={categoriesData?.find(c => c.name.toLowerCase() === cat)}
                    banner={categoriesData?.find(c => c.name.toLowerCase() === cat)?.image}
                    products={productsData?.filter(p => p.category.name.toLowerCase() === cat)}
                    listMotCle={categoriesData?.find(c => c.name.toLowerCase() === cat)?.listMotCle}
                  />
                }
              />
            )}

            <Route path='/search' element={<Search products={productsData} allCategories={categoriesData} />} />
            <Route path="/product" element={<Product />} >
              <Route path=':productId' element={<Product />} />
            </Route>
            <Route path="/cart" element={<Cart />} />
            <Route path='/checkout-success' element={<CreateCheckOutSuccess />} />
            <Route path="/signUp" element={<SignUp />} />
            <Route path="/signIn" element={<SignIn />} />
            <Route path='/dashboard' element={<Dashboard />} />
            <Route path='/forgot-password' element={<ForgotPassword />} />
            <Route path='/reset-password/:token' element={<ResetPassword />} />
            <Route path="/activate/:token" element={<AccountActivation />} />
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </main>
        <Footer />
      </div>
      <ScrollToTopButton/>
      <ToastContainer />
    </Router>
  )
}

export default MyRoutes;