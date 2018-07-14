import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => (
  <header>
<<<<<<< HEAD
    <nav className="navbar bg-dark text-white">
      <Link to="/" className="navbar-brand text-white">VieLyf</Link>
      
        <Link to="/nutritionalBlog" className="text-white">Blog nutricional</Link>
        <Link to="/catalogueNutriologist" className="text-white">Catálogo de nutriólogos</Link>
      
      <div>
        <Link to="/signup" className="navbar-brand text-white">Sign up</Link>
        <Link to="/login" className="navbar-brand text-white">Log in</Link>
      </div>
=======
    <Link to="/">Home</Link>

    <nav>
      <Link to="/charts">Corporal</Link>
>>>>>>> Sergio
    </nav>
  </header>
);

export default Header;
