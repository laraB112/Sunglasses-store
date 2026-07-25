import { Link } from 'react-router-dom';
import { useCart } from '../Context/Context';

function Navbar() {
    const { getItemCount } = useCart();
    const count = getItemCount();

    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark-custom sticky-top">
            <div className="container">
                <Link className="navbar-brand" to="/">
                    <i className="bi bi-sunglasses me-2"></i>PureLux
                </Link>
                <button className="navbar-toggler border-0" type="button" data-bs-toggle="collapse" data-bs-target="#navMenu">
                    <span className="navbar-toggler-icon"></span>
                </button>

                <div className="collapse navbar-collapse" id="navMenu">
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

                    <Link className="nav-link position-relative" to="/cart">
                        <i className="bi bi-bag" style={{ fontSize: '1.5rem', color: 'white' }}></i>
                        {count > 0 && (
                            <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-gold text-dark">
                                {count}
                            </span>
                        )}
                    </Link>

                </div>
            </div>
        </nav>
    );
}

export default Navbar;