import { useState } from "react";
import { useLocation } from "react-router-dom";

const Payment = () => {
  const dataFromProduct = useLocation();
  const { id, title, quantity, price } = dataFromProduct.state || {}; // Fallback to avoid undefined

  const [confirm, setConfirm] = useState(0);
  const [isOfflineClicked, setIsOfflineClicked] = useState(false);

  if (!id) {
    return <p>Error: No data received!</p>; // Fallback UI for missing data
  }

  const onlineClick = async (id, price, quantity, title) => {
    //basar wifi 192.168.0.115
    //iphone 172.20.10.5
    fetch("http://172.20.10.5:5000/Order",{
      method:"POST",
      headers:{
        "content-type":"application/json",
      },
      body: JSON.stringify({
        id:id,
        price:price,
        quantity:quantity,
        title:title,
      })
    })
    .then((res)=>res.json())
    .then((result) => {
      // Check if URL exists and redirect
      if (result.URL) {
        console.log(result.URL);  // Log the URL for debugging
        window.location.href = result.URL;  // Redirect to the payment gateway
      } else {
        console.error("No URL found in response");
      }
    })
  };
  
  const handleClick = (id, price, quantity) => {
    setIsOfflineClicked(true);
    //basar wifi 192.168.0.115
    //iphone 172.20.10.5
    fetch('http://172.20.10.5:5000/payment', {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id: String(id), // Ensure id is a string
        price: Number(price), // Ensure price is a number
        quantity: Number(quantity), // Ensure quantity is a number
      }),
    })
      .then((response) => {
        console.log("Raw response:", response);
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json(); // Parse JSON from the response
      })
      .then((data) => {
        console.log("Parsed response data:", data);

        // Handle backend response
        if (data.message === "Payment verified and stock updated") {
          console.log("Payment successful!");
          setConfirm(1);
        } else if (data.message) {
          console.log("Payment not successful:", data.message);
          alert(data.message);
          setIsOfflineClicked(false)
        } else {
          console.log("Unexpected response:", data);
        }
      })
      .catch((error) => {
        console.error("Error in fetch:", error);
        alert("An error occurred while processing the payment. Please try again.");
        setIsOfflineClicked(false)
      });
  };

  return (
    <>
      {/* If Offline button is clicked and confirmation is 0, show the waiting message */}
      {confirm === 0 && isOfflineClicked === true ? (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "100vh",
            backgroundColor: "#f8f9fa",
            fontFamily: "Arial, sans-serif",
          }}
        >
          <div
            style={{
              textAlign: "center",
              backgroundColor: "#009bad",
              color: "white",
              padding: "20px",
              borderRadius: "15px",
              boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
              maxWidth: "500px",
            }}
          >
            <p style={{ fontSize: "1.5rem", fontWeight: "bold", margin: "0" }}>
              আপনার টাকা ইনসার্ট করুন
            </p>
            <p style={{ fontSize: "1rem", margin: "10px 0 0" }}>
              দয়া করে টাকা সেন্সরের সামনে সঠিকভাবে ধরে রাখুন।
            </p>
          </div>
        </div>
      ) : confirm === 1 ? (
        // Success confirmation message after payment
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "100vh",
            backgroundColor: "#e7f9ed",
            fontFamily: "Arial, sans-serif",
          }}
        >
          <div
            style={{
              textAlign: "center",
              backgroundColor: "#28a745",
              color: "white",
              padding: "20px",
              borderRadius: "15px",
              boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
              maxWidth: "500px",
            }}
          >
            <p style={{ fontSize: "1.8rem", fontWeight: "bold", margin: "0" }}>
              আপনার পেমেন্ট সফল হয়েছে
            </p>
            <p style={{ fontSize: "1rem", margin: "10px 0 0" }}>
              ধন্যবাদ আমাদের সেবা ব্যবহারের জন্য!
            </p>
            <div
              style={{
                marginTop: "15px",
                fontSize: "2rem",
                color: "#ffffff",
              }}
            >
              🎉
            </div>
          </div>
        </div>
      ) : (
        // Initial UI when the page is first loaded, with payment options
        <div className="container" style={{ height: "100vh", padding: "0" }}>
  {/* Combined Header and Content Section */}
  <div
    style={{
      width: "100%",
      maxWidth: "550px",
      margin: "0 auto",
      boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    }}
  >
    {/* Top Header Section */}
    <div
      style={{
        height: '15%',
        display: 'flex',
        backgroundColor: '#009bad',
        color: 'white',
        padding: '5px',
        flexDirection: 'row',
        width: '100%',
        margin: '0 auto',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
      }}
    >
      <div
        style={{ flex: '0 0 55%' }}
        className="d-flex flex-column justify-content-center"
      >
        <h1
          style={{
            fontSize: '1.8rem',
            marginLeft: '15px',
            marginTop: '10px',
            fontWeight: 'bold',
            whiteSpace: 'nowrap',
            fontFamily: "'Roboto', Arial, sans-serif", // Standard Font Family
          }}
        >
          VEND-X
        </h1>
      </div>

      <div
        style={{
          flex: '0 0 45%',
          marginTop: '10px',
          paddingRight: '15px',
        }}
        className="d-flex justify-content-end align-items-center"
      >
        <div
          className="d-flex align-items-center"
          style={{ textAlign: 'center', gap: '10px' }}
        >
          <span
            style={{
              fontSize: '1rem',
              color: 'white',
              whiteSpace: 'nowrap',
              fontFamily: "'Roboto', Arial, sans-serif", // Standard Font Family
            }}
          >
            {new Date().toLocaleDateString()}
          </span>
          <div
            style={{ width: '2px', height: '20px', backgroundColor: 'white' }}
          />
          <span
            style={{
              fontSize: '1.5rem',
              color: 'white',
              fontWeight: 'bold',
              whiteSpace: 'nowrap',
              fontFamily: "'Roboto', Arial, sans-serif", // Standard Font Family
            }}
          >
            {new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
          </span>
        </div>
      </div>
    </div>

    {/* Main Content Section (Payment Options) */}
    <div
      className="container-fluid d-flex justify-content-center align-items-center"
      style={{
        height: "85%",
        fontFamily: "'Roboto', Arial, sans-serif", // Standard Font Family
        backgroundColor: "#f7f7f7", // Light gray background for outer container
        padding: "30px",
        boxSizing: "border-box",
        backgroundColor: "white", // White background for the content area
      }}
    >
      <div
        style={{
          width: "100%",
          maxWidth: "550px",
          padding: "30px",
          borderRadius: "10px",
          boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
          textAlign: "center",
        }}
      >
        <h3
          style={{
            color: "#007bff",
            fontWeight: "bold",
            marginBottom: "20px",
            fontSize: "24px",
            fontFamily: "'Roboto', Arial, sans-serif", // Standard Font Family
          }}
        >
          Choose Your Payment Method
        </h3>

        <p
          style={{
            color: "#333",
            fontSize: "16px",
            marginBottom: "30px",
            fontWeight: "400",
            fontFamily: "'Roboto', Arial, sans-serif", // Standard Font Family
          }}
        >
          Please select one of the payment options below to proceed with your purchase.
        </p>

        {/* Online Payment Button */}
        <button
          onClick={() => onlineClick(id, price, quantity, title)}
          style={{
            width: "100%",
            padding: "15px",
            marginBottom: "15px",
            border: "2px solid #007bff",
            backgroundColor: "#007bff",
            color: "white",
            fontSize: "18px",
            fontWeight: "600",
            borderRadius: "8px",
            cursor: "pointer",
            transition: "all 0.3s ease",
            boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)",
            fontFamily: "'Roboto', Arial, sans-serif", 
          }}
          onMouseEnter={(e) => {
            e.target.style.backgroundColor = "#0056b3"; // Darken on hover
          }}
          onMouseLeave={(e) => {
            e.target.style.backgroundColor = "#007bff"; // Reset color after hover
          }}
        >
          Online Payment
        </button>

        {/* Offline Payment Button */}
        <button
          onClick={() => handleClick(id, price, quantity)}
          style={{
            width: "100%",
            padding: "15px",
            border: "2px solid #28a745",
            backgroundColor: "#28a745",
            color: "white",
            fontSize: "18px",
            fontWeight: "600",
            borderRadius: "8px",
            cursor: "pointer",
            transition: "all 0.3s ease",
            boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)",
            fontFamily: "'Roboto', Arial, sans-serif", // Standard Font Family
          }}
          onMouseEnter={(e) => {
            e.target.style.backgroundColor = "#218838"; // Darken on hover
          }}
          onMouseLeave={(e) => {
            e.target.style.backgroundColor = "#28a745"; // Reset color after hover
          }}
        >
          Offline Payment
        </button>
      </div>
    </div>
  </div>
</div>





      )}
    </>
  );
};

export default Payment;
