import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import ProductCard from '../components/ProductCard';
import backgroundImage from '../assets/Background.jpg';

function Home() {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch('http://localhost:8083/products')
            .then(res => res.json())
            .then(data => {
                setProducts(data);
                setLoading(false);
            })
            .catch(err => {
                console.error('Error fetching products:', err);
                setLoading(false);
            });
    }, []);

    const featured = products.slice(0, 3);

    return (
        <>
            {/* HERO SECTION */}
            <section
                className="bg-dark-custom text-light py-5"
                style={{
                    backgroundImage: `url(${backgroundImage})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    minHeight: '80vh',
                    position: 'relative'
                }}
            >
                {/* Dark overlay */}
                <div style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    backgroundColor: 'rgba(0,0,0,0.5)'
                }}></div>

                <div className="container position-relative" style={{ zIndex: 1 }}>
                    <div className="row align-items-center" style={{ minHeight: '70vh' }}>
                        <div className="col-lg-6">
                            <h1 className="display-1 fw-bold" style={{ fontFamily: 'Playfair Display, serif' }}>
                                Timeless<br />Elegance
                            </h1>
                            <p className="lead">Discover the art of luxury eyewear</p>
                            <Link to="/products" className="btn btn-gold btn-lg px-5 py-3">
                                Explore Collection <i className="bi bi-arrow-right ms-2"></i>
                            </Link>
                        </div>
                    </div>
                </div>
            </section>

            {/* FEATURED PRODUCTS */}
            <section className="container py-5">
                <h2 className="text-center mb-4" style={{ fontFamily: 'Playfair Display, serif' }}>
                    <i className="bi bi-star-fill text-gold me-2"></i>Signature Styles
                </h2>

                {loading ? (
                    <div className="text-center py-5">
                        <div className="spinner-border text-gold" role="status">
                            <span className="visually-hidden">Loading...</span>
                        </div>
                        <p className="mt-3">Loading products...</p>
                    </div>
                ) : featured.length === 0 ? (
                    <div className="text-center py-5">
                        <p>No products found</p>
                    </div>
                ) : (
                    <div className="row g-4">
                        {featured.map(product => (
                            <div className="col-md-4" key={product.productId}>
                                <ProductCard product={product} />
                            </div>
                        ))}
                    </div>
                )}

                <div className="text-center mt-4">
                    <Link to="/products" className="btn btn-outline-dark">
                        View All Collection
                    </Link>
                </div>
            </section>
        </>
    );
}

export default Home;