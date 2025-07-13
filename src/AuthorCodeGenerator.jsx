import React, { useState } from 'react';

export default function AuthorCodeGenerator() {
    const [inputNumber, setInputNumber] = useState();

    // Handle form submission
    const handleSubmit = (e) => {
        e.preventDefault(); // Prevent page reload
        console.log("Generating QR Codes:", inputNumber);
        fetch("http://172.20.10.5:5000/generate", {
            method:"POST",
            headers:{
                "content-type":"application/json",
            },
            body:JSON.stringify({count:inputNumber }),
        })
    };

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
                    <div
    style={{
        width: "100%",
        height: "85%",
        background: "linear-gradient(135deg, #009bad, #005f75)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        borderBottomLeftRadius: "20px",
        borderBottomRightRadius: "20px",
        padding: "20px",
    }}
>
    {/* Form */}
    <form
        onSubmit={handleSubmit}
        style={{
            width: "85%",
            maxWidth: "500px",
            backgroundColor: "#ffffff",
            borderRadius: "15px",
            boxShadow: "0 10px 20px rgba(0, 0, 0, 0.25)",
            padding: "30px",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            textAlign: "center",
        }}
    >
        {/* Input Section */}
        <h2 style={{ fontSize: "1.5rem", fontWeight: "bold", color: "#333", marginBottom: "15px" }}>
            🎯 Generate QR Codes
        </h2>
        <label
            className="form-label"
            style={{
                fontSize: "1.2rem",
                fontWeight: "500",
                color: "#444",
                marginBottom: "10px",
            }}
        >
            Enter Number of QR Codes:
        </label>
        <input
            type="number"
            className="form-control mb-3 text-center"
            style={{
                fontSize: "1.2rem",
                width: "100%",
                padding: "12px",
                borderRadius: "8px",
                border: "1px solid #ccc",
                boxShadow: "inset 0 2px 5px rgba(0, 0, 0, 0.1)",
                textAlign: "center",
            }}
            placeholder="Enter a number"
            value={inputNumber}
            onChange={(e) => setInputNumber(Math.max(0, parseInt(e.target.value) || 0))}
            required
        />
        <button
            type="submit"
            className="btn btn-primary btn-lg w-100"
            style={{
                fontSize: "1.2rem",
                background: "linear-gradient(135deg, #007bff, #0056b3)",
                border: "none",
                padding: "12px",
                borderRadius: "8px",
                fontWeight: "bold",
                transition: "0.3s",
            }}
            onMouseOver={(e) => (e.target.style.opacity = "0.85")}
            onMouseOut={(e) => (e.target.style.opacity = "1")}
        >
            🚀 Generate QR Codes
        </button>
    </form>
</div>

                </div>
            </div>
        </>
    );
}
