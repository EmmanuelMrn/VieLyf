import React, { Component } from 'react';

import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import Agenda from '../Agenda/Agenda';

const App = ({ children }) => (
  <>
    <Header />
    
    <main>
      {children}
    </main>

    <Footer />

    {/* <Agenda /> */}
  </>
);

export default App;
