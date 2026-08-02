import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useCart } from '../Context/Context.js';

function ProductDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    fetch(`http://localhost:8083/products/${id}`)  
      .then(res => res.json())
      .then(data => {
        setProduct(data[0]);
      })
      .catch(err => {
        console.error('Error fetching product:', err);
        setProduct(null);
      });
  }, [id]);

  if (!product) {
    return (
      <div className="container text-center py-5">
        <h3>Product not found</h3>
        <button className="btn btn-dark" onClick={() => navigate('/products')}>
          Back to Collection
        </button>
      </div>
    );
  }

  const cartProduct = {
    id: product.productId,
    name: product.name,
    price: product.price,
    image: product.image_url,
    description: product.description
  };

  return (
    <div className="container py-5">
      <button className="btn btn-outline-dark mb-4" onClick={() => navigate(-1)}>
        <i className="bi bi-arrow-left me-2"></i>Back
      </button>
      
      <div className="row">
        <div className="col-md-6">
          <img 
            src={product.image_url}  // 👈 Just the path
            alt={product.name} 
            className="img-fluid" 
            style={{ objectFit: 'cover', width: '100%', height: '500px' }}
            onError={(e) => {
              e.target.src = 'https://via.placeholder.com/500x500/1e1a16/c9a87c?text=No+Image';
            }}
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
              addToCart(cartProduct); 
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