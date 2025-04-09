import { useState, useEffect, useCallback } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../../Dashboard/AdminDash/AdminDash.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const AdminDashboard = () => {
    const [users, setUsers] = useState([]);
    const [unusedApiKeys, setUnusedApiKeys] = useState([]);
    const [apiKeyOwners, setApiKeyOwners] = useState([]);
    const navigate = useNavigate();
    const adminUsername = localStorage.getItem("username") || "Admin";
  
    useEffect(() => {
      fetchUsers();
      fetchUnusedApiKeys();
    }, []);

    const fetchUsers = useCallback(async () => {
        try {
          const response = await axios.get("http://localhost:3000/admin/users", {
            withCredentials: true
          });
      
          const filteredUsers = response.data.filter(user => user.username !== adminUsername);
          setUsers(filteredUsers);
        } catch (error) {
          console.error("Error fetching users:", error);
        }
      }, [adminUsername]);

      const fetchUnusedApiKeys = useCallback(async () => {
        try {
          const response = await axios.get("http://localhost:3000/admin/unused-api-keys", {
            withCredentials: true
          });
      
          setUnusedApiKeys(response.data);
          if (response.data.length > 0) {
            fetchApiKeyOwners(response.data);
          }
        } catch (error) {
          console.error("Error fetching unused API keys:", error);
        }
      }, []);

      const fetchApiKeyOwners = async (unusedKeys) => {
        if (unusedKeys.length === 0) return;
        try {
          const response = await axios.post("http://localhost:3000/admin/api-key-owners", 
            { apiKeys: unusedKeys.map(key => key.api_key) }, 
            { withCredentials: true }
          );
          setApiKeyOwners(response.data);
        } catch (error) {
          console.error("Error fetching API key owners:", error);
        }
      };

      const revokeApiKey = async (userid) => {
        if (!window.confirm("Are you sure you want to revoke this API key?")) return;
        try {
            await axios.delete(`http://localhost:3000/admin/api-key/${userid}`, {
              withCredentials: true
            });
    
            toast.success("API Key Revoked!");
    
            // Remove the revoked key from state
            setUnusedApiKeys((prevKeys) => prevKeys.filter(key => key.user_id !== userid));
    
        } catch (error) {
            console.error("Error revoking API key:", error);
        }
    };

    const getRandomColor = () => {
        const colors = ["#FF5733", "#33FF57", "#5733FF", "#FFC300", "#33FFF3", "#F333FF"];
        return colors[Math.floor(Math.random() * colors.length)];
      };