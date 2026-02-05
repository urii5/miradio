const db = require('../config/database');
const bcrypt = require('bcrypt');

class User {
    static create(username, email, password, role = 'admin', callback) {
        bcrypt.hash(password, 10, (err, hash) => {
            if (err) return callback(err);

            const stmt = db.prepare("INSERT INTO users (username, email, password_hash, role) VALUES (?, ?, ?, ?)");
            stmt.run(username, email, hash, role, function (err) {
                callback(err, { id: this.lastID, username, email, role });
            });
            stmt.finalize();
        });
    }

    static findByEmail(email, callback) {
        db.get("SELECT * FROM users WHERE email = ?", [email], (err, row) => {
            callback(err, row);
        });
    }

    static findById(id, callback) {
        db.get("SELECT id, username, email, role, created_at FROM users WHERE id = ?", [id], (err, row) => {
            callback(err, row);
        });
    }

    static verifyPassword(password, hash, callback) {
        bcrypt.compare(password, hash, (err, result) => {
            callback(err, result);
        });
    }
}

module.exports = User;
