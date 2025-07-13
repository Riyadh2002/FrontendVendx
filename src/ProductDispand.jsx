import React from 'react'
import { useNavigate } from 'react-router-dom';


export default function ProductDispand() {

    const navigate=useNavigate();
  return (
    <div>
        <div
  style={{
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "100vh",
    // background: "linear-gradient(135deg, #ffedc1, #ffe0b3)",
    fontFamily: "'Poppins', Arial, sans-serif",
  }}
>
  <div
    style={{
      textAlign: "center",
      backgroundColor: "#ffcc00",
      color: "white",
      padding: "30px 25px",
      borderRadius: "20px",
      boxShadow: "0 6px 12px rgba(0, 0, 0, 0.3)",
      maxWidth: "500px",
      animation: "fadeIn 1s ease-in-out",
    }}
  >
    <p style={{ fontSize: "2rem", fontWeight: "700", margin: "0" }}>
      🎉 পণ্য সফলভাবে বিতরণ করা হয়েছে!
    </p>
    <p style={{ fontSize: "1.2rem", margin: "20px 0 10px" }}>
      আপনার অর্ডার সফলভাবে সম্পন্ন হয়েছে।
    </p>

    <div
      style={{
        marginTop: "20px",
        fontSize: "3rem",
        color: "#ffffff",
        textShadow: "0 2px 4px rgba(0, 0, 0, 0.2)",
      }}
    >
      🛍️
    </div>
    <button
      onClick={()=>navigate("/")}
      style={{
        marginTop: "30px",
        padding: "12px 30px",
        backgroundColor: "#ffffff",
        color: "#ffcc00",
        fontSize: "1rem",
        fontWeight: "600",
        border: "none",
        borderRadius: "25px",
        cursor: "pointer",
        boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
        transition: "transform 0.3s, background-color 0.3s",
      }}
      onMouseEnter={(e) => {
        e.target.style.backgroundColor = "#fffbe6";
        e.target.style.transform = "scale(1.05)";
      }}
      onMouseLeave={(e) => {
        e.target.style.backgroundColor = "#ffffff";
        e.target.style.transform = "scale(1)";
      }}
    >
      হোমে ফিরে যান
    </button>
  </div>
</div>

      
    </div>
  )
}
