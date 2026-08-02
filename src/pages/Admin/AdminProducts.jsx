// src/pages/Admin/AdminProducts.jsx
import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';

function AdminProducts() {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        // Check admin login
        const token = localStorage.getItem('adminToken');
        if (!token) {
            window.location.href = '/admin/login';
            return;
        }

        fetchProducts();
    }, []);

    const fetchProducts = () => {
        fetch('http://localhost:8083/products')
            .then(res => res.json())
            .then(data => {
                setProducts(data);
                setLoading(false);
            });
    };

    const handleDelete = (id) => {
        if (window.confirm('Are you sure you want to delete this product?')) {
            fetch(`http://localhost:8083/products/${id}`, {
                method: 'DELETE'
            })
                .then(() => {
                    fetchProducts();
                    alert('Product deleted successfully!');
                });
        }
    };

    if (loading) {
        return <div className="container py-5">Loading...</div>;
    }

    return (
        <div className="container py-5">
            <div className="d-flex justify-content-between align-items-center mb-4">
                <h2>Manage Products</h2>

                <Link to="/admin/products/add" className="btn btn-gold">
                    <i className="bi bi-plus-circle me-2"></i>Add New
                </Link>

            </div>
            <button
                className="btn btn-outline-dark btn-sm mb-3"
                onClick={() => navigate('/admin/dashboard')}
            >
                <i className="bi bi-arrow-left me-1"></i>Back
            </button>
            <div className="table-responsive">
                <table className="table table-striped">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Image</th>
                            <th>Name</th>
                            <th>Brand</th>
                            <th>Price</th>
                            <th>Category</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {products.map(product => (
                            <tr key={product.productId}>
                                <td>{product.productId}</td>
                                <td>
                                    <img
                                        src={product.image_url}
                                        alt={product.name}
                                        style={{ width: '50px', height: '50px', objectFit: 'cover' }}
                                        onError={(e) => e.target.src = 'https://via.placeholder.com/50/1e1a16/c9a87c?text=No+Image'}
                                    />
                                </td>
                                <td>{product.name}</td>
                                <td>{product.brand}</td>
                                <td>${product.price}</td>
                                <td>{product.category}</td>
                                <td>
                                    <Link
                                        to={`/admin/products/edit/${product.productId}`}
                                        className="btn btn-sm btn-warning me-2"
                                    >
                                        <i className="bi bi-pencil"></i>
                                    </Link>
                                    <button
                                        className="btn btn-sm btn-danger"
                                        onClick={() => handleDelete(product.productId)}
                                    >
                                        <i className="bi bi-trash"></i>
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default AdminProducts;