const sqlite3 = require('sqlite3').verbose();
const path = require('path');
const fs = require('fs');

// Ensure database directory exists
const dbPath = process.env.DB_PATH || path.resolve(__dirname, '../../database/radio.db');
const dbDir = path.dirname(dbPath);

if (!fs.existsSync(dbDir)) {
    fs.mkdirSync(dbDir, { recursive: true });
}

const db = new sqlite3.Database(dbPath, (err) => {
    if (err) {
        console.error('Error opening database ' + dbPath, err);
    } else {
        console.log('Connected to the SQLite database.');
        initializeTables();
    }
});

function initializeTables() {
    db.serialize(() => {
        // Users table
        db.run(`CREATE TABLE IF NOT EXISTS users (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            username TEXT UNIQUE,
            email TEXT UNIQUE,
            password_hash TEXT,
            role TEXT DEFAULT 'admin',
            created_at DATETIME DEFAULT CURRENT_TIMESTAMP
        )`);

        // Stream metadata history
        db.run(`CREATE TABLE IF NOT EXISTS stream_metadata (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            title TEXT,
            artist TEXT,
            album TEXT,
            artwork_url TEXT,
            timestamp DATETIME DEFAULT CURRENT_TIMESTAMP
        )`);

        // Stream settings
        db.run(`CREATE TABLE IF NOT EXISTS stream_settings (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            key TEXT UNIQUE,
            value TEXT
        )`);

        // Initialize default settings if empty
        db.get("SELECT count(*) as count FROM stream_settings", (err, row) => {
            if (row && row.count === 0) {
                const stmt = db.prepare("INSERT INTO stream_settings (key, value) VALUES (?, ?)");
                stmt.run('stream_title', 'Radio Uri');
                stmt.run('stream_description', 'The best music 24/7');
                stmt.finalize();
            }
        });
    });
}

module.exports = db;
