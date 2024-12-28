import React, { Suspense, useEffect } from 'react'

import './index.scss'
import Navbar from './components/Navbar'
import { Navigate, Outlet, Route, Routes, useLocation } from 'react-router-dom'
import PageNotFound from './pages/PageNotFound'
import Footer from './components/Footer'
import { LOAD_AUTH_API, LOAD_CART_API, LOAD_ORDER_API, LOAD_PRODUCT_API, LOAD_USER_API } from './redux/store'
import Protected from './components/Protected'
import AdminProtected from './components/AdminProtected'

const ProductModule = React.lazy(() => import("product/App"))
const CartModule = React.lazy(() => import("cart/App"))
const AuthModule = React.lazy(() => import("auth/App"))
const OrderModule = React.lazy(() => import("order/App"))
const AdminModule = React.lazy(() => import("admin/App"))

const App = () => {

  const location = useLocation()

  useEffect(() => {
    LOAD_PRODUCT_API()
    LOAD_CART_API()
    LOAD_AUTH_API()
    LOAD_USER_API()
    LOAD_ORDER_API()
  }, [location])


  return <>
    <Routes>
      <Route path='/' element={<> <Navbar /> <Outlet />   <Footer /> </>}>
        <Route path="/" element={<Navigate to="product" />} />
        <Route path='/product/*' element={
          <Suspense fallback={<div>Loading...</div>}>
            <ProductModule />
          </Suspense>
        } />

        <Route path='/cart/*' element={
          <Suspense fallback={<div>Loading...</div>}>
            <Protected compo={<CartModule />} />
          </Suspense>
        } />
        <Route path='/order/*' element={
          <Suspense fallback={<div>Loading...</div>}>
            <Protected compo={<OrderModule />} />
          </Suspense>
        } />
      </Route>

      <Route path='/auth/*' element={
        <Suspense fallback={<div>Loading...</div>}>
          <AuthModule />
        </Suspense>
      } />

      <Route path='/admin/*' element={
        <Suspense fallback={<div>Loading...</div>}>
          <AdminProtected compo={<AdminModule />} />
        </Suspense>
      } />
      <Route path='*' element={<PageNotFound />} />
    </Routes>
  </>
}

export default App
