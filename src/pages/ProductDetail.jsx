import { useParams, useNavigate } from 'react-router-dom';
import { products } from '../data/products';
import { useCart } from '../Context/Context.js';

function ProductDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const product = products.find(p => p.id === parseInt(id));

  if (!product) {
    return (
      <div className="container text-center py-5">
        <h3>Product not found</h3>
        <button className="btn btn-dark" onClick={() => navigate('/products')}>Back to Collection</button>
      </div>
    );
  }

  return (
    <div className="container py-5">
      <button className="btn btn-outline-dark mb-4" onClick={() => navigate(-1)}>
        <i className="bi bi-arrow-left me-2"></i>Back
      </button>
      
      <div className="row">
        <div className="col-md-6">
          <img 
            src={product.image} 
            alt={product.name} 
            className="img-fluid" 
            style={{ objectFit: 'cover', width: '100%', height: '500px' }} 
          />
        </div>
        <div className="col-md-6">
          <h2 className="display-5" style={{ fontFamily: 'Playfair Display, serif' }}>
            {product.name}
          </h2>
          <p className="text-muted">{product.brand}</p>
          <h3 className="text-gold mb-4">${product.price}</h3>
          <p className="lead">{product.description}</p>
          <button 
            className="btn btn-gold btn-lg w-100" 
            onClick={() => { 
              addToCart(product); 
              navigate('/cart'); 
            }}
          >
            <i className="bi bi-bag-plus me-2"></i>Add to Bag
          </button>
        </div>
      </div>
    </div>
  );
}

export default ProductDetail;