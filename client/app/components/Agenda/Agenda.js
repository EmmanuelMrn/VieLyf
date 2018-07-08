import React from 'react';

import { Link } from 'react-router-dom';

const Agenda = () => (
  <Agenda>
    <Link to="/">Home</Link>

    <nav>
      <Link to="/helloworld">Hello World</Link>
    </nav>

    <h1>Agenda.</h1>

    <hr/>
  </Agenda>
);

export default Agenda;