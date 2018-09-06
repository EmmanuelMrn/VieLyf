import React from 'react';
import { Link } from 'react-router-dom';

const NotFound = () => (
  <>
    {/* <h2>Page not found</h2> */}
    <div className="container">
      <div className="row">
          <div className="col-lg-8 offset-lg-3 col-md-8  col-sm-8 " style={{marginTop:"10px"}}>
            <img src="/assets/img/404.png"/>
          </div>
          <div className="col-4 offset-5"><Link to="/"><h4>Go home you're drunk</h4></Link></div>
      </div>
    </div>
  </>
);

export default NotFound;
