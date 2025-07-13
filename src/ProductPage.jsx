import React, { useEffect, useState } from 'react';

const ProductPage = () => {
  const [time, setTime] = useState('');
  const [date, setDate] = useState('');

  const [products, setProducts] = useState([]);
  
  const [decrement, setdecrement]=useState(0);
  const [increment, setIncrement]=useState(0);

  
  const updateIncrement = (incrementValue, id) => {
    console.log(id);
    fetch("http://localhost:5000/increment", {
      method: "POST",
      headers: {
        "Content-Type": "application/json", // Correct header name for content type
      },
      body: JSON.stringify({ increment: incrementValue , id:id}), // Stringify the object
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.massege === "ok") {
          alert("Increment successful");
        }
      })
      .catch((error) => {
        console.error("Error updating increment:", error);
      });
  };

  useEffect(() => {
    // Set the time and date immediately when the page is loaded
    setTime(new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }));
    setDate(new Date().toLocaleDateString());

    // Fetch product data once when the component is mounted
    fetch("http://localhost:5000/product", {
      method: "GET",
    })
      .then((response) => response.json())
      .then((data) => {
        if (data) {
          setProducts(data);  // Set the fetched products in the state
          console.log(data);   // Log the fetched data
        } else {
          console.log("No products");
        }
      })
      .catch((error) => {
        console.log("Error fetching products:", error);  // Handle any errors
      });
  }, []);

  
  return (
    <>
      <div style={{ padding: '20px', maxWidth: '550px', margin: '0 auto' }}>
      {/* Top UI Section */}
      <div
        style={{
          height: '100px',
          display: 'flex',
          backgroundColor: '#009bad', // Your original color
          color: 'white',
          padding: '5px',
          flexDirection: 'row',
          width: '100%',
          maxWidth: '550px',
          margin: '0 auto',
          boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
          borderRadius: '8px',
          fontFamily: "'Roboto', sans-serif", // Matching the font family used elsewhere
        }}
      >
        {/* Title Section */}
        <div style={{ flex: '0 0 60%' }} className="d-flex flex-column justify-content-center">
          <h1
            style={{
              fontSize: '2rem', // Adjusted for better visibility
              marginLeft: '15px',
              marginTop: '10px',
              fontWeight: 'bold',
              whiteSpace: 'nowrap',
              letterSpacing: '1px',
            }}
          >
            VEND-X
          </h1>
        </div>

        {/* Date and Time Section */}
        <div
          style={{
            flex: '0 0 40%',
            marginTop: '15px',
            paddingRight: '15px',
          }}
          className="d-flex justify-content-end align-items-center"
        >
          <div
            className="d-flex align-items-center"
            style={{ textAlign: 'center', gap: '15px' }}
          >
            <span
              style={{
                fontSize: '1.1rem',
                color: 'white',
                whiteSpace: 'nowrap',
                fontFamily: "'Roboto', sans-serif", // Matching the font family used elsewhere
              }}
            >
              {new Date().toLocaleDateString()}
            </span>
            <div
              style={{ width: '2px', height: '25px', backgroundColor: 'white' }}
            />
            <span
              style={{
                fontSize: '1.7rem',
                color: 'white',
                fontWeight: 'bold',
                whiteSpace: 'nowrap',
                fontFamily: "'Roboto', sans-serif", // Matching the font family used elsewhere
              }}
            >
              {new Date().toLocaleTimeString([], {
                hour: '2-digit',
                minute: '2-digit',
              })}
            </span>
          </div>
        </div>
      </div>

      {/* Product Cards Section */}
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          marginTop: '20px',
          gap: '20px',
          justifyContent: 'center',
        }}
      >
        {products.map((product, index) => (
  <div
    key={index}
    style={{
      padding: '15px', // Reduced padding to make the card more compact
      background: 'linear-gradient(135deg, #6e7dff, #8e44ad)',
      boxShadow: '0 4px 10px rgba(0, 0, 0, 0.2)',
      borderRadius: '10px',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      height: '100px', // Reduced card height for a more compact look
      color: 'white',
    }}
  >
    {/* Image section */}
    <div
      style={{
        width: '60px', // Adjusted image width
        height: '60px', // Adjusted image height
        backgroundColor: '#ccc',
        borderRadius: '8px',
        marginRight: '15px',
        overflow: 'hidden', // Make sure the image fits inside the box
      }}
    >
      <img
        src={product.image || '/path/to/default-image.jpg'} // Use a fallback image if the img is undefined
        alt={product.title} // Use product name as alt text (for accessibility)
        style={{
          width: '100%', // Ensure the image covers the div
          height: '100%',
          objectFit: 'cover', // Maintain aspect ratio and cover the space
        }}
      />
    </div>

    {/* Product Details and Controls */}
    <div
      style={{
        flexGrow: 1,
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
      }}
    >
      <div style={{ flexGrow: 1 }}>
        <h4 style={{ marginBottom: '5px', fontSize: '1rem' }}>{product.name}</h4>
        <p style={{ marginBottom: '10px', fontSize: '0.9rem' }}>
          Quantity: {product.stock}
        </p>
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
        {/* Decrement Button on the Left */}
        <button
          onClick={() => handleUpdateQuantity(product.name, product.quantity - 1)}
          style={{
            padding: '8px 15px',
            backgroundColor: '#e74c3c',
            color: 'white',
            border: 'none',
            borderRadius: '5px',
            cursor: 'pointer',
            transition: 'all 0.3s ease',
          }}
          onMouseOver={(e) => (e.target.style.backgroundColor = '#c0392b')}
          onMouseOut={(e) => (e.target.style.backgroundColor = '#e74c3c')}
        >
          -
        </button>

        {/* Increment Button on the Right */}
        <button
          onClick={() => {
            const newIncrement = product.stock + 1; // Calculate the new increment
    setIncrement(newIncrement); // Update the state
    updateIncrement(newIncrement, index+1); 
          }}
        
          style={{
            padding: '8px 15px',
            backgroundColor: '#2ecc71',
            color: 'white',
            border: 'none',
            borderRadius: '5px',
            cursor: 'pointer',
            transition: 'all 0.3s ease',
          }}
          onMouseOver={(e) => (e.target.style.backgroundColor = '#27ae60')}
          onMouseOut={(e) => (e.target.style.backgroundColor = '#2ecc71')}
        >
          +
        </button>
      </div>
    </div>
  </div>
))}

      </div>
    </div>
    </>
  );
};

export default ProductPage;
