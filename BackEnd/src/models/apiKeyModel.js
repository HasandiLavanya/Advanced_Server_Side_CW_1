const db = require("../config/database");

const createUser = (username, hashedPassword, role, callback) =>{
    const createDate = new Date.toISOString();
    const lastLoggedDate = createDate;

    db.run(
        `INSERT INTO users (username, password, role, created_at, last_logged_date) VALUES (?, ?, ?, ?, ?)`,
        [username, hashedPassword, role, createdDate, lastLoggedDate],
        function (err){
            callback(err,this ? this.lastID : null);
        }
    );
};

const updateLastLoggedDate = (userId) =>{
    const lastLoggedDate = new Date().toISOString();
    db.run(`UPDATE users SET last_logged_date = ? WHERE id = ?`, [lastLoggedDate, userId]);

};

const findUserByUsername = (username, callback) => {
    db.get("SELECT * FROM users WHERE username = ?", [username], callback);
};

module.exports = { createUser, updateLastLoggedDate, findUserByUsername };