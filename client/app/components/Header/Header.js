//The lines Blog nutricional and Catalogo de nutriologos will be translate into <Link to> when those modules have been created
import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => (
  <header>
    <nav className="navbar bavbar=light bg-primary text-white">
      <Link to="/" className="navbar-brand text-white">VieLyf</Link>
      
      <a className="text-white">Blog nutricional</a>
      <a className="text-white">Catálogo de nutriólogos</a> 
      <Link to="/helloworld" className="navbar-brand text-white">Hello World</Link>
    </nav>

    <hr />
  </header>
);

export default Header;
