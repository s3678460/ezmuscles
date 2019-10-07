import React, { Component } from "react";
import logo from "./../logo.svg";
import { Link } from "react-router-dom";
import './ReactApp.css'
export default class ReactApp extends Component {
  render() {
    return (
      <div className="jumbotron">
      <div id="carouselExampleIndicators" className="carousel slide" data-ride="carousel">
      <ol className="carousel-indicators">
        <li data-target="#carouselExampleIndicators" data-slide-to={0} className="active" />
        <li data-target="#carouselExampleIndicators" data-slide-to={1} />
        <li data-target="#carouselExampleIndicators" data-slide-to={2} />
      </ol>
      <div className="carousel-inner" >
        <div className="carousel-item active" >
          <img className="d-block w-100" src="https://cdn-a.william-reed.com/var/wrbm_gb_food_pharma/storage/images/publications/food-beverage-nutrition/nutraingredients-usa.com/article/2018/10/24/amazon-launches-private-label-own-brand-sports-nutrition-line-own-pwr/8759845-1-eng-GB/Amazon-launches-private-label-own-brand-sports-nutrition-line-OWN-PWR_wrbm_large.png" alt="First slide" />
        </div>
        <div className="carousel-item" >
          <img className="d-block w-100" src="http://cdn.powered-by-nitrosell.com/public_html/9/2043/themes/images/slide2.jpg" alt="Second slide" />
        </div>
        <div className="carousel-item" >
          <img className="d-block w-100" src="https://jackednutrition.pk/wp-content/uploads/2017/11/creatine_blog.jpg" alt="Third slide" />
        </div>
        
      </div>
      <a className="carousel-control-prev" href="#carouselExampleIndicators" role="button" data-slide="prev">
        <span className="carousel-control-prev-icon" aria-hidden="true" />
        <span className="sr-only">Previous</span>
      </a>
      <a className="carousel-control-next" href="#carouselExampleIndicators" role="button" data-slide="next">
        <span className="carousel-control-next-icon" aria-hidden="true" />
        <span className="sr-only">Next</span>
      </a>
    </div>
    </div>
    );
  }
}
