const db = require("../config/database");

const logAdminAction = (adminId, action, userId) => {
    return new Promise((resolve, reject) => {
        db.run(
            "INSERT INTO admin_logs (admin_id, action, target_user_id, timestamp) VALUES (?, ?, ?, ?)",
            [adminId, action, userId, new Date().toISOString()],
            (err) => {
                if (err) {
                    console.error(" Failed to log admin action:", err.message);
                    reject(err);
                } else {
                    console.log(`Logged admin action: ${action} for user ${userId}`);
                    resolve();
                }
            }
        );
    });
};
