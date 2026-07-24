import {Link} from 'react-router-dom';

function Footer() {
  return (
    <footer className="bg-dark-custom text-light py-4 mt-5">
      <div className="container">
        <div className="row">
          <div className="col-md-4">
            <h5 className="text-gold">PURELUX</h5>
            <p className="small">Handcrafted Italian sunglasses since 1923.</p>
          </div>
          <div className="col-md-4">
            <h5 className="text-gold">Quick Links</h5>
            <ul className="list-unstyled small">
              <li><Link to="/" className="text-light text-decoration-none">Home</Link></li>
              <li><Link to="/products" className="text-light text-decoration-none">Collection</Link></li>
              <li><Link to="/about" className="text-light text-decoration-none">About</Link></li>
            </ul>
          </div>
          <div className="col-md-4">
            <h5 className="text-gold">Follow Us</h5>
            <div className="d-flex gap-3">
              <a href="#" className="text-light"><i className="bi bi-instagram"></i></a>
              <a href="#" className="text-light"><i className="bi bi-pinterest"></i></a>
              <a href="#" className="text-light"><i className="bi bi-youtube"></i></a>
            </div>
          </div>
        </div>
        <hr className="border-light opacity-25" />
        <p className="text-center small mb-0">&copy; 2026 PURELUX</p>
      </div>
    </footer>
  );
}

export default Footer;