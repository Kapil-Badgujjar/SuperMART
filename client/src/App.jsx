import React from 'react'
import { createBrowserRouter, Outlet, RouterProvider } from 'react-router-dom';
import Root from './pages/Root/Root';
import ErrorPage from './pages/Error/ErrorPage';
import HomePage from './pages/Home/HomePage';
import Categories from './pages/Categories/Categories';
import Category from './pages/Category/Category';
import Products from './pages/Products/Products';
import Search from './pages/Search/Search';
import ProductPage from './pages/ProductPage/ProductPage';
import About from './pages/About/About';
import ProfilePage from './pages/ProfilePage/ProfilePage';
import Login from './pages/Login/Login';
import Signup from './pages/Signup/Signup';
import ForgotPassword from './pages/ForgotPassword/ForgotPassword';
import UpdatePassword from './pages/UpdatePassword/UpdatePassword';
import Favourite from './pages/Favourite/Favourite';
import Orders from './pages/Orders/Orders';
import SellerHome from './pages/Seller/Home';
import SellerDashboard from './pages/Seller/Dashboard';
import Admin from './pages/Admin/Admin';
import AddProducts from './pages/Seller/AddProduct';
import SellerLogin from './pages/Login/SellerLogin';
import SellerUpdatePassword from './pages/UpdatePassword/SellerUpdatePassword';
import SellerForgotPassword from './pages/ForgotPassword/SellerForgotPassword';
import SellerRegister from './pages/Signup/SellerRegister';
import AdminLogin from './pages/Admin/AdminLogin';
import SellersTable from './pages/Admin/SellersTable';
import AllProducts from './pages/Seller/AllProducts';
import SellerPage from './pages/Seller/SellerPage';
import './App.css'
import Checkout from './pages/Checkout/Checkout';
import SuccessPage from './pages/Orders/SuccessPage';
import FailedOrder from './pages/Orders/FailedOrder';
import AccountVerifed from './pages/Home/AccountVerified';
const router = createBrowserRouter([
  {
    path: '/',
    element: <Root />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: 'home',
        element: <HomePage />,
      },
      {
        path: 'login',
        element: <Login />,
      },
      {
        path: 'signup',
        element: <Signup />,
      },
      {
        path: 'forgot-password',
        element: <ForgotPassword />,
      },
      {
        path: 'update-password/:token',
        element: <UpdatePassword />,
      },
      {
        path: 'user-profile',
        element: <ProfilePage />,
      },
      {
        path: 'favourite',
        element: <Favourite />,
      },
      {
        path: 'orders',
        element: <Orders />,
      },
      {
        path: 'categories',
        element: <Categories />,
      },
      {
        path: 'category/:category',
        element: <Category />,
      },
      {
        path: 'products',
        element: <Products />,
      },
      {
        path: 'product/:id',
        element: <ProductPage />,
      },
      {
        path: 'search',
        element: <Search />
      },
      {
        path: 'about',
        element: <About />
      },
      {
        path: 'checkout',
        element: <Checkout />
      }
    ]
  },
  {
    path: '/sellers',
    element: <SellerPage />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: 'login',
        element: <SellerLogin />
      },
      {
        path: 'Register',
        element: <SellerRegister />
      },
      {
        path: 'forgot-password',
        element: <SellerForgotPassword />
      },
      {
        path: 'update-password',
        element: <SellerUpdatePassword />
      },
      {
        path: 'seller-account',
        element: <SellerHome />,
        children: [
          {
            path: 'dashboard',
            element: <SellerDashboard />,
          },
          {
            path: 'add-product',
            element: <AddProducts />
          },
          // {
          //   path: 'update-product/:id',
          //   element: <div>Update Product</div>
          // },
          {
            path: 'orders',
            element: <div>Orders</div>
          },
          {
            path: 'all-products',
            element: <AllProducts />
          }
        ]
      }
    ]
  },
  {
    path: '/admin',
    element: <Outlet />,
    children: [
      {
        path: 'panel',
        element: <Admin />,
        children: [
          {
            path: 'sellers-list',
            element: <SellersTable />
          },
          {
            path: 'products-list',
            element: <div>Products List</div>
          },
          {
            path: 'customers-list',
            element: <div>Customers List</div>
          }
        ]
      },
      {
        path: '',
        element: <AdminLogin />
      }
    ]
  },
  {
    path: 'account-verified',
    element: <AccountVerifed />
  },
  {
    path: 'canceled',
    element: <FailedOrder />
  },
  {
    path: 'success',
    element: <SuccessPage />
  }
])

function App() {
  return (
    <RouterProvider router={router} />
  )
}

export default App