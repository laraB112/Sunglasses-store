// src/pages/Admin/AdminOrders.jsx
import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';

function AdminOrders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('adminToken');
    if (!token) {
      window.location.href = '/admin/login';
      return;
    }

    fetch('http://localhost:8083/orders')
      .then(res => res.json())
      .then(data => {
        setOrders(data);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <div className="container py-5">Loading orders...</div>;
  }

  return (
    <div className="container py-5">
      <h2 className="mb-4">Customer Orders</h2>
       <button 
        className="btn btn-outline-dark btn-sm mb-3"
        onClick={() => navigate('/admin/dashboard')}
      >
        <i className="bi bi-arrow-left me-1"></i>Back 
      </button>

      {orders.length === 0 ? (
        <div className="text-center py-5">
          <p>No orders yet.</p>
        </div>
      ) : (
        <div className="table-responsive">
          <table className="table table-striped">
            <thead>
              <tr>
                <th>Order ID</th>
                <th>Customer</th>
                <th>Phone</th>
                <th>City</th>
                <th>Total</th>
                <th>Items</th>
                <th>Date</th>
              </tr>
            </thead>
            <tbody>
              {orders.map(order => (
                <tr key={order.id}>
                  <td>#{order.id}</td>
                  <td>{order.customer_name}</td>
                  <td>{order.customer_phone}</td>
                  <td>{order.city}</td>
                  <td>${order.total}</td>
                  <td>{order.items ? JSON.parse(order.items).length : 0} items</td>
                  <td>{new Date(order.created_at).toLocaleDateString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default AdminOrders;