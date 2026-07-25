import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../Context/Context';

function Checkout() {
  const navigate = useNavigate();
  const { cart, getTotal, clearCart } = useCart();
  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    paymentMethod: 'cash'
  });

  const SHIPPING_COST = 4;
  const subtotal = getTotal();
  const total = subtotal + SHIPPING_COST;

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    const orderDetails = {
      customer: {
        name: form.name,
        email: form.email,
        phone: form.phone,
        address: `${form.address}, ${form.city}`
      },
      items: cart.map(item => ({
        name: item.name,
        quantity: item.quantity,
        price: item.price,
        subtotal: (item.price * item.quantity).toFixed(2)
      })),
      subtotal: subtotal.toFixed(2),
      shipping: SHIPPING_COST.toFixed(2),
      total: total.toFixed(2),
      paymentMethod: form.paymentMethod === 'cash' ? 'Cash on Delivery' : 'Card Payment',
      orderDate: new Date().toLocaleString()
    };

    alert(
      `ORDER CONFIRMED\n\n` +
      `Customer: ${orderDetails.customer.name}\n` +
      `Email: ${orderDetails.customer.email}\n` +
      `Phone: ${orderDetails.customer.phone}\n` +
      `Address: ${orderDetails.customer.address}\n\n` +
      `Items:\n${orderDetails.items.map(item => 
        `  - ${item.name} x${item.quantity} = $${item.subtotal}`
      ).join('\n')}\n\n` +
      `Subtotal: $${orderDetails.subtotal}\n` +
      `Shipping: $${orderDetails.shipping}\n` +
      `Payment: ${orderDetails.paymentMethod}\n` +
      `----------------------------\n` +
      `TOTAL: $${orderDetails.total}\n\n` +
      `Date: ${orderDetails.orderDate}\n` +
      `Thank you for shopping with PureLux!`
    );

    clearCart();
    navigate('/');
  };

  if (cart.length === 0) {
    return (
      <div className="container text-center py-5">
        <i className="bi bi-bag" style={{ fontSize: '4rem', color: '#c9a87c' }}></i>
        <h3 className="mt-3">Your cart is empty</h3>
        <p className="text-muted">Add some products before checking out.</p>
        <button className="btn btn-dark" onClick={() => navigate('/products')}>
          Browse Collection
        </button>
      </div>
    );
  }

  return (
    <div className="container py-5">
      <h2 className="mb-4" style={{ fontFamily: 'Playfair Display, serif' }}>
        <i className="bi bi-credit-card text-gold me-2"></i>Checkout
      </h2>
      
      <div className="row">
        <div className="col-lg-7">
          <form onSubmit={handleSubmit}>
            <h5 className="mb-3">Shipping Information</h5>
            
            <div className="row">
              <div className="col-md-6 mb-3">
                <label className="form-label">Full Name</label>
                <input
                  type="text"
                  className="form-control"
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  placeholder="Enter Your Name"
                  required
                />
              </div>
              <div className="col-md-6 mb-3">
                <label className="form-label">Email</label>
                <input
                  type="email"
                  className="form-control"
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  placeholder="Name@gmail.com"
                  required
                />
              </div>
            </div>

            <div className="mb-3">
              <label className="form-label">Phone Number</label>
              <input
                type="tel"
                className="form-control"
                name="phone"
                value={form.phone}
                onChange={handleChange}
                placeholder="03 123 456"
                required
              />
            </div>

            <div className="mb-3">
              <label className="form-label">Address</label>
              <input
                type="text"
                className="form-control"
                name="address"
                value={form.address}
                onChange={handleChange}
                placeholder="Street, Building, Floor"
                required
              />
            </div>

            <div className="mb-4">
              <label className="form-label">City</label>
              <input
                type="text"
                className="form-control"
                name="city"
                value={form.city}
                onChange={handleChange}
                placeholder="Beirut, Tripoli, Jounieh, etc."
                required
              />
            </div>

            <h5 className="mb-3">Payment Method</h5>
            <div className="mb-4">
              <div className="d-flex gap-4">
                <div className="form-check">
                  <input
                    className="form-check-input"
                    type="radio"
                    name="paymentMethod"
                    id="cash"
                    value="cash"
                    checked={form.paymentMethod === 'cash'}
                    onChange={handleChange}
                  />
                  <label className="form-check-label" htmlFor="cash">
                    <i className="bi bi-cash me-1"></i> Cash on Delivery
                  </label>
                </div>
                <div className="form-check">
                  <input
                    className="form-check-input"
                    type="radio"
                    name="paymentMethod"
                    id="card"
                    value="card"
                    checked={form.paymentMethod === 'card'}
                    onChange={handleChange}
                  />
                  <label className="form-check-label" htmlFor="card">
                    <i className="bi bi-credit-card me-1"></i> Card Payment
                  </label>
                </div>
              </div>
              <small className="text-muted d-block mt-2">
                {form.paymentMethod === 'cash' 
                  ? 'Pay when your order arrives at your doorstep.' 
                  : 'Secure card payment.'}
              </small>
            </div>

            <button type="submit" className="btn btn-gold w-100 py-2">
              <i className="bi bi-check-circle me-2"></i>Place Order
            </button>
          </form>
        </div>

        <div className="col-lg-5">
          <div className="card">
            <div className="card-body">
              <h5 className="card-title">Order Summary</h5>
              <hr />
              
              {cart.map(item => (
                <div key={item.id} className="d-flex justify-content-between py-2 border-bottom">
                  <span>
                    {item.name} 
                    <small className="text-muted ms-1">x{item.quantity}</small>
                  </span>
                  <span>${(item.price * item.quantity).toFixed(2)}</span>
                </div>
              ))}

              <div className="mt-3">
                <div className="d-flex justify-content-between">
                  <span>Subtotal</span>
                  <span>${subtotal.toFixed(2)}</span>
                </div>
                <div className="d-flex justify-content-between mt-1">
                  <span>
                    <i className="bi bi-truck me-1"></i> Shipping (Lebanon)
                  </span>
                  <span className="text-gold">${SHIPPING_COST.toFixed(2)}</span>
                </div>
                <hr />
                <div className="d-flex justify-content-between fw-bold fs-5">
                  <span>Total</span>
                  <span className="text-gold">${total.toFixed(2)}</span>
                </div>
                <small className="text-muted d-block mt-1">
                  <i className="bi bi-geo-alt me-1"></i> Delivery within 2-5 business days
                </small>
              </div>

              <div className="mt-3 p-2 bg-light">
                <small className="d-block text-center">
                  <i className="bi bi-shield-check text-gold me-1"></i>
                  Secure checkout · 100% authentic products
                </small>
              </div>
            </div>
          </div>

          <div className="card mt-3">
            <div className="card-body">
              <h6 className="mb-2">
                <i className="bi bi-info-circle text-gold me-1"></i> Shipping Info
              </h6>
              <small className="text-muted d-block">
                $4 shipping all over Lebanon
              </small>
              <small className="text-muted d-block">
                Free returns within 10 days
              </small>
              <small className="text-muted d-block">
                Estimated delivery: 2-5 business days
              </small>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Checkout;