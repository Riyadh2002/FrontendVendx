import React, { useEffect, useState } from 'react';

const ProductPage = () => {
  const [time, setTime] = useState('');
  const [date, setDate] = useState('');

  useEffect(() => {
    const interval = setInterval(() => {
      setTime(new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }));
      setDate(new Date().toLocaleDateString());
    }, 60000); // Update every minute to avoid showing seconds

    return () => clearInterval(interval); // Cleanup the interval on unmount
  }, []);

  const products = [
    { id: 1, img: 'image1.jpg', quantity: 10 },
    { id: 2, img: 'image2.jpg', quantity: 5 },
    { id: 3, img: 'image3.jpg', quantity: 3 },
    { id: 4, img: 'image4.jpg', quantity: 7 },
    { id: 5, img: 'image5.jpg', quantity: 8 },
    { id: 6, img: 'image6.jpg', quantity: 2 },
  ];

  return (
    <>
      <div style={{ height: '100vh', display: 'flex', flexDirection: 'column' }}>
        <div style={{ height: '15%', display: 'flex', backgroundColor: '#009bad', color: 'white', padding: '10px', flexDirection: 'row' }}>
          <div style={{ flex: '0 0 55%', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
            <h1 style={{ fontSize: '2.2rem', marginLeft: '30px', marginTop: '15px', fontWeight: 'bold', whiteSpace: 'nowrap' }}>
              VEND-X
            </h1>
          </div>
          <div style={{ flex: '0 0 30%', marginTop: '15px', paddingRight: '30px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <div style={{ display: 'flex', alignItems: 'center', whiteSpace: 'nowrap', textAlign: 'center', marginRight: '30px' }}>
              <span style={{ fontSize: '1.2rem', marginRight: '10px', color: 'white', textOverflow: 'ellipsis', overflow: 'hidden', whiteSpace: 'nowrap' }}>
                {date}
              </span>
              <div style={{ width: '2px', height: '20px', backgroundColor: 'white', margin: '0 10px' }} />
              <span style={{ fontSize: '2rem', color: 'white', fontWeight: 'bold', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                {time}
              </span>
            </div>
          </div>
        </div>

        <div style={{ height: '85%', overflowY: 'scroll', padding: '10px' }}>
          <div className="container">
            <div className="row mt-3">
              {products.map((product) => (
                <div className="col-12 mb-3" key={product.id}>
                  <div className="d-flex flex-row align-items-center">
                    <div className="col-3">
                      <img src={product.img} alt={`Product ${product.id}`} className="img-fluid" />
                    </div>
                    <div className="col-6 text-center">
                      <h5>Quantity: {product.quantity}</h5>
                    </div>
                    <div className="col-3 text-center">
                      <button className="btn btn-primary" onClick={() => window.location.href = `/update/${product.id}`}>Update</button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductPage;
