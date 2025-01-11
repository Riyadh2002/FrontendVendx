import React from 'react'
import { useState } from 'react';
import { useEffect } from 'react';

export default function newHome() {
  const [time, setTime] = useState(new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }));
  const [date, setDate] = useState(new Date().toLocaleDateString());

  // Update time and date every minute (since seconds are excluded)
  useEffect(() => {
    const interval = setInterval(() => {
      setTime(new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }));
      setDate(new Date().toLocaleDateString());
    }, 60000); // Update every minute to avoid showing seconds

    return () => clearInterval(interval); // Cleanup the interval on unmount
  }, []); // Empty dependency array to run once when the component mounts
  return (
    <>

      <div className="container-fluid d-flex justify-content-center align-items-center" style={{ height: '100vh', fontFamily: 'Arial, sans-serif' }}>
        <div style={{ width: '600px', height: '100vh' }}>
          {/* Top 15% div */}
          <div style={{ height: '15%', display: 'flex', backgroundColor: '#009bad', color: 'white', padding: '10px', flexDirection: 'row' }}>
            {/* Left side: VEND-X */}
            <div style={{ flex: '0 0 60%' }} className="d-flex flex-column justify-content-center">
              <h1 style={{ fontSize: '2.2rem', marginLeft: "30px",marginTop:"15px", fontWeight: 'bold', whiteSpace: 'nowrap' }}>VEND-X</h1>
            </div>

            {/* Right side: Date and Time */}
            <div style={{ flex: '0 0 30%', marginTop:"15px" }} className="d-flex justify-content-center align-items-center">
              {/* Flex container for date and time */}
              <div className="d-flex align-items-center" style={{ whiteSpace: 'nowrap', textAlign: 'center' }}>
                {/* Date and Year on the left side */}
                <span style={{ fontSize: '1.2rem', marginRight: '10px', color: 'white', textOverflow: 'ellipsis', overflow: 'hidden', whiteSpace: 'nowrap' }}>
                  {date}
                </span>

                {/* Separator Bar */}
                <div style={{ width: '2px', height: '20px', backgroundColor: 'white', margin: '0 10px' }} />

                {/* Time without seconds on the right side */}
                <span style={{ fontSize: '2rem', color: 'white', fontWeight: 'bold', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                  {time}
                </span>
              </div>
            </div>
          </div>

          {/* Bottom 85% div */}
          <div style={{ height: '85%', backgroundColor: '#009bad', display: 'flex', justifyContent: 'center', alignItems: 'center',  }}>
  <div
    style={{
      width: '90%',
      height: '95%',
      backgroundColor: '#ffffff',
      borderRadius: '15px',
      boxShadow: '0 8px 16px rgba(0, 0, 0, 0.2)', // Floating shadow effect
      padding: '20px',
    }}
  >
    {/* Carousel Section */}
    <div
      style={{
        height: '35%',
        width: '100%',
        marginBottom: '20px',
        borderRadius: '10px',
        overflow: 'hidden', // Ensures smooth edges for the carousel
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)', // Subtle shadow for floating effect
      }}
    >
      <div id="carouselAds" className="carousel slide" data-bs-ride="carousel">
        <div className="carousel-inner">
          <div className="carousel-item active">
            <img src="https://via.placeholder.com/600x200?text=Ad+1" className="d-block w-100" alt="Ad 1" />
          </div>
          <div className="carousel-item">
            <img src="https://via.placeholder.com/600x200?text=Ad+2" className="d-block w-100" alt="Ad 2" />
          </div>
          <div className="carousel-item">
            <img src="https://via.placeholder.com/600x200?text=Ad+3" className="d-block w-100" alt="Ad 3" />
          </div>
        </div>
      </div>
    </div>

    {/* Card Section */}
    <div
      style={{
        height: '55%',
        backgroundColor: '#ffffff',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <div className="row g-2 h-100" style={{ width: '100%', justifyContent: 'center', alignItems: 'center' }}>
        {cards.map((card) => (
          <div key={card.id} className="col-4 d-flex justify-content-center">
            <div
              className="card"
              style={{
                width: '100px',
                height: '120px',
                borderRadius: '10px',
                overflow: 'hidden',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: '#ffffff',
                boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1), 0 1px 3px rgba(0, 0, 0, 0.08)', // Cool shadow
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
                }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  </div>
</div>


        </div>
      </div>

    </>
  )
}




const cards = [
  { id: 1, title: "Card 1", text: "This is card 1 content.", imgSrc: "https://via.placeholder.com/150" },
  { id: 2, title: "Card 2", text: "This is card 2 content.", imgSrc: "https://via.placeholder.com/150" },
  { id: 3, title: "Card 3", text: "This is card 3 content.", imgSrc: "https://via.placeholder.com/150" },
  { id: 4, title: "Card 4", text: "This is card 4 content.", imgSrc: "https://via.placeholder.com/150" },
  { id: 5, title: "Card 5", text: "This is card 5 content.", imgSrc: "https://via.placeholder.com/150" },
  { id: 6, title: "Card 6", text: "This is card 6 content.", imgSrc: "https://via.placeholder.com/150" },
];