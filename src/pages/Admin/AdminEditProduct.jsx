import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

function AdminEditProduct() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: '',
    brand: '',
    price: '',
    category: '',
    description: ''
  });
  const [existingImage, setExistingImage] = useState('');
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetch(`http://localhost:8083/products/${id}`)
      .then(res => res.json())
      .then(data => {
        const product = data[0];
        setForm({
          name: product.name,
          brand: product.brand,
          price: product.price,
          category: product.category,
          description: product.description
        });
        setExistingImage(product.image_url);
      });
  }, [id]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData();
    formData.append('name', form.name);
    formData.append('brand', form.brand);
    formData.append('price', form.price);
    formData.append('category', form.category);
    formData.append('description', form.description);
    formData.append('existing_image', existingImage);
    if (image) {
      formData.append('image', image);
    }

    fetch(`http://localhost:8083/products/${id}`, {
      method: 'PUT',
      body: formData
    })
    .then(res => res.json())
    .then(() => {
      alert('Product updated successfully!');
      navigate('/admin/products');
    })
    .catch(err => {
      alert('Error updating product');
      setLoading(false);
    });
  };

  return (
    <div className="container py-5" style={{ maxWidth: '600px' }}>
      <h2 className="mb-4">Edit Product</h2>
      
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label">Product Name</label>
          <input
            type="text"
            className="form-control"
            name="name"
            value={form.name}
            onChange={handleChange}
            required
          />
        </div>
        
        <div className="mb-3">
          <label className="form-label">Brand</label>
          <input
            type="text"
            className="form-control"
            name="brand"
            value={form.brand}
            onChange={handleChange}
            required
          />
        </div>
        
        <div className="mb-3">
          <label className="form-label">Price ($)</label>
          <input
            type="number"
            className="form-control"
            name="price"
            value={form.price}
            onChange={handleChange}
            required
          />
        </div>
        
        <div className="mb-3">
          <label className="form-label">Category</label>
          <select
            className="form-control"
            name="category"
            value={form.category}
            onChange={handleChange}
          >
            <option value="Cartier">Cartier</option>
            <option value="Dior">Dior</option>
            <option value="Fendi">Fendi</option>
            <option value="LV">LV</option>
            <option value="MIUMIU">MIUMIU</option>
            <option value="Versace">Versace</option>
          </select>
        </div>
        
        <div className="mb-3">
          <label className="form-label">Current Image</label>
          <div>
            <img 
              src={existingImage} 
              alt="Current"
              style={{ width: '100px', height: '100px', objectFit: 'cover' }}
            />
          </div>
        </div>
        
        <div className="mb-3">
          <label className="form-label">New Image (optional)</label>
          <input
            type="file"
            className="form-control"
            accept="image/*"
            onChange={handleImageChange}
          />
        </div>
        
        <div className="mb-3">
          <label className="form-label">Description</label>
          <textarea
            className="form-control"
            name="description"
            rows="4"
            value={form.description}
            onChange={handleChange}
          />
        </div>
        
        <button type="submit" className="btn btn-gold w-100" disabled={loading}>
          {loading ? 'Updating...' : 'Update Product'}
        </button>
      </form>
    </div>
  );
}

export default AdminEditProduct;