const db = require("../config/database");
const { getUserByApiKey } = require("../models/apiKeyModel");

const validateApiKey = (req, res, next) => {
    const apiKey = req.headers["x-api-key"];

    if (!apiKey) {
        return res.status(403).json({ error: "API key required in 'x-api-key' header" });
    }