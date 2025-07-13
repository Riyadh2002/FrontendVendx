import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

export default function Newcode() {
    const {newcode} =useParams();
    const [flag, setFlag]=useState(0);
    const [isLoading, setIsLoading] = useState(true);
    useEffect(() => {
        setIsLoading(true); // লোডিং শুরু

        const timer = setTimeout ( () => {
            fetch("http://172.20.10.5:5000/checker", { 
                method: "POST",
                headers: {
                    "content-type": "application/json",
                },
                body: JSON.stringify({ newcode }),
            })
            .then((res) => res.json())
            .then( async (data) => {
                if (data.message === true) {
                    console.log("okay");
                    // setFlag(1);
                    try {
                        //basar wifi           192.168.0.115
                        //iphone  esp ip       172.20.10.10
                        const response = await fetch("http://172.20.10.10/Onlineverify", {
                          method: "POST",
                          headers: {
                            "Content-Type": "application/json",
                          },
                          body: JSON.stringify({
                            id: parseInt(2),
                            quantity: parseInt(1),
                          }),
                        });
                
                        if (!response.ok) {
                          console.error("HTTP Error:", response.status, response.statusText);
                          return;
                        }
                
                        const espData = await response.json();
                        if (espData.message) {
                          console.log("ESP Response:", espData.message);
                          setFlag(1);
                        } else {
                          console.warn("Unexpected ESP Response:", espData);
                        }
                      } catch (error) {
                        console.error("Error in sending to ESP:", error);
                      }
                    
                } else {
                    console.log("not okay");
                    setFlag(0);
                }
            })
            .finally(() => setIsLoading(false)); 
        }, 1000);
        return () => clearTimeout(timer);
    }, [newcode]);
    
  return (
    <>
    {isLoading ? (
                <div className="d-flex flex-column justify-content-center align-items-center vh-100 bg-light">
                <div className="spinner-border text-primary" role="status" style={{ width: "4rem", height: "4rem" }}>
                    <span className="visually-hidden">Loading...</span>
                </div>
                
                <p className="mt-3 fs-5 fw-bold text-dark text-uppercase">
                    ⏳ অনুগ্রহ করে অপেক্ষা করুন...
                </p>
            </div>
            
 ) :  flag === 1 ? (
    <div style={{
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        backgroundColor: "#e6f7ff",
        color: "#005580",
        borderRadius: "12px",
        textAlign: "center",
        fontWeight: "bold",
        fontSize: "20px",
        border: "2px solid #66b3ff",
        padding: "30px",
        boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.2)",
        width: "80%",
        maxWidth: "450px"
      }}>
        <span style={{ fontSize: "40px" }}>🎉🍕🥤</span>  
        <p style={{ margin: "15px 0", fontSize: "22px" }}>আপনার খাবার/পণ্য পড়ে গেছে!</p>
        <p style={{ fontSize: "18px", color: "#004466" }}>দয়া করে আপনার অর্ডারটি সংগ্রহ করুন।</p>
        <hr style={{ margin: "15px 0", border: "1px solid #66b3ff" }} />
        <p style={{ fontSize: "16px", color: "#008000" }}>💖 আমাদের ইভেন্টে অংশগ্রহণ করার জন্য ধন্যবাদ!</p>
      </div>
      
  ) : (
    <div style={{
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        backgroundColor: "#ffe6e6",
        color: "#b30000",
        borderRadius: "12px",
        textAlign: "center",
        fontWeight: "bold",
        fontSize: "20px",
        border: "2px solid #ff4d4d",
        padding: "25px",
        boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.2)",
        width: "80%",
        maxWidth: "400px"
      }}>
        <span style={{ fontSize: "30px" }}>⚠️</span>  
        <p style={{ margin: "10px 0" }}>আপনার কুপনটি ব্যবহার হয়ে গেছে!</p>
      </div>
  )
}
    </>
  )
}
