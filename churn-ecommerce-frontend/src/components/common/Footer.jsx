const Footer = () => {
    return (
      <footer className="footer">
        <div className="container">
          <div className="footer-grid">
            <div className="footer-column">
              <h3 className="footer-title">ChurnSense Shop</h3>
              <p className="footer-text">
                Your one-stop shop for all your needs. We value our customers and use advanced analytics to improve your experience.
              </p>
            </div>
            
            <div className="footer-column">
              <h3 className="footer-title">Quick Links</h3>
              <ul className="footer-links">
                <li><a href="/">Home</a></li>
                <li><a href="/products">Products</a></li>
                <li><a href="/cart">Cart</a></li>
                <li><a href="/dashboard">Dashboard</a></li>
              </ul>
            </div>
            
            <div className="footer-column">
              <h3 className="footer-title">Contact Us</h3>
              <ul className="footer-contact">
                <li>Email: support@churnsenseshop.com</li>
                <li>Phone: (555) 123-4567</li>
                <li>Address: 123 E-Commerce St, Web City</li>
              </ul>
            </div>
          </div>
          
          <div className="footer-bottom">
            <p>&copy; {new Date().getFullYear()} ChurnSense Shop. All rights reserved.</p>
          </div>
        </div>
      </footer>
    );
  };
  
  export default Footer;