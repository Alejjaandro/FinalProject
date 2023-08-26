import './App.css';

import { BrowserRouter, Route, Routes } from 'react-router-dom';

import Home from './pages/Home';
import AboutUs from './pages/AboutUs';
import Contact from './pages/Contact';
import ProductList from './pages/ProductList';
import Product from './pages/Product';
import Register from './pages/Register';
import Login from './pages/Login';
import CategoryProducts from './pages/CategoryProducts';
import ProtectedRoutes from './middleware/ProtectedRoutes';
import Settings from './pages/Settings';
import Cart from './pages/Cart';
import MyProfile from './pages/MyProfile';

// Context Provider
import { AuthProvider } from './context/AuthContext.js';
import { ProductsProvider } from './context/ProductsContext.js';
import { CartProvider } from './context/CartContext.js';
import { UserProvider } from './context/UserContext';

function App() {
  
  return (

    <AuthProvider>
      <ProductsProvider>
        <CartProvider>
          <UserProvider>

            <BrowserRouter>
              <Routes>

                {/* Public Routes */}
                <Route path="/" element={<Home />} />
                <Route path="/about-us" element={<AboutUs />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/products/" element={<ProductList />} />
                <Route path="/products/:category" element={<CategoryProducts />} />
                <Route path="/product/:id" element={<Product />} />
                <Route path="/register" element={<Register />} />
                <Route path="/login" element={<Login />} />

                {/* Users Routes */}
                <Route element={<ProtectedRoutes/>}>
                  <Route path="/my-profile/:userId" element={<MyProfile />} />
                  <Route path="/settings/:userId" element={<Settings />} />
                  <Route path="/cart/:userId" element={<Cart />} />
                </Route>

              </Routes>
            </BrowserRouter>

          </UserProvider>
        </CartProvider>
      </ProductsProvider>
    </AuthProvider>
  );
}

export default App;
