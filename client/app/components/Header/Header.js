import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => (
  <header>
    <nav className="navbar bg-dark text-white">
      <Link to="/" className="navbar-brand text-white">VieLyf</Link>
      
        <Link to="/nutritionalBlog" className="text-white">Nutritional Blog</Link>
        <Link to="/catalogueNutriologist" className="text-white">Catalogue of Nutriologist</Link>
      <div>
        <Link to="/signup" className="navbar-brand text-white">Sign up</Link>
        <Link to="/login" className="navbar-brand text-white">Log in</Link>
      </div>
    </nav>
  </header>
);

export default Header;
