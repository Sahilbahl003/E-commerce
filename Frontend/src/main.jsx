import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import CartContextProvider, { CartContext } from './context/CartContext.jsx'
import useContext from './context/CartContext.jsx';
import ScrollToTop from './components/ui/ScrollToTop.jsx'
import { UserProvider } from './context/UserContext.jsx'
import WishlistContextProvider from './context/WishlistContext.jsx'

createRoot(document.getElementById('root')).render(
  
   <BrowserRouter>
   <UserProvider>
   <CartContextProvider>

   <WishlistContextProvider>
      <ScrollToTop>
        <App/>
      </ScrollToTop>
   </WishlistContextProvider>
   
   
    
   </CartContextProvider>
   </UserProvider> 
    <ToastContainer/>
   </BrowserRouter>
,
)
