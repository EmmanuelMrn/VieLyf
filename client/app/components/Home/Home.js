import React, { Component } from 'react';
import 'whatwg-fetch';
import { Link } from 'react-router-dom';
import {
  getFromStorage,
  setInStorage,
} from '../../utils/storage';

class Home extends Component {
  constructor() {
    super();

    this.state = {
    };

  }

  render() {
    const {

    } = this.state;

    let Button;
    if (localStorage.hasOwnProperty('the_main_app')) {
      Button = <div className="img-bg">
                 <a className="btn btn-success btn-lg" id="BtnHome"href="/vistaprincipal">Get Started</a>
               </div>
    } else {
      Button = <div className="img-bg">
                 <a className="btn btn-success btn-lg" id="BtnHome"href="/signup">Get Started</a>
               </div> 
    }

    return(
      <div>
        {Button}
        <div>
        <form>
        <div>
          <h3>ABOUT VIELYF</h3>
          <hr width= "50%"/>
          <div className="container Content-containers">
            <div className="col-md-8 offset-md-2">
              <p align="justify">
                Vielyf te ofrece la oportunidad de cambiar tu vida y la de los demas a traves de herramientas 
                que conecten a nutriologos con sus clientes, si eres nutriologo y quieres administrar mejor 
                la comunicacion con tus clientes o estas en busca de cambiar tu estilo de vida con ayuda de 
                un profecional, te ofrecemos lo mejor para cumplir tus metas.
              </p>
            </div>
          </div>
        </div>
          <div className="back-color">
          <div className="container Title-containers">
          <h3>As Nutritionist User </h3>
          <hr width= "50%"/>
          </div>
          <div className="container Content-containers">
          <div className = "row justify-content-around">
            <div className = "col-4 text-center">
              <img src="https://image.flaticon.com/icons/svg/944/944034.svg" width= "80px" height="80px" className="img-thumbnaill"/>
              <h2>Conect with your clients</h2>
              <p align="justify">
                Conectate con todos tus pacientes de forma eficiente y desde cualquier lugar,
                con ayuda de esta plataforma podras gestionar tus consultas y los expedientes de tus pacientes
              </p>
            </div>
            <div className = "col-4 text-center">
            <img src="https://image.flaticon.com/icons/svg/79/79649.svg" width= "80px" height="80px" className="img-thumbnaill"/>
              <h2>Organize your time</h2>
              <p align="justify">
                Con las opciones de agenda podras organizar tus citas de manera rapida y eficaz
              </p>
            </div>
            <div className = "col-4 text-center">
            <img src="https://image.flaticon.com/icons/svg/79/79575.svg" width= "80px" height="80px" className="img-thumbnaill"/>
              <h2>Get new clients</h2>
              <p align="justify">
                Con nuestro catalogo de nutriologos podras ser encontrado por clientes potenciales que esten en busca de 
                cambiar sus vidas
              </p>
            </div>
          </div>
          </div>
          </div>
          <div className="container Title-containers">
          <h3>As Normal User</h3>
          <hr width= "50%"/>
          </div>
          <div className="container Content-containers">
          <div className = "row justify-content-around">
            <div className = "col-5  text-center">
            <img src="https://image.flaticon.com/icons/svg/858/858181.svg" width= "80px" height="80px" className="img-thumbnailll"/>
              <h2>Check your progress</h2>
              <p align="justify">
                Observa tu progreso de forma facil y entendible con ayuda de las graficas de progreso que comparan tus cambios 
                en cada analisis que tu nutriologo registre
              </p>
            </div>
            <div className = "col-5  text-center">
            <img src="https://image.flaticon.com/icons/svg/838/838668.svg" width= "80px" height="80px" className="img-thumbnailll"/>
              <h2>Find your nutritionist</h2>
              <p align="justify">
                Comienza un nuevo y mejor cambio en tu vida de la manera mas amigable posible, aqui podras encontrar 
                nutriologos que te ayuden a cumplir tus metas.
              </p>
            </div>
            </div>
          </div>
          <div className="back-color ">
          <div className="container Title-containers">
            <h3>Nutritionist Catalog</h3>
            <hr width= "50%"/>
          </div>
          <div className="container Content-containers">
            <div className="col-md-8 offset-md-2">
              <p align="justify">
                Encuentra a tu nutriologo ideal en nuestra seccion de catalogo de nutriologos
              </p>
            </div>
            <br/>
            <div className = "row justify-content-around">
              <div className = "col-3 text-center">
                <img src="https://image.flaticon.com/icons/svg/145/145849.svg" width= "180px" height="180px" className="img-thumbnaill"/>
              </div>
              <div className = "col-3 text-center">
                <img src="https://image.flaticon.com/icons/svg/145/145848.svg" width= "180px" height="180px" className="img-thumbnaill"/>
              </div>
              <div className = "col-3 text-center">
                <img src="https://image.flaticon.com/icons/svg/145/145843.svg" width= "180px" height="180px" className="img-thumbnaill"/>
              </div>
            </div>
            <a className="btn btn-danger" id="BtnGo"href="/catalogueNutriologist">Go Catalog</a>
          </div>

            <div className="img-bg3">
            <div className="container TitleBlog-containers">
              <h3 style={{color: "rgba(232, 246, 247, 0.863)"}}>Healthy Blog</h3>
              <hr width= "50%"/>
            </div>
            <div className="container">
              <div className="col-md-8 offset-md-2">
                <font color="White" size="4">
                  <p align="justify">
                    Encuentra las noticias mas relevantes para tu nuevo estilo de vida mas saludable
                    mira tendencias y recomendaciones a diario 
                  </p>
                </font>
              </div>
              <a className="btn btn-danger" id="BtnGo"href="/nutritionalBlog">Go Blog</a>
            </div>
          </div> 

          
          </div>
        </form>
        </div>
      </div>
    );
  }
}

export default Home;
