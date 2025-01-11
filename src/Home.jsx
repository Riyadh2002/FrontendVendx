import React, { useState, useEffect, useContext } from 'react';
import { context } from './App';
import { Link } from 'react-router-dom';
import catbary from "../src/img/dairyMilk.jpg";
import Star from "../src/img/5star.jpg";
import Staradd from "../src/img/5starAdd.jpg";
import catBaryAdd from "../src/img/catbaryAdd.jpg";
import patata from "../src/img/patata.jpg";
import patataAdd from "../src/img/patataAdd.jpeg";
import chanacur from "../src/img/chanachur.jpg";
import pan from "../src/img/pan.jpg";
import Kitkat from "../src/img/KitKat.jpg";

export default function Home() {
  const [purchase, setPurchase] = useContext(context);

  const clicked = (data) => {
    setPurchase(data); // Update context with the selected product
  };

  // Carousel state and timing
  const [activeIndex, setActiveIndex] = useState(0);
  const ads = [Staradd, catBaryAdd, patataAdd]; // List of ad images

  // Update the activeIndex every 3 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prevIndex) => (prevIndex + 1) % ads.length); // Loop back to the first slide
    }, 3000); // Change every 3 seconds

    return () => clearInterval(interval); // Cleanup on unmount
  }, [ads.length]);

  return (
    <>
      <div className="container-fluid d-flex justify-content-center align-items-center" style={{ height: '100vh', fontFamily: 'Arial, sans-serif' }}>
        <div style={{ width: '550px', height: '100vh' }}>
          {/* Top 15% div */}
          <div style={{ height: '15%', display: 'flex', backgroundColor: '#009bad', color: 'white', padding: '10px', flexDirection: 'row' }}>
            {/* Left side: VEND-X */}
            <div style={{ flex: '0 0 55%' }} className="d-flex flex-column justify-content-center">
              <h1 style={{ fontSize: '2.2rem', marginLeft: "30px", marginTop: "15px", fontWeight: 'bold', whiteSpace: 'nowrap' }}>VEND-X</h1>
            </div>

            {/* Right side: Date and Time */}
            <div style={{ flex: '0 0 30%', marginTop: "15px", paddingRight: "30px" }} className="d-flex justify-content-center align-items-center">
              {/* Flex container for date and time */}
              <div className="d-flex align-items-center" style={{ whiteSpace: 'nowrap', textAlign: 'center', marginRight: '30px' }}>
                <span style={{ fontSize: '1.2rem', marginRight: '10px', color: 'white', textOverflow: 'ellipsis', overflow: 'hidden', whiteSpace: 'nowrap' }}>
                  {new Date().toLocaleDateString()}
                </span>
                <div style={{ width: '2px', height: '20px', backgroundColor: 'white', margin: '0 10px' }} />
                <span style={{ fontSize: '2rem', color: 'white', fontWeight: 'bold', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                  {new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </span>
              </div>
            </div>
          </div>

          {/* Bottom 85% div */}
          <div style={{ height: '85%', backgroundColor: '#009bad', display: 'flex', justifyContent: 'center', alignItems: 'center', paddingTop:"0px" }}>
            <div style={{ width: '90%', height: '95%', backgroundColor: '#ffffff', borderRadius: '15px', boxShadow: '0 8px 16px rgba(0, 0, 0, 0.2)', padding: '20px', }}>
              {/* Carousel Section */}
              <div style={{ height: '29%', width: '100%', marginBottom: '20px', borderRadius: '10px', overflow: 'hidden', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)' }}>
                <div id="carouselAds" className="carousel slide" data-bs-ride="carousel">
                  <div className="carousel-inner">
                    {ads.map((ad, index) => (
                      <div key={index} className={`carousel-item ${activeIndex === index ? 'active' : ''}`}>
                        <img src={ad} className="d-block mx-auto" alt={`Ad ${index + 1}`} style={{ width: "100%", height: "auto", maxHeight: "170px" }} />
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Card Section */}
              <div style={{ height: '55%', backgroundColor: '#ffffff', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                <div className="row g-2 h-100" style={{ width: '100%', justifyContent: 'center', alignItems: 'center' }}>
                  {cards.map((card) => (
                    <div key={card.id} className="col-4 d-flex justify-content-center">
                      <Link to="/product">
                        <div
                          className="card"
                          onClick={() => clicked(card)}
                          style={{
                            width: '100px',
                            height: '120px',
                            borderRadius: '10px',
                            overflow: 'hidden',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            backgroundColor: '#ffffff',
                            boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
                            cursor: 'pointer',
                          }}
                        >
                          <img
                            src={card.imgSrc}
                            className="card-img-top"
                            alt={`Card ${card.id}`}
                            style={{
                              width: '100%',
                              height: '100%',
                              objectFit: 'cover',
                              borderRadius: '10px',
                              padding:"6px",
                            }}
                          />
                        </div>
                      </Link>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

const cards = [
  { id: 1, title: "Cat Bary", text: "This is card 1 content.", price: 10, imgSrc: catbary },
  { id: 2, title: "Star", text: "This is card 2 content.", price: 10, imgSrc: Star },
  { id: 3, title: "KitKat", text: "Have a break, have a KitKat", price: 20, imgSrc: Kitkat },
  { id: 4, title: "Pran Patata", text: "Crunchy patata.", price: 20, imgSrc: patata },
  { id: 5, title: "BBQ Chanacur", text: "Mix chanacur.", price: 10, imgSrc: chanacur },
  { id: 6, title: "Matadore Pan", text: "Good Ballpan.", price: 10, imgSrc: pan },
];
