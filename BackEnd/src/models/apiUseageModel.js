const db = require("../config/database");

const logApiUsage = (userId,endpoint) =>{
    db.run(
        "INSERT INTO api_usage (user_id, endpoint, accessed_at) VALUES (?, ?, ?)",
        [userId, endpoint, new Date().toISOString()]
    )
}

module.exports = { logApiUsage };