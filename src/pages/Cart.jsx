import { useNavigate } from 'react-router-dom';
import { useCart } from '../Context/Context.js';
import CartItem from '../components/CartItem';

function Cart() {
  const navigate = useNavigate();
  const { cart, removeFromCart, updateQuantity, getTotal } = useCart();

  const SHIPPING_COST = 4;
  const subtotal = getTotal();
  const total = subtotal + SHIPPING_COST;

  if (cart.length === 0) {
    return (
      <div className="container text-center py-5">
        <i className="bi bi-bag" style={{ fontSize: '4rem', color: '#c9a87c' }}></i>
        <h3 className="mt-3">Your bag is empty</h3>
        <button className="btn btn-dark" onClick={() => navigate('/products')}>Browse Collection</button>
      </div>
    );
  }

  return (
    <div className="container py-5">
      <h2 className="mb-4" style={{ fontFamily: 'Playfair Display, serif' }}>
        <i className="bi bi-bag-check text-gold me-2"></i>Shopping Bag
      </h2>
      
      <div className="row">
        <div className="col-lg-8">
          {cart.map(item => (
            <CartItem
              key={item.id}
              item={item}
              updateQuantity={updateQuantity}
              removeFromCart={removeFromCart}
            />
          ))}
        </div>
        <div className="col-lg-4">
          <div className="card">
            <div className="card-body">
              <h5>Order Summary</h5>
              <hr />
              <div className="d-flex justify-content-between">
                <span>Subtotal</span>
                <span className="fw-bold">${subtotal.toFixed(2)}</span>
              </div>
              <div className="d-flex justify-content-between mt-2">
                <span>Shipping (Lebanon)</span>
                <span className="text-gold">${SHIPPING_COST.toFixed(2)}</span>
              </div>
              <hr />
              <div className="d-flex justify-content-between fs-5 fw-bold">
                <span>Total</span>
                <span className="text-gold">${total.toFixed(2)}</span>
              </div>
              <button className="btn btn-gold w-100 mt-3" onClick={() => navigate('/checkout')}>
                Proceed to Checkout
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Cart;