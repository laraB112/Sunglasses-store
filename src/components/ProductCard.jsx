import { useNavigate } from 'react-router-dom';
import { useCart } from '../Context/Context.js';

function ProductCard({ product }) {
  const navigate = useNavigate();
  const { addToCart } = useCart();

  return (
    <div className="card product-card h-100 shadow-sm">
      <img 
        src={product.image} 
        className="card-img-top" 
        alt={product.name} 
        style={{ height: '250px', objectFit: 'cover' }} 
      />
      <div className="card-body d-flex flex-column">
        <h5 className="card-title">{product.name}</h5>
        <p className="card-text text-muted small">{product.brand}</p>
        <p className="card-text fw-bold text-gold">${product.price}</p>
        <div className="d-flex gap-2 mt-auto">
          <button 
            className="btn btn-outline-dark btn-sm flex-grow-1" 
            onClick={() => navigate(`/products/${product.id}`)}
          >
            View Details
          </button>
          <button 
            className="btn btn-dark btn-sm" 
            onClick={() => addToCart(product)}
          >
            <i className="bi bi-bag-plus"></i>
          </button>
        </div>
      </div>
    </div>
  );
}

export default ProductCard;