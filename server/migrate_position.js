const sqlite3 = require('sqlite3').verbose();
const path = require('path');

const dbPath = path.resolve(__dirname, 'portfolio.db');
const db = new sqlite3.Database(dbPath);

db.serialize(() => {
    console.log("Checking if 'position' column exists...");
    db.all("PRAGMA table_info(items)", (err, rows) => {
        if (err) {
            console.error(err);
            return;
        }

        const hasPosition = rows.some(r => r.name === 'position');
        if (hasPosition) {
            console.log("'position' column already exists.");
        } else {
            console.log("Adding 'position' column...");
            db.run("ALTER TABLE items ADD COLUMN position INTEGER DEFAULT 0", (err) => {
                if (err) {
                    console.error("Error adding column:", err);
                } else {
                    console.log("Column 'position' added successfully.");
                }
            });
        }
    });
});
