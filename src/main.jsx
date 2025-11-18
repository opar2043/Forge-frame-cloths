import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'

import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import {
  QueryClient,
  QueryClientProvider,  
} from '@tanstack/react-query'
import Root from './Components/Root/Root.jsx';
import Home from './Components/Root/Home.jsx';
import Error from './Components/Root/Error.jsx';
import Login from './Components/Firebase/Login.jsx';
import Register from './Components/Firebase/Register.jsx';
import Wishlist from './Components/Wishlist/Wishlist.jsx';
import Products from './Components/Products/Products.jsx';
import ViewProduct from './Components/Products/ViewProduct.jsx';
import Dashboard from './Components/Dashboard/Admin/Dashboard.jsx';
import AddProducts from './Components/Dashboard/ProductsCollection/AddProducts.jsx';
import EditProduct from './Components/Dashboard/ProductsCollection/EditProduct.jsx';
import AllProducts from './Components/Dashboard/ProductsCollection/AllProducts.jsx';
import Users from './Components/Dashboard/Users/Users.jsx';
import Order from './Components/Dashboard/Order/Order.jsx';
import AllThing from './Components/Dashboard/Admin/AllThing.jsx';
import AuthProvider from './Components/Firebase/AuthProvider.jsx';
import CategoryProduct from './Components/Products/Category/CategoryProduct.jsx';

const queryClient = new QueryClient()

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root></Root>,
    errorElement: <Error></Error>,
    children: [
      {
        path: '/',
        element: <Home></Home>
      },
      {
        path: '/login',
        element: <Login></Login>
      },
      {
        path: '/register',
        element: <Register></Register>
      },
      {
        path: '/wishlist',
        element: <Wishlist></Wishlist>
      },
      {
        path: '/dresses' ,
        element: <Products></Products>
      },
      {
        path: '/view/:id',
        element: <ViewProduct></ViewProduct>
      },
      {
        path: '/dresses/:category',
        element: <CategoryProduct></CategoryProduct>
      },
    ]
  },
{
    path: '/dashboard',
    element: <Dashboard></Dashboard>,
    children: [
    {
      path: "/dashboard",
      element: <AllThing></AllThing>
    },
    {
      path: "/dashboard/add-product",
      element: <AddProducts></AddProducts>
    },
    {
      path: "/dashboard/edit-product/:id",
      element: <EditProduct></EditProduct>
    },
    {
      path: "/dashboard/all-product",
      element: <AllProducts />
    },
    {
      path: "/dashboard/users",
      element: <Users></Users>
    },
    {
      path: "/dashboard/orders",
      element: <Order></Order>
    },
    {
      path: "/dashboard/all-thing",
      element: <AllThing></AllThing>
    },

  ]
  }
]);


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <RouterProvider router={router} />
      </AuthProvider>
    </QueryClientProvider>
  </StrictMode>,
)