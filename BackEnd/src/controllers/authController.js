const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const db = require("../config/database");
const crypto = require("crypto");
require("dotenv").config();

const register = (req, res) => {
    const { username, password, role, adminSecret } = req.body;
    let userRole = "user";

    if (role === "admin") {
        if (!adminSecret || adminSecret !== process.env.ADMIN_SECRET_KEY) {
            return res.status(403).json({ error: "Invalid admin secret key" });
        }
        userRole = "admin";
    }

    
};