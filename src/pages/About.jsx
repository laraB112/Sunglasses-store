// src/pages/About.jsx
function About() {
  return (
    <div className="container py-5">
      <h2 className="text-center mb-4" style={{ fontFamily: 'Playfair Display, serif' }}>
        <i className="bi bi-info-circle text-gold me-2"></i>About PURELUX
      </h2>
      
      <div className="row justify-content-center">
        <div className="col-lg-8">
          <div className="text-center">
            <i className="bi bi-sunglasses" style={{ fontSize: '5rem', color: '#c9a87c' }}></i>
          </div>
          <p className="lead text-center mb-4">
            Founded in 1923, PURELUX has been crafting the world's finest sunglasses for over a century.
          </p>
          <div className="card mb-4">
            <div className="card-body">
              <h5>Our Heritage</h5>
              <p>Born in the heart of Italy's eyewear district, PURELUX represents the pinnacle of craftsmanship and design.</p>
            </div>
          </div>
          <div className="card">
            <div className="card-body">
              <h5>Sustainability</h5>
              <p>We are committed to sustainable practices, using eco-friendly materials and ethical manufacturing processes.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default About;