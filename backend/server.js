const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');
const bodyParser = require('body-parser');
const bcrypt = require('bcryptjs');

const app = express();
app.use(cors());
app.use(bodyParser.json());

// Database connection MySQL
const db = mysql.createConnection({
  host: 'db',
  user: 'root',
  password: 'root',
  database: 'mydb'
});

db.connect(err => {
  if (err) {
    console.log('Database connection failed:', err);
  } else {
    console.log('Connected to MySQL');
  }
});

// Signup Route
app.post('/signup', async (req, res) => {
  const { username, email, password } = req.body;

  const hashedPassword = await bcrypt.hash(password, 10);
  const sql = "INSERT INTO users (username, email, password) VALUES (?, ?, ?)";
  db.query(sql, [username, email, hashedPassword], (err, result) => {
    if (err) return res.status(500).send({ msg: "Signup failed", error: err });
    res.send({ msg: "Signup successful" });
  });
});

// Login Route
app.post('/login', (req, res) => {
  const { email, password } = req.body;

  const sql = "SELECT * FROM users WHERE email = ?";
  db.query(sql, [email], async (err, results) => {
    if (err) return res.status(500).send({ msg: "Login failed", error: err });

    if (results.length === 0) return res.status(400).send({ msg: "User not found" });

    const user = results[0];
    const isMatch = await bcrypt.compare(password, user.password);
    
    if (!isMatch) return res.status(400).send({ msg: "Invalid credentials" });

    res.send({ msg: "Login successful", user: { id: user.id, username: user.username, email: user.email } });
  });
});

app.listen(5000, () => {
  console.log('Server is running on port 5000');
});

