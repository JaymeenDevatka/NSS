const express = require("express");
const mysql = require("mysql2");
const bcrypt = require("bcrypt");
const multer = require("multer");
const path = require("path");
const jwt = require("jsonwebtoken");
const cors = require("cors");
require("dotenv").config();

const app = express();
app.use(express.json());
app.use(cors());

// Serve uploaded images statically
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// MySQL Database Connection
const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "root",
  database: "user_auth",
});

db.connect((err) => {
  if (err) {
    console.error("MySQL connection failed:", err);
    throw err;
  }
  console.log("✅ MySQL Connected...");
});

// ✅ User Registration (Signup)
app.post("/signup", async (req, res) => {
  const { full_name, email, password } = req.body;
  if (!full_name || !email || !password) {
    return res.status(400).json({ message: "❌ All fields are required" });
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  db.query(
    "INSERT INTO users (full_name, email, password) VALUES (?, ?, ?)",
    [full_name, email, hashedPassword],
    (err, result) => {
      if (err) return res.status(400).json({ error: err.message });
      res.json({ message: "✅ User registered successfully!" });
    }
  );
});


// ✅ User Login (Signin)
app.post("/signin", (req, res) => {
  const { email, password } = req.body;

  db.query("SELECT * FROM users WHERE email = ?", [email], async (err, result) => {
    if (err) return res.status(500).json({ message: "❌ Internal server error" });

    if (result.length === 0) return res.status(401).json({ message: "❌ User not found!" });

    const user = result[0];
    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return res.status(401).json({ message: "❌ Incorrect password!" });
    }

    res.json({
      message: "✅ Login successful!",
      user: { id: user.id, full_name: user.full_name, email: user.email },
    });
  });
});

// // app.post("/login", (req, res) => {
// //   const { email, password } = req.body;
// //   const query = "SELECT * FROM users WHERE email = ?";
  
// //   db.query(query, [email], async (err, results) => {
// //       if (err) return res.status(500).json({ error: "Database error" });
// //       if (results.length === 0) return res.status(401).json({ error: "User not found" });

// //       const user = results[0];
// //       const passwordMatch = await bcrypt.compare(password, user.password);

// //       if (!passwordMatch) return res.status(401).json({ error: "Invalid credentials" });

// //       // Create JWT token with user role
// //       const token = jwt.sign({ id: user.id, role: user.role }, SECRET_KEY, { expiresIn: "1h" });

// //       res.json({ token, role: user.role });
// //   });
// // });

// // Middleware to check user role
// const authenticateUser = (req, res, next) => {
//   const token = req.header("Authorization");
//   if (!token) return res.status(401).json({ error: "Access denied" });

//   try {
//       const decoded = jwt.verify(token.replace("Bearer ", ""), SECRET_KEY);
//       req.user = decoded;
//       next();
//   } catch (error) {
//       res.status(400).json({ error: "Invalid token" });
//   }
// };

// // Protected route (Only for Admins)
// app.get("/admin", authenticateUser, (req, res) => {
//   if (req.user.role !== "admin") {
//       return res.status(403).json({ error: "Access denied" });
//   }
//   res.json({ message: "Welcome Admin!" });
// });


// ✅ Get All Events
app.get("/api/events/all", (req, res) => {
  db.query("SELECT * FROM events", (err, results) => {
    if (err) return res.status(500).json({ error: "Database query error" });
    res.status(200).json(results);
  });
});

// ✅ Create a New Event
app.post("/api/events", (req, res) => {
  const { title, venue, date } = req.body;
  if (!title || !venue || !date) {
    return res.status(400).json({ error: "❌ All fields are required." });
  }

  db.query(
    "INSERT INTO events (title, venue, date) VALUES (?, ?, ?)",
    [title, venue, date],
    (err, result) => {
      if (err) return res.status(500).json({ error: "Database insert error" });
      res.status(201).json({ message: "✅ Event created", id: result.insertId });
    }
  );
});

// ✅ Delete an Event
app.delete("/api/events/:id", (req, res) => {
  const { id } = req.params;
  db.query("DELETE FROM events WHERE id = ?", [id], (err, result) => {
    if (err) return res.status(500).json({ error: "Database delete error" });
    if (result.affectedRows === 0) return res.status(404).json({ message: "❌ Event not found" });

    res.status(200).json({ message: "✅ Event deleted successfully" });
  });
});

// 🟢 Fetch all events
app.get("/api/events/all", (req, res) => {
  db.query("SELECT * FROM events", (err, results) => {
      if (err) return res.status(500).json({ error: err.message });
      res.json(results);
  });
});

// 🟢 Create a new event
app.post("/api/events", (req, res) => {
  const { title, date, venue } = req.body;
  const id = uuidv4();
  const sql = "INSERT INTO events (id, title, date, venue) VALUES (?, ?, ?, ?)";

  db.query(sql, [id, title, date, venue], (err, result) => {
      if (err) return res.status(500).json({ error: err.message });
      res.status(201).json({ id, title, date, venue });
  });
});

