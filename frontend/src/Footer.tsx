import { useState, useEffect } from "react";
import { WiWindy } from "react-icons/wi";

const Footer = () => {

  const [responseTime,setResponseTime] = useState(null);
  const [apiStatus, setApiStatus] = useState("Checking API");
  const today = new Date();
  const formattedDate = new Intl.DateTimeFormat("en-GB").format(today);

   useEffect(() => {
    const controller = new AbortController();

    async function checkApiSpeed() {
      try {
        const start = performance.now();
        const response = await fetch("https://jsonplaceholder.typicode.com/posts", {
          signal: controller.signal,
        });

        if (!response.ok) {
          throw new Error("API request failed");
        }

        await response.json();
        const end = performance.now();

        setResponseTime((end - start).toFixed(2));
        setApiStatus("API online");
      } catch (error) {
        if (error.name !== "AbortError") {
          setApiStatus("API unavailable");
        }
      }
    }

    checkApiSpeed();

    return () => controller.abort();
  }, []);


  return (
    <footer className="app-footer">
      
      <p>© {new Date().getFullYear()} Market Center Management System</p>
      <span>{formattedDate} </span>
      <span> <WiWindy />{responseTime ? `${responseTime} ms` : apiStatus}</span>
     
    </footer>
  );
};

export default Footer;
