import React from "react";
import "./Card.css";

function Card() {
  return (
    <>
      <div className="card-wrapper">
        <div className="bigcard">
          <div className="title">
            <h4> INTRODUCING </h4>
            <h1>MMT Luxe</h1>
            <h1>Selections</h1>
            <p>
              Escape to the epitome of luxury, packed <br />
              With signature amenities and services
            </p>
            <button>Learn More</button>
          </div>

          <div className="cardsdiv">
            <div className="smallcard">
              <img
                src="https://promos.makemytrip.com/Hotels_product/Luxe/brands.png"
                alt="not found"
              />
              <div className="titleCard">
                <h2>Discover by Brands</h2>
                <p>Taj, Marriott, Oberoi, Hyatt & <br /> More</p>
              </div>
            </div>

            <div className="smallcard">
              <img
                src="https://promos.makemytrip.com/altacco_luxe/imgs/luxe_villa.jpg"
                alt="not found"
              />
              <div className="titleCard">
                <h2>Luxe Vilas</h2>
                <p>Premium Villas with Superlative <br /> Experience</p>
              </div>
            </div>

            <div className="smallcard">
              <img
                src="https://promos.makemytrip.com/Hotels_product/Luxe/themes.png"
                alt="not found"
              />
              <div className="titleCard">
                <h2>Discover by Themes</h2>
                <p>Explore Luxury Stays based on <br /> your interest</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Card;
