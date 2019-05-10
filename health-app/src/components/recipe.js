import React from 'react';
import { Component } from 'react';

import { FaHourglassStart, FaUtensils, FaGripfire } from 'react-icons/fa';
import pannukakku from '../images/pannukakku.jpg';

import '../styles/styles.css';

class FoodRecipes extends Component {
  render() {
    console.log(this.props.match);
    return (
      <div className="col-sm-12">
        <div className="row justify-content-center">
          <div className="col-sm-8">
            <div className="recipesCardContainer">
              <img className="recipeCardImage" src={pannukakku} alt="pannukakku" />
              <p className="recipesCardTitle">Pannukakku</p>
              <div className="row justify-content-center">
                <div className="col-sm-4 recipeBodyItems">
                  <ul className="list">
                    <li>4 kananmunaa</li>
                    <li>1 l maitoa</li>
                    <li>5½ dl vehnäjauhoja</li>
                    <li>2 rkl sokeria</li>
                    <li>1 tl suolaa</li>
                    <li>50 g voita sulatettuna</li>
                  </ul>
                </div>
                <div className="col-sm-4 recipeBodyItems">
                  <p>Vatkaa munien rakenne rikki kulhossa. Vatkaa joukkoon maito, jauhot, sokeri suola ja voi.
                     Anna taikinan turvota noin 30 minuuttia.
                     levitä korkeareunaiselle pellille leivinpaperi ja kaada sen päälle taikina.
                     Paista uunissa 225 asteessa noin 30 minuuttia, kunnes pannukakku on kullanruskea ja hyytynyt.
                     Tarjoa sokerin ja hillon kera.
                  </p>
                </div>
              </div>
              <div className="col-sm-12">
                <div className="row justify-content-center">
                  <p className="infoItem">45 min <FaHourglassStart /></p>
                  <p className="infoItem">3 annosta <FaUtensils /></p>
                  <p className="infoItem">225° <FaGripfire /></p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default FoodRecipes;