// 🟢 Delete an event
app.delete("/api/events/:id", (req, res) => {
  const { id } = req.params;
  db.query("DELETE FROM events WHERE id = ?", [id], (err, result) => {
      if (err) return res.status(500).json({ error: err.message });
      res.json({ message: "Event deleted successfully!" });
  });
});

// 🟢 Register for an event
app.post("/api/register", (req, res) => {
  const { name, email, phone, eventId } = req.body;
  const sql = "INSERT INTO event_registrations (name, email, phone, event_id) VALUES (?, ?, ?, ?)";

  db.query(sql, [name, email, phone, eventId], (err, result) => {
      if (err) return res.status(500).json({ error: err.message });
      res.status(201).json({ message: "Registration successful" });
  });
});

app.get("/api/registrations", (req, res) => {
  db.query("SELECT * FROM registrations", (err, result) => {
      if (err) {
          res.status(500).json({ error: "Error fetching registrations." });
      } else {
          res.json(result);
      }
  });
});

app.delete("/api/registrations/:id", (req, res) => {
  const registrationId = req.params.id;
  db.query("DELETE FROM registrations WHERE id = ?", [registrationId], (err, result) => {
      if (err) {
          res.status(500).json({ error: "Error deleting registration." });
      } else {
          res.json({ message: "Registration deleted successfully." });
      }
  });
});

// ✅ Student Enrollment
app.post("/api/enrollments", (req, res) => {
  const { name, email, event } = req.body;
  if (!name || !email || !event) {
    return res.status(400).json({ error: "❌ All fields are required" });
  }

  db.query(
    "INSERT INTO enrollments (name, email, event) VALUES (?, ?, ?)",
    [name, email, event],
    (err, result) => {
      if (err) return res.status(500).json({ error: "Database insert error" });
      res.status(201).json({ message: "✅ Enrollment successful" });
    }
  );
});

// ✅ Multer Configuration (File Uploads)
const storage = multer.diskStorage({
  destination: "uploads/",
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname)); // Unique filename
  },
});
const upload = multer({ storage });

// ✅ Upload Photo
app.post("/api/upload", upload.single("photo"), (req, res) => {
  if (!req.file) return res.status(400).json({ error: "❌ No file uploaded." });

  const title = req.file.originalname;
  const filename = req.file.filename;
  const uploaded_at = new Date();

  db.query(
    "INSERT INTO photos (title, filename, uploaded_at) VALUES (?, ?, ?)",
    [title, filename, uploaded_at],
    (err, result) => {
      if (err) return res.status(500).json({ error: "Database error" });

      res.status(201).json({
        message: "✅ Photo uploaded successfully",
        photo: { id: result.insertId, title, filename, uploaded_at },
      });
    }
  );
});

// ✅ Get All Photos
app.get("/api/photos", (req, res) => {
  db.query("SELECT * FROM photos", (err, results) => {
    if (err) return res.status(500).json({ error: "Database error" });

    res.status(200).json(
      results.map((photo) => ({
        ...photo,
        url: `http://localhost:8080/uploads/${photo.filename}`,
      }))
    );
  });
});

// Register User
app.post("/api/register", (req, res) => {
  const { name, email, phone, college } = req.body;

  const sql = "INSERT INTO registrations (name, email, phone, college) VALUES (?, ?, ?, ?)";
  db.query(sql, [name, email, phone, college], (err, result) => {
    if (err) {
      console.error("Error inserting data:", err);
      return res.status(500).json({ error: "Registration failed" });
    }
    res.status(201).json({ message: "Registered successfully" });
  });
});

// Get All Registrations
app.get("/api/registrations", (req, res) => {
  const sql = "SELECT * FROM registrations";
  db.query(sql, (err, results) => {
    if (err) {
      return res.status(500).json({ error: "Failed to fetch registrations" });
    }
    res.status(200).json(results);
  });
});

// // Add a new event
// app.post("/api/events/add", (req, res) => {
//   const { title, date, venue } = req.body;
//   const query = "INSERT INTO events (title, date, venue) VALUES (?, ?, ?)";

//   db.query(query, [title, date, venue], (err, result) => {
//       if (err) return res.status(500).json({ error: "Database error" });
//       res.json({ message: "Event added successfully", id: result.insertId });
//   });
// });

// // Delete an event
// app.delete("/api/events/delete/:id", (req, res) => {
//   const eventId = req.params.id;
//   db.query("DELETE FROM events WHERE id = ?", [eventId], (err, result) => {
//       if (err) return res.status(500).json({ error: "Database error" });
//       res.json({ message: "Event deleted successfully" });
//   });
// });


// ✅ Start Server
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
