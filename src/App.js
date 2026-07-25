import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { CartProvider } from './Context/Context.js';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Products from './pages/Products';
import ProductDetail from './pages/ProductDetail';
import Cart from './pages/Cart';
import Checkout from './pages/Checkout';
import About from './pages/About';
import Contact from './pages/Contact';


import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import './styles/style.css';
import { products } from './data/products.js';

function App() {
  return (

    <CartProvider>
      <BrowserRouter>
        <Navbar />
        <main style={{ minHeight: '80vh' }}>
          <Routes>
            <Route path="/" exact component={Home} />
            <Route path="/products" exact component={Products} />
            <Route path="/products/:id" exact component={ProductDetail} />
            <Route path="/cart" exact component={Cart} />
            <Route path="/checkout" exact component={Checkout} />
            <Route path="/about" exact component={About} />
            <Route path="/contact" exact component={Contact} />
          </Routes>
        </main>
        <Footer />
      </BrowserRouter>
    </CartProvider>
  );
}

export default App;