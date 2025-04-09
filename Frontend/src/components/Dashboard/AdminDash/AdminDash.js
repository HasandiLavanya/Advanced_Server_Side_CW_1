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