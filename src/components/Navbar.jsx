// src/components/Navbar.jsx
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../Context/Context.js';

function Navbar() {
    const navigate = useNavigate();
    const { getItemCount } = useCart();
    const count = getItemCount();
    const isAdmin = localStorage.getItem('adminToken');

    const handleLogout = () => {
        localStorage.removeItem('adminToken');
        navigate('/');
    };

    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark-custom sticky-top">
            <div className="container">
                {/* Brand Logo */}
                <Link className="navbar-brand" to={isAdmin ? '/admin/dashboard' : '/'}>
                    <i className="bi bi-sunglasses me-2"></i>
                    {isAdmin ? 'Admin Panel' : 'PureLux'}
                </Link>

                <button className="navbar-toggler border-0" type="button" data-bs-toggle="collapse" data-bs-target="#navMenu">
                    <span className="navbar-toggler-icon"></span>
                </button>

                <div className="collapse navbar-collapse" id="navMenu">
                    {/* 👇 DIFFERENT NAV LINKS FOR ADMIN */}
                    {isAdmin ? (
                        // ---------- ADMIN NAVBAR ----------
                        <ul className="navbar-nav me-auto">
                            <li className="nav-item">
                                <Link className="nav-link" to="/admin/dashboard">
                                    Dashboard
                                </Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to="/admin/products">
                                    Products
                                </Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to="/admin/orders">
                                    Orders
                                </Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to="/admin/products/add">
                                    Add Product
                                </Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link text-gold" to="/">
                                    View Site
                                </Link>
                            </li>
                        </ul>
                    ) : (
                        // ---------- CUSTOMER NAVBAR ----------
                        <ul className="navbar-nav me-auto">
                            <li className="nav-item">
                                <Link className="nav-link" to="/">Home</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to="/products">Collection</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to="/about">About</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to="/contact">Contact</Link>
                            </li>
                        </ul>
                    )}

                    {/* 👇 RIGHT SIDE - Different for Admin vs Customer */}
                    {isAdmin ? (
                        // Admin right side: Logout button
                        <button
                            className="btn btn-outline-danger btn-sm"
                            onClick={handleLogout}
                        >
                            <i className="bi bi-box-arrow-right me-1"></i>Logout
                        </button>
                    ) : (
                        // Customer right side: Cart icon
                        <Link className="nav-link position-relative" to="/cart">
                            <i className="bi bi-bag" style={{ fontSize: '1.5rem', color: 'white' }}></i>
                            {count > 0 && (
                                <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-gold text-dark">
                                    {count}
                                </span>
                            )}
                        </Link>
                    )}
                </div>
            </div>
        </nav>
    );
}

export default Navbar;
