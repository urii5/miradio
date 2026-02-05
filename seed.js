const db = require('./server/config/database');
const bcrypt = require('bcrypt');

const seedAdmin = () => {
    const username = 'admin';
    const email = 'admin@radiouri.com';
    const password = 'adminpassword123'; // Change this!

    bcrypt.hash(password, 10, (err, hash) => {
        if (err) {
            console.error("Error hashing password", err);
            return;
        }

        const stmt = db.prepare("INSERT INTO users (username, email, password_hash, role) VALUES (?, ?, ?, ?)");
        stmt.run(username, email, hash, 'admin', function (err) {
            if (err) {
                if (err.message.includes('UNIQUE')) {
                    console.log("Admin user already exists.");
                } else {
                    console.error("Error creating admin", err);
                }
            } else {
                console.log(`Admin user created.\nEmail: ${email}\nPassword: ${password}`);
            }
            // Close DB properly strictly speaking, but process exit handles it usually
        });
        stmt.finalize();
    });
};

// Wait for DB init
setTimeout(seedAdmin, 1000);
