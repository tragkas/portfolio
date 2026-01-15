import sqlite3 from 'sqlite3';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const dbPath = path.resolve(__dirname, 'server/portfolio.db');
const verboseSqlite = sqlite3.verbose();
const db = new verboseSqlite.Database(dbPath);

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
});
