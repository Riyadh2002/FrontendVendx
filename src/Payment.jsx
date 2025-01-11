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

  const handleClick = (id, price, quantity) => {
    setIsOfflineClicked(true);
    fetch('http://localhost:5000/payment', {
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
          <div
            style={{
              height: '15%',
              display: 'flex',
              backgroundColor: '#009bad',
              color: 'white',
              padding: '5px',
              flexDirection: 'row',
              width: '550px',
              margin: '0 auto',
              boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
            }}
          >
            <div style={{ flex: '0 0 55%' }} className="d-flex flex-column justify-content-center">
              <h1 style={{ fontSize: '2.2rem', marginLeft: "30px", marginTop: "15px", fontWeight: 'bold' }}>
                VEND-X
              </h1>
            </div>

            <div style={{ flex: '0 0 30%', marginTop: "15px", paddingRight: "30px" }} className="d-flex justify-content-center align-items-center">
              <div className="d-flex align-items-center" style={{ textAlign: 'center', marginRight: '30px' }}>
                <span style={{ fontSize: '1.2rem', marginRight: '10px', color: 'white' }}>
                  {new Date().toLocaleDateString()}
                </span>
                <div style={{ width: '2px', height: '20px', backgroundColor: 'white', margin: '0 10px' }} />
                <span style={{ fontSize: '2rem', color: 'white', fontWeight: 'bold' }}>
                  {new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </span>
              </div>
            </div>
          </div>

          <div
            className="container-fluid d-flex justify-content-center align-items-center"
            style={{
              height: "85%",
              fontFamily: "Arial, sans-serif",
            }}
          >
            <div
              style={{
                width: "550px",
                height: "100%",
                backgroundColor: "#009bad",
                boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
                padding: "25px",
                paddingTop: "0px",
              }}
            >
              <div
                style={{
                  width: "100%",
                  height: "100%",
                  backgroundColor: "white",
                  borderRadius: '15px',
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  alignItems: "center",
                  padding: "20px",
                }}
              >
                <h3
                  style={{
                    color: "#009bad",
                    fontWeight: "bold",
                    marginBottom: "30px",
                    fontSize: "24px",
                    textAlign: "center",
                  }}
                >
                  Choose your payment type
                </h3>

                <button
                  style={{
                    width: "100%",
                    padding: "15px",
                    marginBottom: "20px",
                    border: "2px solid #009bad",
                    backgroundColor: "transparent",
                    color: "#009bad",
                    fontSize: "18px",
                    fontWeight: "bold",
                    borderRadius: "8px",
                    cursor: "pointer",
                    boxShadow: "0 2px 6px rgba(0, 0, 0, 0.1)",
                  }}
                  onMouseEnter={(e) => {
                    e.target.style.backgroundColor = "#009bad";
                    e.target.style.color = "white";
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.backgroundColor = "transparent";
                    e.target.style.color = "#009bad";
                  }}
                >
                  Online Payment
                </button>

                <button
                  onClick={() => handleClick(id, price, quantity)}
                  style={{
                    width: "100%",
                    padding: "15px",
                    border: "2px solid #009bad",
                    backgroundColor: "transparent",
                    color: "#009bad",
                    fontSize: "18px",
                    fontWeight: "bold",
                    borderRadius: "8px",
                    cursor: "pointer",
                    boxShadow: "0 2px 6px rgba(0, 0, 0, 0.1)",
                  }}
                  onMouseEnter={(e) => {
                    e.target.style.backgroundColor = "#009bad";
                    e.target.style.color = "white";
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.backgroundColor = "transparent";
                    e.target.style.color = "#009bad";
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
