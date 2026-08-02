import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { CartProvider } from './Context/Context';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Products from './pages/Products';
import ProductDetail from './pages/ProductDetail';
import Cart from './pages/Cart';
import Checkout from './pages/Checkout';
import About from './pages/About';
import Contact from './pages/Contact';

import Login from './pages/Auth/Login';
import Register from './pages/Auth/Register';

import AdminLogin from './pages/Admin/AdminLogin';
import AdminDashboard from './pages/Admin/AdminDashboard';
import AdminProducts from './pages/Admin/AdminProducts';
import AdminAddProduct from './pages/Admin/AdminAddProduct';
import AdminEditProduct from './pages/Admin/AdminEditProduct';
import AdminOrders from './pages/Admin/AdminOrders';

import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import './styles/style.css';

function App() {
  return (
    <CartProvider>
      <BrowserRouter>
        <Navbar />
        <main style={{ minHeight: '80vh' }}>
          <Routes>

            <Route path="/" element={<Home />} />
            <Route path="/products" element={<Products />} />
            <Route path="/products/:id" element={<ProductDetail />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/checkout" element={<Checkout />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/admin/login" element={<AdminLogin />} />
            <Route path="/admin/dashboard" element={<AdminDashboard />} />
            <Route path="/admin/products" element={<AdminProducts />} />
            <Route path="/admin/products/add" element={<AdminAddProduct />} />
            <Route path="/admin/products/edit/:id" element={<AdminEditProduct />} />
            <Route path="/admin/orders" element={<AdminOrders />} />
          </Routes>
        </main>
        <Footer />
      </BrowserRouter>
    </CartProvider>
  );
}

export default App;