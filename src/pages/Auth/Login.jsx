import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';

function Login() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    fetch('http://localhost:8083/api/login', {
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
        localStorage.setItem('user', JSON.stringify(data.user));
        navigate('/');
      }
    })
    .catch(() => {
      setError('Login failed. Please try again.');
      setLoading(false);
    });
  };

  return (
    <div className="container py-5" style={{ maxWidth: '450px' }}>
      <div className="card shadow-sm border-0">
        <div className="card-body p-4">
          <h3 className="text-center mb-4" style={{ fontFamily: 'Playfair Display, serif' }}>
            Login
          </h3>
          
          {error && <div className="alert alert-danger">{error}</div>}
          
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label className="form-label">Email</label>
              <input
                type="email"
                className="form-control"
                name="email"
                value={form.email}
                onChange={handleChange}
                placeholder="Enter your email"
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
                placeholder="Enter your password"
                required
              />
            </div>
            
            <button type="submit" className="btn btn-gold w-100 py-2" disabled={loading}>
              {loading ? 'Logging in...' : 'Login'}
            </button>
          </form>
          
          <p className="text-center mt-3">
            Don't have an account? <Link to="/register">Register</Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Login; 