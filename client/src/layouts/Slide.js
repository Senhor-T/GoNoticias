import React, { Component } from "react";
import Slider from "react-slick";

import './Slide.css'

export default class SimpleSlider extends Component {
    render() {
      const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1
      };
      return (
        <div className="slider">
          <h2> Single Item</h2>
          <Slider {...settings}>
            <div>
            <img className='img-top'  alt='img' src='https://files.tecnoblog.net/wp-content/uploads/2021/07/joe-biden-e1627600341297.jpg' />
            </div>
            <div>
            <img className='img-top'  alt='img' src='https://files.tecnoblog.net/wp-content/uploads/2021/07/joe-biden-e1627600341297.jpg' />
            </div>
            <div>
            <img className='img-top'  alt='img' src='https://files.tecnoblog.net/wp-content/uploads/2021/07/joe-biden-e1627600341297.jpg' />
            </div>
            
          </Slider>
        </div>
      );
    }
  }