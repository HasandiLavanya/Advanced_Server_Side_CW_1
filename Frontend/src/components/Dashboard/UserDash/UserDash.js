import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../UserDash/UserDash.css";

const UserDashboard = () => {
    const [apiKeys, setApiKeys] = useState([]);
    const [selectedApiKey, setSelectedApiKey] = useState(null);
    const [country, setCountry] = useState("");
    const [countryData, setCountryData] = useState(null);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const username = localStorage.getItem("username") || "User";

    useEffect(() => {
        fetchApiKeys();
      }, []);
    
      // Fetch user's available API keys
      const fetchApiKeys = async () => {
        try {
          const response = await axios.get("http://localhost:3000/auth/get-api-keys", {
            withCredentials: true
          });
    
          if (response.data.apiKeys.length > 0) {
            setApiKeys(response.data.apiKeys);
          } else {
            console.log("No API keys found for this user.");
          }
        } catch (error) {
          console.error("Error fetching API keys:", error);
        }
      };

      const fetchCountryData = async () => {
        if (!selectedApiKey) {
          toast.warn("Please select an API key first!");
          return;
        }
      
        if (!country || country.trim() === "") {
          toast.warn("Enter a country name!");
          return;
        }
      
        setLoading(true);
      
        try {
          const response = await axios.get(`http://localhost:3000/countries/${country}`, {
            withCredentials: true,
            headers: {
              "x-api-key": selectedApiKey
            }
          });
      
          setCountryData(response.data);
        } catch (error) {
          toast.error("Country not found or API issue.");
        }
      
        setLoading(false);
      };