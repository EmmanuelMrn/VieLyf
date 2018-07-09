//The lines Blog nutricional and Catalogo de nutriologos will be translate into <Link to> when those modules have been created
import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => (
  <header>
    <nav className="navbar bg-primary text-white">
      <Link to="/" className="navbar-brand text-white">VieLyf</Link>
      
        <Link to="/nutritionalBlog" className="navbar-brand text-white">Blog nutricional</Link>
        <Link to="/catalogueNutriologist" className="navbar-brand text-white">Catálogo de nutriólogos</Link>
      
      <div>
        <Link to="/signup" className="navbar-brand text-white">Sign up</Link>
        <Link to="/signin" className="navbar-brand text-white">Sign in</Link>
      </div>
    </nav>

    <hr />
  </header>
);

export default Header;
