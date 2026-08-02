import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useCart } from '../Context/Context.js';

function Navbar() {
    const navigate = useNavigate();
    const location = useLocation();
    const { getItemCount } = useCart();
    const count = getItemCount();
    const isAdmin = localStorage.getItem('adminToken');
    const user = JSON.parse(localStorage.getItem('user'));

    const isAdminLogin = location.pathname === '/admin/login';
    const isAdminRoute = location.pathname.startsWith('/admin');

    const handleAdminLogout = () => {
        localStorage.removeItem('adminToken');
        navigate('/');
    };

    const handleCustomerLogout = () => {
        localStorage.removeItem('user');
        navigate('/');
    };

    if (isAdminLogin) {
        return (
            <nav className="navbar navbar-expand-lg navbar-dark bg-dark-custom sticky-top">
                <div className="container">
                    <span className="navbar-brand">
                        <i className="bi bi-sunglasses me-2"></i>
                        Admin Panel
                    </span>
                </div>
            </nav>
        );
    }

    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark-custom sticky-top">
            <div className="container">
                <Link className="navbar-brand" to={isAdmin ? '/admin/dashboard' : '/'}>
                    <i className="bi bi-sunglasses me-2"></i>
                    {isAdmin ? 'Admin Panel' : 'PureLux'}
                </Link>

                <button className="navbar-toggler border-0" type="button" data-bs-toggle="collapse" data-bs-target="#navMenu">
                    <span className="navbar-toggler-icon"></span>
                </button>

                <div className="collapse navbar-collapse" id="navMenu">
                    {isAdmin ? (

                        <>
                            <ul className="navbar-nav me-auto">
                                <li className="nav-item"><Link className="nav-link" to="/admin/dashboard">Dashboard</Link></li>
                                <li className="nav-item"><Link className="nav-link" to="/admin/products">Products</Link></li>
                                <li className="nav-item"><Link className="nav-link" to="/admin/orders">Orders</Link></li>
                                <li className="nav-item"><Link className="nav-link" to="/admin/products/add">Add Product</Link></li>
                                <li className="nav-item"><Link className="nav-link text-gold" to="/">View Site</Link></li>
                            </ul>
                            <button className="btn btn-outline-danger btn-sm" onClick={handleAdminLogout}>
                                <i className="bi bi-box-arrow-right me-1"></i>Logout
                            </button>
                        </>
                    ) : (

                        <ul className="navbar-nav w-100 d-flex align-items-center">
                            <div className="d-flex">
                                <li className="nav-item"><Link className="nav-link" to="/">Home</Link></li>
                                <li className="nav-item"><Link className="nav-link" to="/products">Collection</Link></li>
                                <li className="nav-item"><Link className="nav-link" to="/about">About</Link></li>
                                <li className="nav-item"><Link className="nav-link" to="/contact">Contact</Link></li>
                            </div>

                            <div className="d-flex ms-auto align-items-center">
                                {user ? (
                                    <>
                                        <span className="nav-link text-gold">
                                            <i className="bi bi-person-circle me-1"></i>
                                            {user.name}
                                        </span>
                                        <button className="btn btn-outline-danger btn-sm" onClick={handleCustomerLogout}>
                                            Logout
                                        </button>
                                    </>
                                ) : (
                                    <>
                                        <Link className="nav-link" to="/login">Login</Link>
                                        <Link className="nav-link" to="/register">Register</Link>
                                    </>
                                )}

                                <Link className="nav-link position-relative" to="/cart" style={{ paddingRight: '0' }}>
                                    <i className="bi bi-bag" style={{ fontSize: '1.3rem' }}></i>
                                    {count > 0 && (
                                        <span className="badge rounded-pill bg-gold text-dark" style={{
                                            position: 'absolute',
                                            top: '0',
                                            right: '-8px',
                                            fontSize: '0.65rem',
                                            padding: '2px 6px'
                                        }}>
                                            {count}
                                        </span>
                                    )}
                                </Link>
                            </div>
                        </ul>
                    )}
                </div>
            </div>
        </nav>
    );
}

export default Navbar;