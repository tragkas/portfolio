const sqlite3 = require('sqlite3').verbose();
const bcrypt = require('bcrypt');
const path = require('path');

const dbPath = path.resolve(__dirname, 'portfolio.db');
const db = new sqlite3.Database(dbPath);

const NEW_PASSWORD = 'admin123';
const SALT_ROUNDS = 10;

console.log('Connecting to database at:', dbPath);

db.serialize(() => {
    bcrypt.hash(NEW_PASSWORD, SALT_ROUNDS, (err, hash) => {
        if (err) {
            console.error('Error hashing password:', err);
            return;
        }

        console.log('Password hashed successfully.');

        // Update the admin user (assuming username is 'admin')
        // If 'admin' doesn't exist, we'll update the first user found or create one.

        db.get("SELECT * FROM users WHERE username = 'admin'", (err, row) => {
            if (err) {
                console.error('Error finding user:', err);
                return;
            }

            if (row) {
                console.log('User "admin" found. Updating password...');
                db.run("UPDATE users SET password_hash = ? WHERE username = 'admin'", [hash], function (err) {
                    if (err) {
                        console.error('Error updating password:', err);
                    } else {
                        console.log(`Password updated for user "admin". Rows affected: ${this.changes}`);
                    }
                });
            } else {
                console.log('User "admin" not found. Checking for any user...');
                db.get("SELECT * FROM users LIMIT 1", (err, row) => {
                    if (row) {
                        console.log(`Updating password for user "${row.username}"...`);
                        db.run("UPDATE users SET password_hash = ? WHERE id = ?", [hash, row.id], function (err) {
                            if (err) {
                                console.error('Error updating password:', err);
                            } else {
                                console.log(`Password updated for user "${row.username}". Rows affected: ${this.changes}`);
                            }
                        });
                    } else {
                        console.log('No users found. Creating "admin" user...');
                        db.run("INSERT INTO users (username, password_hash) VALUES (?, ?)", ['admin', hash], function (err) {
                            if (err) {
                                console.error('Error creating user:', err);
                            } else {
                                console.log(`User "admin" created. Rows affected: ${this.changes}`);
                            }
                        });
                    }
                });
            }
        });
    });
});
