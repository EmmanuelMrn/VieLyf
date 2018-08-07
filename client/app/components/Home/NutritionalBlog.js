<<<<<<< HEAD
import React, { Component } from 'react';

=======
import React, { Component } from "react";
>>>>>>> 4ecec229019d023c9c214ad60ea439fedb3adf63

class NutritionalBlog extends Component {
  constructor(props) {
    super(props);

<<<<<<< HEAD
    this.state = {
    };

  }
  
  render() {
    const {

    } = this.state;

    return (
      <div className="container">
        <h1>Nutritional Blog</h1>
        <p>In this place will be the Nutriotional Blog, but theres nothing here yet, come back later bro</p>
      </div>);
  }
}

export default NutritionalBlog;
=======
    this.state = {};
  }

  render() {
    const {} = this.state;

    return (
      <div className="container">
        <link
          href="//maxcdn.bootstrapcdn.com/bootstrap/4.1.1/css/bootstrap.min.css"
          rel="stylesheet"
          id="bootstrap-css"
        />
        <script src="//maxcdn.bootstrapcdn.com/bootstrap/4.1.1/js/bootstrap.min.js" />
        <script src="//cdnjs.cloudflare.com/ajax/libs/jquery/3.2.1/jquery.min.js" />
        <h1>Nutritional Blog</h1>

        <section class="details-card">
          <div class="container">
            <div class="row">
              <div class="col-md-4">
                <div class="card-content">
                  <div class="card-img">
                    <img src="https://placeimg.com/380/230/nature" alt="" />
                  </div>
                  <div class="card-desc">
                    <h3 class="post-title">Get started with Vielyf</h3>
                    <p>
                      Vielyf is not just a platform for connecting nutritionists
                      and clients, it is also a tool for keeping up to date with
                      your diet progress and health tips
                    </p>
                    <a href="#" class="btn-card">
                      See more
                    </a>
                  </div>
                </div>
              </div>
              <div class="col-md-4">
                <div class="card-content">
                  <div class="card-img">
                    <img src="https://picsum.photos/380/230" alt="" />
                  </div>
                  <div class="card-desc">
                    <h3>Heading2</h3>
                    <p>
                      Lorem ipsum dolor sit amet consectetur, adipisicing elit.
                      Laboriosam, voluptatum! Dolor quo, perspiciatis voluptas
                      totam
                    </p>
                    <a href="#" class="btn-card">
                      Read
                    </a>
                  </div>
                </div>
              </div>
              <div class="col-md-4">
                <div class="card-content">
                  <div class="card-img">
                    <img src="https://placeimg.com/380/230/tech" alt="" />
                  </div>
                  <div class="card-desc">
                    <h3>Heading3</h3>
                    <p>
                      Lorem ipsum dolor sit amet consectetur, adipisicing elit.
                      Laboriosam, voluptatum! Dolor quo, perspiciatis voluptas
                      totam
                    </p>
                    <a href="#" class="btn-card">
                      Read
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <div class="container">
          <h5 class="section-title h1">OUR TEAM</h5>
          <div class="row">
            <div class="col-xs-12 col-sm-6 col-md-4">
              <div
                class="image-flip"
                ontouchstart="this.classList.toggle('hover');"
              >
                <div class="mainflip">
                  <div class="frontside">
                    <div class="card">
                      <div class="card-body text-center">
                        <p>
                          <img
                            class=" img-fluid"
                            src="https://endimages.s3.amazonaws.com/cache/d6/5b/d65b000590e2eadf48d8265a8c01ac8f.jpg"
                            alt="card image"
                          />
                        </p>
                        <h4 class="card-title">Carlo</h4>
                        <p class="card-text">
                          This is basic card with image on top, title,
                          description and button.
                        </p>
                        <a href="#" class="btn btn-primary btn-sm">
                          <i class="fa fa-plus" />
                        </a>
                      </div>
                    </div>
                  </div>
                  <div class="backside">
                    <div class="card">
                      <div class="card-body text-center mt-4">
                        <h4 class="card-title">Sunlimetech</h4>
                        <p class="card-text">
                          This is basic card with image on top, title,
                          description and button.This is basic card with image
                          on top, title, description and button.This is basic
                          card with image on top, title, description and button.
                        </p>
                        <ul class="list-inline">
                          <li class="list-inline-item">
                            <a
                              class="social-icon text-xs-center"
                              target="_blank"
                              href="#"
                            >
                              <i class="fa fa-facebook" />
                            </a>
                          </li>
                          <li class="list-inline-item">
                            <a
                              class="social-icon text-xs-center"
                              target="_blank"
                              href="#"
                            >
                              <i class="fa fa-twitter" />
                            </a>
                          </li>
                          <li class="list-inline-item">
                            <a
                              class="social-icon text-xs-center"
                              target="_blank"
                              href="#"
                            >
                              <i class="fa fa-skype" />
                            </a>
                          </li>
                          <li class="list-inline-item">
                            <a
                              class="social-icon text-xs-center"
                              target="_blank"
                              href="#"
                            >
                              <i class="fa fa-google" />
                            </a>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div class="col-xs-12 col-sm-6 col-md-4">
              <div
                class="image-flip"
                ontouchstart="this.classList.toggle('hover');"
              >
                <div class="mainflip">
                  <div class="frontside">
                    <div class="card">
                      <div class="card-body text-center">
                        <p>
                          <img
                            class=" img-fluid"
                            src="https://static1.squarespace.com/static/583c906ebe659429d1106265/t/5935941859cc687293cd3f6b/1496683572683/"
                            alt="card image"
                          />
                        </p>
                        <h4 class="card-title">Javier</h4>
                        <p class="card-text">
                          This is basic card with image on top, title,
                          description and button.
                        </p>
                        <a href="#" class="btn btn-primary btn-sm">
                          <i class="fa fa-plus" />
                        </a>
                      </div>
                    </div>
                  </div>
                  <div class="backside">
                    <div class="card">
                      <div class="card-body text-center mt-4">
                        <h4 class="card-title">Sunlimetech</h4>
                        <p class="card-text">
                          This is basic card with image on top, title,
                          description and button.This is basic card with image
                          on top, title, description and button.This is basic
                          card with image on top, title, description and button.
                        </p>
                        <ul class="list-inline">
                          <li class="list-inline-item">
                            <a
                              class="social-icon text-xs-center"
                              target="_blank"
                              href="#"
                            >
                              <i class="fa fa-facebook" />
                            </a>
                          </li>
                          <li class="list-inline-item">
                            <a
                              class="social-icon text-xs-center"
                              target="_blank"
                              href="#"
                            >
                              <i class="fa fa-twitter" />
                            </a>
                          </li>
                          <li class="list-inline-item">
                            <a
                              class="social-icon text-xs-center"
                              target="_blank"
                              href="#"
                            >
                              <i class="fa fa-skype" />
                            </a>
                          </li>
                          <li class="list-inline-item">
                            <a
                              class="social-icon text-xs-center"
                              target="_blank"
                              href="#"
                            >
                              <i class="fa fa-google" />
                            </a>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div class="col-xs-12 col-sm-6 col-md-4">
              <div
                class="image-flip"
                ontouchstart="this.classList.toggle('hover');"
              >
                <div class="mainflip">
                  <div class="frontside">
                    <div class="card">
                      <div class="card-body text-center">
                        <p>
                          <img
                            class=" img-fluid"
                            src="http://s3-eu-west-1.amazonaws.com/cinemania-cdn/wp-content/uploads/2017/03/23172037/Vision_Forest-660x374.jpg"
                            alt="card image"
                          />
                        </p>
                        <h4 class="card-title">Sergio</h4>
                        <p class="card-text">
                          This is basic card with image on top, title,
                          description and button.
                        </p>
                        <a href="#" class="btn btn-primary btn-sm">
                          <i class="fa fa-plus" />
                        </a>
                      </div>
                    </div>
                  </div>
                  <div class="backside">
                    <div class="card">
                      <div class="card-body text-center mt-4">
                        <h4 class="card-title">Sunlimetech</h4>
                        <p class="card-text">
                          This is basic card with image on top, title,
                          description and button.This is basic card with image
                          on top, title, description and button.This is basic
                          card with image on top, title, description and button.
                        </p>
                        <ul class="list-inline">
                          <li class="list-inline-item">
                            <a
                              class="social-icon text-xs-center"
                              target="_blank"
                              href="#"
                            >
                              <i class="fa fa-facebook" />
                            </a>
                          </li>
                          <li class="list-inline-item">
                            <a
                              class="social-icon text-xs-center"
                              target="_blank"
                              href="#"
                            >
                              <i class="fa fa-twitter" />
                            </a>
                          </li>
                          <li class="list-inline-item">
                            <a
                              class="social-icon text-xs-center"
                              target="_blank"
                              href="#"
                            >
                              <i class="fa fa-skype" />
                            </a>
                          </li>
                          <li class="list-inline-item">
                            <a
                              class="social-icon text-xs-center"
                              target="_blank"
                              href="#"
                            >
                              <i class="fa fa-google" />
                            </a>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div class="col-xs-12 col-sm-6 col-md-4">
              <div
                class="image-flip"
                ontouchstart="this.classList.toggle('hover');"
              >
                <div class="mainflip">
                  <div class="frontside">
                    <div class="card">
                      <div class="card-body text-center">
                        <p>
                          <img
                            class=" img-fluid"
                            src="https://i.ytimg.com/vi/d7fpqFRmusA/maxresdefault.jpg"
                            alt="card image"
                          />
                        </p>
                        <h4 class="card-title">Jose</h4>
                        <p class="card-text">
                          This is basic card with image on top, title,
                          description and button.
                        </p>
                        <a href="#" class="btn btn-primary btn-sm">
                          <i class="fa fa-plus" />
                        </a>
                      </div>
                    </div>
                  </div>
                  <div class="backside">
                    <div class="card">
                      <div class="card-body text-center mt-4">
                        <h4 class="card-title">Sunlimetech</h4>
                        <p class="card-text">
                          This is basic card with image on top, title,
                          description and button.This is basic card with image
                          on top, title, description and button.This is basic
                          card with image on top, title, description and button.
                        </p>
                        <ul class="list-inline">
                          <li class="list-inline-item">
                            <a
                              class="social-icon text-xs-center"
                              target="_blank"
                              href="#"
                            >
                              <i class="fa fa-facebook" />
                            </a>
                          </li>
                          <li class="list-inline-item">
                            <a
                              class="social-icon text-xs-center"
                              target="_blank"
                              href="#"
                            >
                              <i class="fa fa-twitter" />
                            </a>
                          </li>
                          <li class="list-inline-item">
                            <a
                              class="social-icon text-xs-center"
                              target="_blank"
                              href="#"
                            >
                              <i class="fa fa-skype" />
                            </a>
                          </li>
                          <li class="list-inline-item">
                            <a
                              class="social-icon text-xs-center"
                              target="_blank"
                              href="#"
                            >
                              <i class="fa fa-google" />
                            </a>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div class="col-xs-12 col-sm-6 col-md-4">
              <div
                class="image-flip"
                ontouchstart="this.classList.toggle('hover');"
              >
                <div class="mainflip">
                  <div class="frontside">
                    <div class="card">
                      <div class="card-body text-center">
                        <p>
                          <img
                            class=" img-fluid"
                            src="http://img.europapress.es/fotoweb/fotonoticia_20150217131003_800.jpg"
                            alt="card image"
                          />
                        </p>
                        <h4 class="card-title">Emmanuel</h4>
                        <p class="card-text">
                          This is basic card with image on top, title,
                          description and button.
                        </p>
                        <a href="#" class="btn btn-primary btn-sm">
                          <i class="fa fa-plus" />
                        </a>
                      </div>
                    </div>
                  </div>
                  <div class="backside">
                    <div class="card">
                      <div class="card-body text-center mt-4">
                        <h4 class="card-title">Sunlimetech</h4>
                        <p class="card-text">
                          This is basic card with image on top, title,
                          description and button.This is basic card with image
                          on top, title, description and button.This is basic
                          card with image on top, title, description and button.
                        </p>
                        <ul class="list-inline">
                          <li class="list-inline-item">
                            <a
                              class="social-icon text-xs-center"
                              target="_blank"
                              href="#"
                            >
                              <i class="fa fa-facebook" />
                            </a>
                          </li>
                          <li class="list-inline-item">
                            <a
                              class="social-icon text-xs-center"
                              target="_blank"
                              href="#"
                            >
                              <i class="fa fa-twitter" />
                            </a>
                          </li>
                          <li class="list-inline-item">
                            <a
                              class="social-icon text-xs-center"
                              target="_blank"
                              href="#"
                            >
                              <i class="fa fa-skype" />
                            </a>
                          </li>
                          <li class="list-inline-item">
                            <a
                              class="social-icon text-xs-center"
                              target="_blank"
                              href="#"
                            >
                              <i class="fa fa-google" />
                            </a>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default NutritionalBlog;
>>>>>>> 4ecec229019d023c9c214ad60ea439fedb3adf63
