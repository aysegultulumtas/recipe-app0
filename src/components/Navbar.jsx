import { Link } from 'react-router-dom';
import './Navbar.css';

const Navbar = () => {
  return (
    <nav className="navbar">
      <Link to="/" className="logo">👩‍🍳 Tarif Rehberim</Link>
      <div className="links">
        <Link to="/">Ana Sayfa</Link>
        <Link to="/favorites">Favoriler</Link>
       
      </div>
    </nav>
  );
};

export default Navbar;