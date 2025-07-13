import React, { useContext, useState } from 'react';
import { context } from './App';
import { Link } from 'react-router-dom';


export default function Product() {
  const [purchase] = useContext(context);

//   const handelConfirm = (id, price, quantity) => {
//     fetch('http://localhost:5000/payment', {
//         method: "POST",
//         headers: {
//             "Content-Type": "application/json",
//         },
//         body: JSON.stringify({
//             id: String(id),  // Ensure id is a string
//             price: Number(price),  // Ensure price is a number
//             quantity: Number(quantity),  // Ensure quantity is a number
//         }),
//     })
//         .then((response) => {
//             console.log("Raw response:", response);
//             if (!response.ok) {
//                 throw new Error(`HTTP error! Status: ${response.status}`);
//             }
//             return response.json(); // Parse JSON from the response
//         })
//         .then((data) => {
//             console.log("Parsed response data:", data);

//             // Handle backend response
//             if (data.message === "Payment verified and stock updated") {
//                 console.log("Payment successful!");
//                 alert("Payment successful and stock updated!");
//             } else if (data.message) {
//                 console.log("Payment not successful:", data.message);
//                 alert(data.message);
//             } else {
//                 console.log("Unexpected response:", data);
//             }
//         })
//         .catch((error) => {
//             console.error("Error in fetch:", error);
//             alert("An error occurred while processing the payment. Please try again.");
//         });
// };



  
  

  // Check if p and necessary properties are available
  // ekane 2 bar click hoto.. 
  if (!purchase.name || !purchase.price || !purchase.imgSrc) {
    //ei if diye eita privent kora hoyeche
    if (!window.hasLoggedPurchase) {
      console.log("in product page: ", purchase);
      window.hasLoggedPurchase = true;
    }
  }

  const [quantity, setQuantity] = useState(1);

  const total = purchase && purchase.price 
  ? (parseFloat(purchase.price) * quantity ).toFixed(2)
  : 0;
  const handleIncrement = () => setQuantity((prev) => prev + 1);
  const handleDecrement = () => {
    if (quantity > 1) setQuantity((prev) => prev - 1);
  };

  return (
    <div
  className="container-fluid d-flex justify-content-center align-items-center"
  style={{ height: "100vh", backgroundColor: "#f8f9fa" }}
>
  <div
    style={{
      width: "550px",
      height: "100%",
      backgroundColor: "#009bad",
      borderRadius: "15px",
      boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
      padding: "25px",
    }}
  >
    {/* Inner Div */}
    <div
      style={{
        width: "100%",
        height: "100%",
        backgroundColor: "white",
        borderRadius: "10px",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        position: "relative",
        padding: "20px",
      }}
    >
      {/* Card */}
      <div
        className="card mx-auto"
        style={{
          maxWidth: "300px",
          borderRadius: "10px",
          overflow: "hidden",
          boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
          height: "500px",
          fontFamily: "'Arial', sans-serif",
        }}
      >
        {/* Product Image */}
        <div
          className="card-img-container"
          style={{ height: "60%", overflow: "hidden" }}
        >
          <img
            src={
              purchase.imgSrc ||
              "https://via.placeholder.com/300x150?text=Product+Image"
            }
            className="card-img-top"
            alt="Product"
            style={{ height: "100%", objectFit: "cover" }}
          />
        </div>

        {/* Product Content */}
        <div
          className="card-body bg-white"
          style={{
            borderRadius: "10px",
            height: "50%",
            borderTopLeftRadius: "20px",
            borderTopRightRadius: "20px",
            padding: "20px",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
          }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginBottom: "10px",
            }}
          >
            <h5
              className="card-title text-primary fw-bold"
              style={{
                fontSize: "1.2rem",
                margin: 0,
                fontFamily: "Roboto",
              }}
            >
              {purchase.title || "Default Name"}
            </h5>
            <span
              className="text-success fw-bold"
              style={{ fontSize: "1rem", fontFamily: "Roboto" }}
            >
              In Stock
            </span>
          </div>

          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "flex-start",
              gap: "20px",
            }}
          >
            <div
              style={{ display: "flex", alignItems: "center", gap: "10px" }}
            >
              <strong style={{ fontSize: "0.9rem", fontFamily: "Roboto" }}>
                Quantity:
              </strong>
              <button
                onClick={handleDecrement}
                className="btn btn-outline-primary btn-sm"
                style={{ padding: "0 10px" }}
              >
                -
              </button>
              <span
                style={{
                  fontSize: "1rem",
                  fontWeight: "bold",
                }}
              >
                {quantity}
              </span>
              <button
                onClick={handleIncrement}
                className="btn btn-outline-primary btn-sm"
                style={{ padding: "0 10px" }}
              >
                +
              </button>
            </div>

            <p
              className="card-text"
              style={{
                borderRadius: "30px",
                fontSize: "1rem",
                fontWeight: "bold",
                margin: 0,
                fontFamily: "Roboto",
              }}
            >
              ৳{total || "Default Price"}
            </p>
          </div>

          <Link to="/payment"
                state={{
                  id: purchase.id,
                  title: purchase.title,
                  quantity: quantity,
                  price: total,
                }}>
          <button
          // onClick={() =>
          //   handelConfirm(purchase.id, purchase.price, quantity)
          // }
            className="btn btn-primary w-100 mt-3"
            style={{
              backgroundColor: "#0d47a1",
              border: "none",
              padding: "10px",
              fontFamily: "Roboto",
              borderRadius:"5px",
            }}
          >
            Confirm Purchase
          </button>
          </Link>
        </div>
      </div>

      {/* Back Button */}
      <button
        className="btn btn-outline-secondary"
        onClick={() => window.history.back()}
        style={{
          background:"#009bad",
          color:"white",
          position: "absolute",
          bottom: "20px",
          left: "20px",
          borderColor:"none",
          borderRadius: "20px",
          padding: "5px 15px",
          fontWeight: "bold",
          fontSize: "0.9rem",
        }}
      >
        ← Back
      </button>
    </div>
  </div>
</div>



  );
}
