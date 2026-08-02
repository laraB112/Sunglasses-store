import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';

function Register() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: '',
    email: '',
    password: '',
    phone: '',
    address: '',
    city: ''
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    fetch('http://localhost:8083/api/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form)
    })
    .then(res => res.json())
    .then(data => {
      if (data.error) {
        setError(data.error);
        setLoading(false);
      } else {
        alert('Registration successful! Please login.');
        navigate('/login');
      }
    })
    .catch(() => {
      setError('Registration failed. Please try again.');
      setLoading(false);
    });
  };

  return (
    <div className="container py-5" style={{ maxWidth: '500px' }}>
      <div className="card shadow-sm border-0">
        <div className="card-body p-4">
          <h3 className="text-center mb-4" style={{ fontFamily: 'Playfair Display, serif' }}>
            Register
          </h3>
          
          {error && <div className="alert alert-danger">{error}</div>}
          
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label className="form-label">Full Name</label>
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
              <label className="form-label">Email</label>
              <input
                type="email"
                className="form-control"
                name="email"
                value={form.email}
                onChange={handleChange}
                required
              />
            </div>
            
            <div className="mb-3">
              <label className="form-label">Password</label>
              <input
                type="password"
                className="form-control"
                name="password"
                value={form.password}
                onChange={handleChange}
                required
              />
            </div>
            
            <div className="mb-3">
              <label className="form-label">Phone</label>
              <input
                type="text"
                className="form-control"
                name="phone"
                value={form.phone}
                onChange={handleChange}
              />
            </div>
            
            <div className="mb-3">
              <label className="form-label">Address</label>
              <input
                type="text"
                className="form-control"
                name="address"
                value={form.address}
                onChange={handleChange}
              />
            </div>
            
            <div className="mb-3">
              <label className="form-label">City</label>
              <input
                type="text"
                className="form-control"
                name="city"
                value={form.city}
                onChange={handleChange}
              />
            </div>
            
            <button type="submit" className="btn btn-gold w-100 py-2" disabled={loading}>
              {loading ? 'Registering...' : 'Register'}
            </button>
          </form>
          
          <p className="text-center mt-3">
            Already have an account? <Link to="/login">Login</Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Register;