// src/components/ProductCard.jsx
import { useNavigate } from 'react-router-dom';
import { useCart } from '../Context/Context.js';

function ProductCard({ product }) {
  const navigate = useNavigate();
  const { addToCart } = useCart();

<<<<<<< HEAD
=======
  // Cart product with correct fields
>>>>>>> a6b1d9d30120735faaa58a1e7557d1cd759b6ef6
  const cartProduct = {
    id: product.productId,
    name: product.name,
    brand: product.brand,
    price: product.price,
    category: product.category,
<<<<<<< HEAD
    image: product.image_url, 
=======
    image: product.image_url,  // 👈 Now just the path (proxy handles it)
>>>>>>> a6b1d9d30120735faaa58a1e7557d1cd759b6ef6
    description: product.description
  };

  return (
    <div className="card product-card h-100 shadow-sm">
      <img
<<<<<<< HEAD
        src={`http://localhost:8083${product.image_url}`} 
=======
        src={`http://localhost:8083${product.image_url}`}  // 👈 Just the path
>>>>>>> a6b1d9d30120735faaa58a1e7557d1cd759b6ef6
        className="card-img-top"
        alt={product.name}
        style={{ height: '250px', objectFit: 'cover' }}
        onError={(e) => {
          e.target.src = 'https://via.placeholder.com/300x250/1e1a16/c9a87c?text=No+Image';
        }}
      />
      <div className="card-body d-flex flex-column">
        <h5 className="card-title">{product.name}</h5>
        <p className="card-text text-muted small">{product.brand}</p>
        <p className="card-text fw-bold text-gold">${product.price}</p>
        <div className="d-flex gap-2 mt-auto">
          <button
            className="btn btn-outline-dark btn-sm flex-grow-1"
            onClick={() => navigate(`/products/${product.productId}`)}
          >
            View Details
          </button>
          <button
            className="btn btn-dark btn-sm"
            onClick={() => addToCart(cartProduct)}
          >
            <i className="bi bi-bag-plus"></i>
          </button>
        </div>
      </div>
    </div>
  );
}

export default ProductCard;