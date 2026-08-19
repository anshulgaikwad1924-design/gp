const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = 3000;
const DATA_DIR = path.join(__dirname, 'data');
const DB_PATH = path.join(DATA_DIR, 'db.json');

app.use(cors());
app.use(express.json({ limit: '10mb' }));
app.use(express.static(path.join(__dirname))); // Serve static files like index.html, style.css, script.js

// Ensure data directory exists
if (!fs.existsSync(DATA_DIR)) {
  fs.mkdirSync(DATA_DIR);
}

// Ensure db.json exists
if (!fs.existsSync(DB_PATH)) {
  const initialData = {
    users: [],
    requests: [],
    sessions: [],
    notifications: [],
    seeded: false
  };
  fs.writeFileSync(DB_PATH, JSON.stringify(initialData, null, 2), 'utf8');
}

// API endpoint to read data
app.get('/api/db', (req, res) => {
  try {
    const data = fs.readFileSync(DB_PATH, 'utf8');
    res.json(JSON.parse(data));
  } catch (error) {
    console.error('Error reading database:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// API endpoint to overwrite data (simple approach)
app.post('/api/db/update', (req, res) => {
  try {
    fs.writeFileSync(DB_PATH, JSON.stringify(req.body, null, 2), 'utf8');
    res.json({ success: true });
  } catch (error) {
    console.error('Error writing to database:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
