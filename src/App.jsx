import { createBrowserRouter,RouterProvider } from 'react-router-dom'
import Home from './Home'
import NewHome from './NwHome'
import Product from './Product'
import { createContext, useState } from 'react'
import ProductPage from './Productpage'
import Payment from './Payment'
import Offlinepayment from './Offlinepayment'


export const context = createContext([{}, () => {}]);

function App() {

  const [purchase, setPurchase] = useState({ name: '', price: 0, imgSrc: '' });


  
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Home />,
    },
    {
      path: "/home",
      element: <NewHome />,
    },
    {
      path: "/product",
      element: <Product />,
    },
    {
      path: "/productpage",
      element: <ProductPage />,
    },
    {
      path: "/payment",
      element: <Payment />,
    },
    {
      path: "/offlinePayment",
      element: <Offlinepayment />,
    },
  ]);

  return (
    <>
    
    <context.Provider  value={[purchase, setPurchase]}>
<RouterProvider router={router} />
</context.Provider>
    </>
  )
}

export default App
