const sqlite3 = require('sqlite3').verbose();
const path = require('path');

const dbPath = path.resolve(__dirname, 'portfolio.db');
const db = new sqlite3.Database(dbPath);

db.serialize(() => {
    console.log("Checking 'items' table schema:");
    db.all("PRAGMA table_info(items)", (err, rows) => {
        if (err) {
            console.error(err);
            return;
        }
        console.table(rows);

        const hasPosition = rows.some(r => r.name === 'position');
        console.log("Has 'position' column:", hasPosition);
    });

    console.log("\nChecking first 5 items:");
    db.all("SELECT id, title, position FROM items LIMIT 5", (err, rows) => {
        if (err) {
            console.error(err);
            return;
        }
        console.table(rows);
    });
});
