const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const { initDatabase, db } = require('./database');
const { authenticateToken, login, updateCredentials } = require('./auth');
const { v4: uuidv4 } = require('uuid');

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(bodyParser.json());

// Initialize Database
initDatabase();

// Auth Routes
app.post('/api/login', login);
app.put('/api/credentials', authenticateToken, updateCredentials);

// Public Routes
app.get('/api/categories', (req, res) => {
    db.all("SELECT * FROM categories", [], (err, categories) => {
        if (err) return res.status(500).json({ error: err.message });

        const promises = categories.map(cat => {
            return new Promise((resolve, reject) => {
                db.all("SELECT * FROM items WHERE category_id = ? ORDER BY position ASC", [cat.id], (err, items) => {
                    if (err) reject(err);
                    else {
                        // Convert is_popular to boolean
                        const parsedItems = items.map(item => ({
                            ...item,
                            isPopular: !!item.is_popular
                        }));
                        resolve({ ...cat, items: parsedItems });
                    }
                });
            });
        });

        Promise.all(promises)
            .then(result => res.json(result))
            .catch(err => res.status(500).json({ error: err.message }));
    });
});

// Protected Routes (Dashboard)

// Create Category
app.post('/api/categories', authenticateToken, (req, res) => {
    const { title, subtitle, emoji } = req.body;
    const id = title.toLowerCase().replace(/\s+/g, '-');

    db.run("INSERT INTO categories (id, title, subtitle, emoji) VALUES (?, ?, ?, ?)",
        [id, title, subtitle, emoji],
        function (err) {
            if (err) return res.status(500).json({ error: err.message });
            res.json({ id, title, subtitle, emoji, items: [] });
        }
    );
});

// Update Category
app.put('/api/categories/:id', authenticateToken, (req, res) => {
    const { title, subtitle, emoji } = req.body;
    const { id } = req.params;

    db.run("UPDATE categories SET title = ?, subtitle = ?, emoji = ? WHERE id = ?",
        [title, subtitle, emoji, id],
        function (err) {
            if (err) return res.status(500).json({ error: err.message });
            res.json({ message: "Category updated" });
        }
    );
});

// Delete Category
app.delete('/api/categories/:id', authenticateToken, (req, res) => {
    const { id } = req.params;
    db.run("DELETE FROM categories WHERE id = ?", [id], function (err) {
        if (err) return res.status(500).json({ error: err.message });
        res.json({ message: "Category deleted" });
    });
});

// Create Item
app.post('/api/items', authenticateToken, (req, res) => {
    const { categoryId, title, description, url, tag, isPopular } = req.body;
    const id = uuidv4();

    // Get max position
    db.get("SELECT MAX(position) as maxPos FROM items WHERE category_id = ?", [categoryId], (err, row) => {
        const position = (row && row.maxPos !== null) ? row.maxPos + 1 : 0;

        db.run("INSERT INTO items (id, category_id, title, description, url, tag, is_popular, position) VALUES (?, ?, ?, ?, ?, ?, ?, ?)",
            [id, categoryId, title, description, url, tag, isPopular, position],
            function (err) {
                if (err) return res.status(500).json({ error: err.message });
                res.json({ id, categoryId, title, description, url, tag, isPopular, position });
            }
        );
    });
});

// Reorder Items
app.put('/api/items/reorder', authenticateToken, (req, res) => {
    const { items } = req.body; // Array of { id, position }

    if (!Array.isArray(items)) {
        return res.status(400).json({ error: "Invalid items array" });
    }

    db.serialize(() => {
        const stmt = db.prepare("UPDATE items SET position = ? WHERE id = ?");
        items.forEach(item => {
            stmt.run(item.position, item.id);
        });
        stmt.finalize((err) => {
            if (err) return res.status(500).json({ error: err.message });
            res.json({ message: "Items reordered" });
        });
    });
});

// Update Item
app.put('/api/items/:id', authenticateToken, (req, res) => {
    const { title, description, url, tag, isPopular } = req.body;
    const { id } = req.params;

    db.run("UPDATE items SET title = ?, description = ?, url = ?, tag = ?, is_popular = ? WHERE id = ?",
        [title, description, url, tag, isPopular, id],
        function (err) {
            if (err) return res.status(500).json({ error: err.message });
            res.json({ message: "Item updated" });
        }
    );
});

// Delete Item
app.delete('/api/items/:id', authenticateToken, (req, res) => {
    const { id } = req.params;
    db.run("DELETE FROM items WHERE id = ?", [id], function (err) {
        if (err) return res.status(500).json({ error: err.message });
        res.json({ message: "Item deleted" });
    });
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
