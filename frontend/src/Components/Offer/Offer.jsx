import React, { useEffect } from "react";
import "./Offer.scss";

import {
  MdAirportShuttle,
  MdBathtub,
  MdKingBed,
  MdLocationOn,
} from "react-icons/md";
import { FaWifi } from "react-icons/fa";
import { BsArrowRightShort } from "react-icons/bs";

import img from "../../assets/anime-style-house-architecture.jpg";

import Aos from 'aos';
import 'aos/dist/aos.css';


const Offers = [
  {
    id: 1,
    imgSrc: img,
    destTitle: "Machu Pichu",
    location: "Peru",
    price: "$7,452",
  },
  {
    id: 2,
    imgSrc: img,
    destTitle: "Guanajuato",
    location: "Mexico",
    price: "$2,452",
  },
  {
    id: 3,
    imgSrc: img,
    destTitle: "Angkor Wat",
    location: "Cambodia",
    price: "$4,400",
  },
];

const Offer = () => {

  useEffect(()=>{
    Aos.init({duration: 2000})
  },[])

  return (
    <section className="offer container section">
      <div className="secContainer">
        <div data-aos="fade-up" data-aos-duration="2000" className="secIntro">
          <h2 className="secTitle text-2xl font-semibold">Special Offers</h2>
          <p>
            From historical cities to natural specteculars, come see the best of
            the world!
          </p>
        </div>

        <div className="mainContent grid">
          {Offers.map(({id,imgSrc,destTitle,location,price}) => {
            return (
              <div data-aos="fade-up" data-aos-duration="1000" className="singleOffer">
                <div className="destImage">
                  <img src={imgSrc} alt={destTitle}/>
                  <span className="discount">30% off</span>
                </div>
                <div className="offerBody">
                  <div className="price flex">
                    <h4>{price}</h4>
                    <span className="status">For Rent</span>
                  </div>
                  <div className="amenities flex">
                    <div className="singleAmenity flex">
                      <MdKingBed className="icon" />
                      <small>2 Beds</small>
                    </div>
                    <div className="singleAmenity flex">
                      <MdBathtub className="icon" />
                      <small>1 Bath</small>
                    </div>
                    <div className="singleAmenity flex">
                      <FaWifi className="icon" />
                      <small>Wi-Fi</small>
                    </div>
                    <div className="singleAmenity flex">
                      <MdAirportShuttle className="icon" />
                      <small>Shuttle</small>
                    </div>
                  </div>

                  <div className="location flex">
                    <MdLocationOn className="icon" />
                    <small>450 Vine #310, {location}</small>
                  </div>

                  <button className="btn flex">
                    View Details
                    <BsArrowRightShort className="icon" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Offer;
