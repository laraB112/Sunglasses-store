// src/pages/Admin/AdminAddProduct.jsx
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function AdminAddProduct() {
    const navigate = useNavigate();
    const [form, setForm] = useState({
        name: '',
        brand: '',
        price: '',
        category: 'Cartier',
        description: ''
    });
    const [image, setImage] = useState(null);
    const [loading, setLoading] = useState(false);

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
        if (image) {
            formData.append('image', image);
        }

        fetch('http://localhost:8083/products', {
            method: 'POST',
            body: formData
        })
            .then(res => res.json())
            .then(() => {
                alert('Product added successfully!');
                navigate('/admin/products');
            })
            .catch(err => {
                alert('Error adding product');
                setLoading(false);
            });
    };

    return (
        <div className="container py-5" style={{ maxWidth: '600px' }}>
            <h2 className="mb-4">Add New Product</h2>
            <button
                className="btn btn-outline-dark btn-sm mb-3"
                onClick={() => navigate('/admin/dashboard')}
            >
                <i className="bi bi-arrow-left me-1"></i>Back
            </button>

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
                    <label className="form-label">Image</label>
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
                    {loading ? 'Adding...' : 'Add Product'}
                </button>
            </form>
        </div>
    );
}

export default AdminAddProduct;