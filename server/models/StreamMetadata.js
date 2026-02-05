const db = require('../config/database');

class StreamMetadata {
    static getCurrent(callback) {
        db.get("SELECT * FROM stream_metadata ORDER BY timestamp DESC LIMIT 1", (err, row) => {
            callback(err, row);
        });
    }

    static update(title, artist, album, artwork_url, callback) {
        const stmt = db.prepare("INSERT INTO stream_metadata (title, artist, album, artwork_url) VALUES (?, ?, ?, ?)");
        stmt.run(title, artist, album, artwork_url, function (err) {
            callback(err, { id: this.lastID, title, artist, album, artwork_url, timestamp: new Date() });
        });
        stmt.finalize();
    }

    static getHistory(limit = 10, callback) {
        db.all("SELECT * FROM stream_metadata ORDER BY timestamp DESC LIMIT ?", [limit], (err, rows) => {
            callback(err, rows);
        });
    }

    static getSettings(callback) {
        db.all("SELECT * FROM stream_settings", (err, rows) => {
            if (err) return callback(err);
            const settings = {};
            rows.forEach(row => {
                settings[row.key] = row.value;
            });
            callback(null, settings);
        });
    }

    static updateSetting(key, value, callback) {
        const stmt = db.prepare("INSERT OR REPLACE INTO stream_settings (key, value) VALUES (?, ?)");
        stmt.run(key, value, function (err) {
            callback(err);
        });
        stmt.finalize();
    }
}

module.exports = StreamMetadata;
