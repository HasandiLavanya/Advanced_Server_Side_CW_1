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