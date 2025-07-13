import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import mqtt from "mqtt";
import { useRef } from 'react';



export default function PaymentSuccess() {

    
  const { tranId } = useParams();
  const navigate = useNavigate();


  const location = useLocation(); // Get location object
  const queryParams = new URLSearchParams(location.search); // Parse query parameters
  const id = queryParams.get('id');
  const quantity = queryParams.get('quantity');

//new mqtt code 
// useEffect(() => {
//   if (id && quantity) {
//     console.log("ID:", id, "Quantity:", quantity);

//     // Connect to the MQTT broker
//     const client = mqtt.connect("ws://broker.hivemq.com:8000/mqtt"); // Use local broker URL if available

//     client.on("connect", () => {
//       console.log("Connected to MQTT broker");

//       // Prepare the payload
//       const payload = JSON.stringify({
//         id: parseInt(id),
//         quantity: parseInt(quantity),
//       });

//       // Publish to the command topic
//       const topic = "vendingMachine/Onlineverify";
//       if (client.connected) {
//         client.publish(topic, payload, (err) => {
//           if (err) {
//             console.error("Error publishing MQTT message:", err);
//           } else {
//             console.log("MQTT message sent:", payload);
//           }
//         });
//       }
//     });

//     // Subscribe to status topic
//     const statusTopic = "vending_machine/status";
//     client.on("connect", () => {
//       if (client.connected) {
//         client.subscribe(statusTopic, (err) => {
//           if (err) {
//             console.error("Error subscribing to status topic:", err);
//           } else {
//             console.log(`Subscribed to topic: ${statusTopic}`);
//           }
//         });
//       }
//     });

//     // Handle incoming messages
//     client.on("message", (topic, message) => {
//       if (topic === statusTopic) {
//         try {
//           const data = JSON.parse(message.toString());
//           console.log("Received status message:", data);

//           if (data.id === parseInt(id) && data.status === "dispensed") {
//             console.log(`Dispensing completed for ID: ${data.id}, Quantity: ${data.quantity}`);
//             navigate("/ProductDispand");
//           }
//         } catch (err) {
//           console.error("Error parsing MQTT message:", err);
//         }
//       }
//     });

//     // Handle errors
//     client.on("error", (error) => {
//       console.error("MQTT connection error:", error);
//     });

//     // Clean up MQTT connection on component unmount
//     return () => {
//       if (client.connected) {
//         client.end(true);
//       }
//     };
//   }
// }, [id, quantity, navigate]);




const prevId = useRef(null);
const prevQuantity = useRef(null);

useEffect(() => {
  if (id && quantity) {
    if (prevId.current === id && prevQuantity.current === quantity) {
      console.log("Duplicate request avoided.");
      return; // একই রিকোয়েস্ট এড়ানো হচ্ছে
    }
    prevId.current = id;
    prevQuantity.current = quantity;

    console.log("ID:", id, "Quantity:", quantity);

    const sendToESP = async () => {
      try {
        //basar wifi           192.168.0.115
        //iphone  esp ip       172.20.10.10
        const response = await fetch("http://172.20.10.10/Onlineverify", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            id: parseInt(id),
            quantity: parseInt(quantity),
          }),
        });

        if (!response.ok) {
          console.error("HTTP Error:", response.status, response.statusText);
          return;
        }

        const espData = await response.json();
        if (espData.message) {
          console.log("ESP Response:", espData.message);
          navigate("/ProductDispand");
        } else {
          console.warn("Unexpected ESP Response:", espData);
        }
      } catch (error) {
        console.error("Error in sending to ESP:", error);
      }
    };

    sendToESP();
  }
}, [id, quantity]);


  const handleGoHome = () => {
    navigate("/"); // Navigate to the home page ("/")
  };

  return (
    <div
  style={{
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "100vh",
    // background: "linear-gradient(135deg, #e7f9ed,rgb(255, 255, 255))",
    fontFamily: "'Poppins', Arial, sans-serif",
  }}
>
  <div
    style={{
      textAlign: "center",
      backgroundColor: "#28a745",
      color: "white",
      padding: "30px 25px",
      borderRadius: "20px",
      boxShadow: "0 6px 12px rgba(0, 0, 0, 0.3)",
      maxWidth: "500px",
      animation: "fadeIn 1s ease-in-out",
    }}
  >
    <p style={{ fontSize: "2rem", fontWeight: "700", margin: "0" }}>
      🎉 আপনার পেমেন্ট সফল হয়েছে!
    </p>
    <p style={{ fontSize: "1rem", margin: "15px 0 10px" }}>
      ধন্যবাদ আমাদের সেবা ব্যবহারের জন্য!
    </p>
    <p
      style={{
        marginTop: "15px",
        fontSize: "1.2rem",
        color: "#e0ffe7",
      }}
    >
      আপনার লেনদেন আইডি: <strong>{tranId}</strong>
    </p>
    <div
      style={{
        marginTop: "20px",
        fontSize: "3rem",
        color: "#ffffff",
        textShadow: "0 2px 4px rgba(0, 0, 0, 0.2)",
      }}
    >
      🥳
    </div>
    <button
      onClick={handleGoHome}
      style={{
        marginTop: "30px",
        padding: "12px 30px",
        backgroundColor: "#ffffff",
        color: "#28a745",
        fontSize: "1rem",
        fontWeight: "600",
        border: "none",
        borderRadius: "25px",
        cursor: "pointer",
        boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
        transition: "transform 0.3s, background-color 0.3s",
      }}
      onMouseEnter={(e) => {
        e.target.style.backgroundColor = "#e7f9ed";
        e.target.style.transform = "scale(1.05)";
      }}
      onMouseLeave={(e) => {
        e.target.style.backgroundColor = "#ffffff";
        e.target.style.transform = "scale(1)";
      }}
    >
      Go Home
    </button>
  </div>
</div>

  );
}