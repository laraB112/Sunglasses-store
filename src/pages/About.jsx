// src/pages/About.jsx
function About() {
  return (
    <div className="container py-5">
      <h2 className="text-center mb-4" style={{ fontFamily: 'Playfair Display, serif' }}>
        About PURELUX
      </h2>

      <div className="row justify-content-center">
        <div className="col-lg-8">
          <p className="lead text-center mb-5">
            Luxury eyewear for the modern individual.
          </p>

          <div className="card mb-4">
            <div className="card-body">
              <h5>Our Mission</h5>
              <p>
                To deliver premium eyewear that blends timeless elegance with
                modern comfort. Every pair of PURELUX sunglasses is designed to
                elevate your style.
              </p>
            </div>
          </div>

          <div className="card mb-4">
            <div className="card-body">
              <h5>What Sets Us Apart</h5>
              <ul>
                <li>Curated collection of luxury brands</li>
                <li>Premium materials and craftsmanship</li>
                <li>Sustainable and ethical practices</li>
              </ul>
            </div>
          </div>

          <div className="card">
            <div className="card-body">
              <h5>Join Our Community</h5>
              <p>
                Discover the perfect pair of sunglasses that reflects your
                unique style. At PURELUX, luxury is about how you feel.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default About;