import React, { Component } from "react";

class NutritionalBlog extends Component {
  constructor(props) {
    super(props);

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

        <section className="banner-section" />
        <div className="col-lg-12 col-md-12 col-sm-12 post-title-block">
          <h1 className="text-center">Nutritional Blog</h1>
          <ul className="list-inline text-center">

            <li>A startup from MindHub</li>
          </ul>
        </div>
        <section className="details-card">
          <div className="container">
            <div className="row">
              <div className="col-md-4">
                <div className="card-content">
                  <div className="card-img">
                    <img src="https://placeimg.com/380/230/nature" alt="" />
                  </div>
                  <div className="card-desc">
                    <h3 className="post-title">Get started with Vielyf</h3>
                    <p>
                      Vielyf is not just a platform for connecting nutritionists
                      and clients, it is also a tool for keeping up to date with
                      your diet progress and health tips
                    </p>

                    <a href="#" className="btn-card">

                      See more
                    </a>
                  </div>
                </div>
              </div>
              <div className="col-md-4">
                <div className="card-content">
                  <div className="card-img">
                    <img src="https://picsum.photos/380/230" alt="" />
                  </div>
                  <div className="card-desc">

                    <h3>This is the first step for a change</h3>
                    <p>
                      Whatever your goal is, to lose weight or to live a
                      healthier lifestyle, Vielyf can assist you by helping you
                      find professionals who can guide you in this process
                    </p>
                    <a href="#" className="btn-card">
                      See more

                    </a>
                  </div>
                </div>
              </div>
              <div className="col-md-4">
                <div className="card-content">
                  <div className="card-img">
                    <img src="https://placeimg.com/380/230/tech" alt="" />
                  </div>
                  <div className="card-desc">

                    <h3>The molecules of Food and Nutrition</h3>
                    <p>
                      Nutrition specialist Dr. Dena Herman introduced UCLA
                      students to the molecules of food and nutrition as part of
                      our 2013 Science and Food course. We learned all about
                      essential nutrients, were introduced to the exciting new
                      world of phytonutrients, a...
                    </p>
                    <a href="#" className="btn-card">
                      See more

                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <div className="container">
          <h5 className="section-title h1">OUR TEAM</h5>
          <div className="row">
            <div className="col-xs-12 col-sm-6 col-md-4">
              <div
                className="image-flip"
                onTouchStart="this.classList.toggle('hover');"
              >
                <div className="mainflip">
                  <div className="frontside">
                    <div className="card">
                      <div className="card-body text-center">
                        <p>
                          <img
                            className=" img-fluid"
                            src="https://endimages.s3.amazonaws.com/cache/d6/5b/d65b000590e2eadf48d8265a8c01ac8f.jpg"
                            alt="card image"
                          />
                        </p>
                        <h4 className="card-title">Carlo</h4>
                        <p className="card-text">

                          Web developer and Product Owner for Vielyf proyect
                        </p>
                        <a href="#" className="btn btn-primary btn-sm">
                          <i className="fa fa-plus" />

                        </a>
                      </div>
                    </div>
                  </div>
                  <div className="backside">

                    <div className="card">
                      <div className="card-body text-center mt-4">
                        <h4 className="card-title">ArkusNexus Bootcamp</h4>
                        <p className="card-text">
                          Web developer and Product Owner for Vielyf proyect{" "}
                          <br />
                          Senior Student at ITT
                        </p>
                        <ul className="list-inline">
                          <li className="list-inline-item">
                            <a
                              className="social-icon text-xs-center"
                              target="_blank"
                              href="#"
                            >
                              <i className="fa fa-facebook" />
                            </a>
                          </li>
                          <li className="list-inline-item">
                            <a
                              className="social-icon text-xs-center"
                              target="_blank"
                              href="#"
                            >
                              <i className="fa fa-twitter" />
                            </a>
                          </li>
                          <li className="list-inline-item">
                            <a
                              className="social-icon text-xs-center"
                              target="_blank"
                              href="#"
                            >
                              <i className="fa fa-skype" />
                            </a>
                          </li>
                          <li className="list-inline-item">
                            <a
                              className="social-icon text-xs-center"
                              target="_blank"
                              href="#"
                            >
                              <i className="fa fa-google" />

                            </a>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>


            <div className="col-xs-12 col-sm-6 col-md-4">
              <div
                className="image-flip"
                ontouchstart="this.classList.toggle('hover');"
              >
                <div className="mainflip">
                  <div className="frontside">
                    <div className="card">
                      <div className="card-body text-center">
                        <p>
                          <img
                            className=" img-fluid"

                            src="https://static1.squarespace.com/static/583c906ebe659429d1106265/t/5935941859cc687293cd3f6b/1496683572683/"
                            alt="card image"
                          />
                        </p>

                        <h4 className="card-title">Javier</h4>
                        <p className="card-text">
                          Web developer for Vielyf proyect Senior Student at ITT
                        </p>
                        <a href="#" className="btn btn-primary btn-sm">
                          <i className="fa fa-plus" />

                        </a>
                      </div>
                    </div>
                  </div>

                  <div className="backside">
                    <div className="card">
                      <div className="card-body text-center mt-4">
                        <h4 className="card-title">ArkusNexus Bootcamp</h4>
                        <p className="card-text">
                          Web developer for Vielyf proyect <br />
                          Senior Student at ITT
                        </p>
                        <ul className="list-inline">
                          <li className="list-inline-item">
                            <a
                              classname="social-icon text-xs-center"
                              target="_blank"
                              href="#"
                            >
                              <i className="fa fa-facebook" />
                            </a>
                          </li>
                          <li className="list-inline-item">
                            <a
                              className="social-icon text-xs-center"
                              target="_blank"
                              href="#"
                            >
                              <i className="fa fa-twitter" />
                            </a>
                          </li>
                          <li className="list-inline-item">
                            <a
                              className="social-icon text-xs-center"
                              target="_blank"
                              href="#"
                            >
                              <i className="fa fa-skype" />
                            </a>
                          </li>
                          <li className="list-inline-item">
                            <a
                              className="social-icon text-xs-center"
                              target="_blank"
                              href="#"
                            >
                              <i className="fa fa-google" />
                            </a>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>


            <div className="col-xs-12 col-sm-6 col-md-4">
              <div
                className="image-flip"
                ontouchstart="this.classList.toggle('hover');"
              >
                <div className="mainflip">
                  <div className="frontside">
                    <div className="card">
                      <div className="card-body text-center">
                        <p>
                          <img
                            className=" img-fluid"

                            src="http://s3-eu-west-1.amazonaws.com/cinemania-cdn/wp-content/uploads/2017/03/23172037/Vision_Forest-660x374.jpg"
                            alt="card image"
                          />
                        </p>

                        <h4 className="card-title">Sergio</h4>
                        <p className="card-text">
                          Web developer and QA for Vielyf proyect <br /> Senior
                          Student at UABC
                        </p>
                        <a href="#" className="btn btn-primary btn-sm">
                          <i className="fa fa-plus" />
                        </a>
                      </div>
                    </div>
                  </div>
                  <div className="backside">
                    <div className="card">
                      <div className="card-body text-center mt-4">
                        <h4 className="card-title">ArkusNexus Bootcamp</h4>
                        <p className="card-text">
                          Web developer and QA for Vielyf proyect
                        </p>
                        <ul className="list-inline">
                          <li className="list-inline-item">
                            <a
                              className="social-icon text-xs-center"
                              target="_blank"
                              href="#"
                            >
                              <i className="fa fa-facebook" />
                            </a>
                          </li>
                          <li className="list-inline-item">
                            <a
                              className="social-icon text-xs-center"
                              target="_blank"
                              href="#"
                            >
                              <i className="fa fa-twitter" />
                            </a>
                          </li>
                          <li className="list-inline-item">
                            <a
                              className="social-icon text-xs-center"
                              target="_blank"
                              href="#"
                            >
                              <i className="fa fa-skype" />
                            </a>
                          </li>
                          <li className="list-inline-item">
                            <a
                              className="social-icon text-xs-center"
                              target="_blank"
                              href="#"
                            >
                              <i className="fa fa-google" />
                            </a>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>


            <div className="col-xs-12 col-sm-6 col-md-4">
              <div
                className="image-flip"
                onTouchStart="this.classList.toggle('hover');"
              >
                <div className="mainflip">
                  <div className="frontside">
                    <div className="card">
                      <div className="card-body text-center">
                        <p>
                          <img
                            className=" img-fluid"

                            src="https://i.ytimg.com/vi/d7fpqFRmusA/maxresdefault.jpg"
                            alt="card image"
                          />
                        </p>

                        <h4 className="card-title">Jose</h4>
                        <p className="card-text">
                          Web developer for Vielyf proyect <br /> Senior Student
                          at UABC
                        </p>
                        <a href="#" className="btn btn-primary btn-sm">
                          <i className="fa fa-plus" />

                        </a>
                      </div>
                    </div>
                  </div>

                  <div className="backside">
                    <div className="card">
                      <div className="card-body text-center mt-4">
                        <h4 className="card-title">ArkusNexus Bootcamp</h4>
                        <p className="card-text">
                          Web developer for Vielyf proyect <br /> Senior Student
                          at UABC
                        </p>
                        <ul className="list-inline">
                          <li className="list-inline-item">
                            <a
                              className="social-icon text-xs-center"
                              targetName="_blank"
                              href="#"
                            >
                              <i className="fa fa-facebook" />
                            </a>
                          </li>
                          <li className="list-inline-item">
                            <a
                              className="social-icon text-xs-center"
                              target="_blank"
                              href="#"
                            >
                              <i className="fa fa-twitter" />
                            </a>
                          </li>
                          <li className="list-inline-item">
                            <a
                              className="social-icon text-xs-center"
                              target="_blank"
                              href="#"
                            >
                              <i className="fa fa-skype" />
                            </a>
                          </li>
                          <li className="list-inline-item">
                            <a
                              className="social-icon text-xs-center"
                              target="_blank"
                              href="#"
                            >
                              <i className="fa fa-google" />

                            </a>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>


            <div className="col-xs-12 col-sm-6 col-md-4">
              <div
                className="image-flip"
                ontouchstart="this.classList.toggle('hover');"
              >
                <div className="mainflip">
                  <div className="frontside">
                    <div className="card">
                      <div className="card-body text-center">
                        <p>
                          <img
                            className=" img-fluid"

                            src="http://img.europapress.es/fotoweb/fotonoticia_20150217131003_800.jpg"
                            alt="card image"
                          />
                        </p>

                        <h4 className="card-title">Emmanuel</h4>
                        <p className="card-text">
                          Web developer and Scrum Master
                          <br /> Senior Student at UABC
                        </p>
                        <a href="#" className="btn btn-primary btn-sm">
                          <i className="fa fa-plus" />

                        </a>
                      </div>
                    </div>
                  </div>

                  <div className="backside">
                    <div className="card">
                      <div className="card-body text-center mt-4">
                        <h4 className="card-title">ArkusNexus Bootcamp</h4>
                        <p className="card-text">
                          Web developer and Scrum Master for Vielyf proyect
                          <br /> Senior Student at UABC
                        </p>
                        <ul className="list-inline">
                          <li className="list-inline-item">
                            <a
                              className="social-icon text-xs-center"
                              target="_blank"
                              href="#"
                            >
                              <i className="fa fa-facebook" />
                            </a>
                          </li>
                          <li className="list-inline-item">
                            <a
                              className="social-icon text-xs-center"
                              target="_blank"
                              href="#"
                            >
                              <i className="fa fa-twitter" />
                            </a>
                          </li>
                          <li className="list-inline-item">
                            <a
                              className="social-icon text-xs-center"
                              target="_blank"
                              href="#"
                            >
                              <i className="fa fa-skype" />
                            </a>
                          </li>
                          <li className="list-inline-item">
                            <a
                              className="social-icon text-xs-center"
                              target="_blank"
                              href="#"
                            >
                              <i className="fa fa-google" />

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
