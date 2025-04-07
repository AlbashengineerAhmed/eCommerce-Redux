import React, { useState } from "react";
import {Carousel} from "react-bootstrap";
import sliderimg from "../../../images/slider.jpg";
import slider4 from "../../../images/slider4.jpg";
import slider3 from "../../../images/slider3.jpg";
import slider5 from "../../../images/slider5.jpg";
import './Slider.css'
export default function Slider() {
  const [index, setIndex] = useState(0);
  const handleSelect = (selectIndex) => {
    setIndex(selectIndex);
  };
  return (
    <Carousel activeIndex={index} onSelect={handleSelect}>
      <Carousel.Item className="slider-background position-relative" interval={2000}>
        <div className="d-flex flex-row justify-content-center align-items-center">
          <img
            style={{ height: "500px", width: "100%" }}
            className=""
            src={slider4}
            alt="First slide"
          />
          <div className="content-slider">
            <h3 className="slider-title">There is a big discount</h3>
            <p className="slider-text">Up to 50% discount on your purchase</p>
          </div>
        </div>
      </Carousel.Item>
      <Carousel.Item className="slider-background position-relative2" interval={2000}>
        <div className="d-flex flex-row justify-content-center align-items-center">
          <img
            style={{ height: "500px", width: "100%" }}
            className=""
            src={sliderimg}
            alt="First slide"
          />
          <div className="content-slider">
            <h3 className="slider-title">There is a big discount</h3>
            <p className="slider-text">Up to 50% discount on your purchase</p>
          </div>
        </div>
      </Carousel.Item>

      <Carousel.Item className="slider-background position-relative3" interval={2000}>
        <div className="d-flex flex-row justify-content-center align-items-center">
          <img
            style={{ height: "500px", width: "100%" }}
            className=""
            src={slider3}
            alt="First slide"
          />
          <div className="content-slider">
            <h3 className="slider-title">There is a big discount</h3>
            <p className="slider-text">Up to 50% discount on your purchase</p>
          </div>
        </div>
      </Carousel.Item>

      <Carousel.Item className="slider-background position-relative4" interval={2000}>
        <div className="d-flex flex-row justify-content-center align-items-center">
          <img
            style={{ height: "500px", width: "100%" }}
            className=""
            src={slider5}
            alt="First slide"
          />
          <div className="content-slider">
            <h3 className="slider-title">There is a big discount</h3>
            <p className="slider-text">Up to 50% discount on your purchase</p>
          </div>
        </div>
      </Carousel.Item>
    </Carousel>
  );
}
