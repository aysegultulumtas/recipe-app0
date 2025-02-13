import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="navbar">
      <Link to="/">Ana Sayfa</Link>
      <Link to="/favorites">Favoriler</Link>
    </nav>
  );
};

export default Navbar; // ✅ Export unutmayın