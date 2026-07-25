import { useState } from 'react';
import { products, categories } from '../data/products';
import ProductCard from '../components/ProductCard';

function Products() {
  const [category, setCategory] = useState('All');
  const [search, setSearch] = useState('');

  const filtered = products.filter(p => {
    const matchCategory = category === 'All' || p.category === category;
    const matchSearch = p.name.toLowerCase().includes(search.toLowerCase());
    return matchCategory && matchSearch;
  });

  return (
    <div className="container py-5">
      <h2 className="text-center mb-4" style={{ fontFamily: 'Playfair Display, serif' }}>
        <i className="bi bi-grid-3x3-gap-fill text-gold me-2"></i>Our Collection
      </h2>

      <div className="row mb-4">
        <div className="col-md-6 mx-auto">
          <input
            type="text"
            className="form-control"
            placeholder="Search sunglasses..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
      </div>

      <div className="d-flex flex-wrap justify-content-center gap-2 mb-4">
        {categories.map(c => (
          <button
            key={c}
            className={`btn btn-sm ${category === c ? 'btn-dark' : 'btn-outline-dark'}`}
            onClick={() => setCategory(c)}
          >
            {c}
          </button>
        ))}
      </div>

      {filtered.length === 0 ? (
        <div className="text-center py-5">
          <i className="bi bi-box" style={{ fontSize: '3rem', color: '#c9a87c' }}></i>
          <p className="mt-3">No products found</p>
        </div>
      ) : (
        <div className="row g-4">
          {filtered.map(p => (
            <div className="col-md-4 col-lg-3" key={p.id}>
              <ProductCard product={p} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Products;