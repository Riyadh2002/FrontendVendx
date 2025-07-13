import React from 'react'
import { useNavigate } from 'react-router-dom'

export default function InsufficientStock() {
    const navigate=useNavigate();
  return (
    <div>
  <div
    style={{
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      height: "100vh",
      fontFamily: "'Poppins', Arial, sans-serif",
      backgroundColor: "#f4f4f4", // Neutral light background
    }}
  >
    <div
      style={{
        textAlign: "center",
        backgroundColor: "white", // White background for the message box
        color: "#333", // Dark text for readability
        padding: "40px 35px",
        borderRadius: "15px",
        boxShadow: "0 8px 15px rgba(0, 0, 0, 0.1)",
        maxWidth: "500px",
        animation: "fadeIn 1s ease-in-out",
        wordWrap: "break-word",
      }}
    >
      <p style={{ fontSize: "2rem", fontWeight: "700", margin: "0" }}>
        পণ্যটি উপলব্ধ নেই
      </p>
      <p style={{ fontSize: "1.1rem", margin: "20px 0", fontWeight: "500" }}>
        দুঃখিত, আপনি যে পণ্যটি চেয়েছেন তা বর্তমানে স্টকে নেই।
      </p>
      <p style={{ fontSize: "1rem", marginTop: "15px", fontStyle: "italic" }}>
        দয়া করে পরে আবার চেষ্টা করুন অথবা অন্য পণ্য নির্বাচন করুন।
      </p>

      <div style={{ marginTop: "30px" }}>
        <button
          onClick={() => navigate("/")}
          style={{
            padding: "12px 35px",
            backgroundColor: "#28a745", // Green background for positivity
            color: "white",
            fontSize: "1rem",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
            boxShadow: "0 5px 10px rgba(0, 0, 0, 0.2)",
            transition: "background-color 0.3s ease",
          }}
          onMouseEnter={(e) => (e.target.style.backgroundColor = "#218838")}
          onMouseLeave={(e) => (e.target.style.backgroundColor = "#28a745")}
        >
          হোমে যান
        </button>
      </div>

      <div style={{ marginTop: "20px", color: "#555", fontSize: "1rem" }}>
        <p>যেকোনো সাহায্যের জন্য আমাদের সাথে যোগাযোগ করুন: <strong>sriyadh2002@gmail.com</strong></p>
      </div>
    </div>
  </div>
</div>



  )
}
