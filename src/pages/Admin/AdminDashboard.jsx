// src/pages/Admin/AdminDashboard.jsx
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

function AdminDashboard() {
  const [stats, setStats] = useState({
    products: 0,
    orders: 0
  });

  useEffect(() => {
    // Check if admin is logged in
    const token = localStorage.getItem('adminToken');
    if (!token) {
      window.location.href = '/admin/login';
      return;
    }

    // Fetch stats
    fetch('http://localhost:8083/products')
      .then(res => res.json())
      .then(data => {
        setStats(prev => ({ ...prev, products: data.length }));
      });

    fetch('http://localhost:8083/orders')
      .then(res => res.json())
      .then(data => {
        setStats(prev => ({ ...prev, orders: data.length }));
      });
  }, []);

  return (
    <div className="container py-5">
      <h2 className="mb-4">Admin Dashboard</h2>
      
      <div className="row g-4">
        <div className="col-md-4">
          <div className="card text-center">
            <div className="card-body">
              <h1 className="display-4 text-gold">{stats.products}</h1>
              <p className="text-muted">Total Products</p>
              <Link to="/admin/products" className="btn btn-outline-dark btn-sm">
                Manage Products
              </Link>
            </div>
          </div>
        </div>
        
        <div className="col-md-4">
          <div className="card text-center">
            <div className="card-body">
              <h1 className="display-4 text-gold">{stats.orders}</h1>
              <p className="text-muted">Total Orders</p>
              <Link to="/admin/orders" className="btn btn-outline-dark btn-sm">
                View Orders
              </Link>
            </div>
          </div>
        </div>
        
        <div className="col-md-4">
          <div className="card text-center">
            <div className="card-body">
              <h1 className="display-4 text-gold">+</h1>
              <p className="text-muted">Add New Product</p>
              <Link to="/admin/products/add" className="btn btn-gold btn-sm">
                Add Product
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminDashboard;