const {
    getAllUsersWithKeyCount,
    deleteApiKeyAndUsageByUserId,
    getUnusedApiKeys,
    getApiKeyOwners
} = require("../models/apiKeyModel");

const fetchUnusedApiKeys = (req, res) => {
    const twoDaysAgo = new Date();
    twoDaysAgo.setDate(twoDaysAgo.getDate() - 2);
    const formattedDate = twoDaysAgo.toISOString().slice(0, 19).replace("T", " ");

    getUnusedApiKeys(formattedDate, (err, rows) => {
        if (err) {
            console.error("Database error:", err);
            return res.status(500).json({ error: "Database error" });
        }
        res.json(rows);
    });
};