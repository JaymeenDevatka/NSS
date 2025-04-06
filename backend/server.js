// const express = require("express");
// const mysql = require("mysql2");
// const nodemailer = require("nodemailer");
// const bodyParser = require("body-parser");
// const cors = require("cors");
// const multer = require("multer");
// const { generateOTP } = require("./otpUtil");
// const { sendOTPEmail } = require("./mailer");
// const PDFDocument = require('pdfkit');
// // const puppeteer = require('puppeteer');
// require("dotenv").config();

// const app = express();

// // Middleware
// app.use(cors());
// app.use(bodyParser.json());

// // DB Connection
// const db = mysql.createConnection({
//   host: "localhost",
//   user: "root",
//   password: "root", // your MySQL password
//   database: "user_auth", // your DB name
// });

// db.connect((err) => {
//   if (err) {
//     console.error("DB Connection Failed:", err);
//   } else {
//     console.log("MySQL Connected ✅");
//   }
// });
// const otpStore = {}; // Use Redis or DB for prod with expiration

// // ✅ Send OTP
// app.post("/send-otp", async (req, res) => {
//   const { email } = req.body;
//   const otp = generateOTP();
//   otpStore[email] = otp;

//   try {
//     await sendOTPEmail(email, otp);
//     res.status(200).json({ 
//       message: "OTP sent to your email ✅",
//       otp: otp // Include OTP in response for debugging (remove in production)
//     });
//   } catch (error) {
//     console.error("OTP email error:", error);
//     res.status(500).json({ message: "Failed to send OTP ❌" });
//   }
// });

// // ✅ Verify OTP
// app.post("/verify-otp", (req, res) => {
//   const { email, otp } = req.body;

//   if (otpStore[email] === otp) {
//     delete otpStore[email];
//     res.status(200).json({ message: "OTP verified ✅" });
//   } else {
//     res.status(400).json({ message: "Invalid OTP ❌" });
//   }
// });

// app.post("/feedback", (req, res) => {
//   const { event_name, rating, comments } = req.body;
//   const sql = "INSERT INTO feedback (event_name, rating, comments) VALUES (?, ?, ?)";
//   db.query(sql, [event_name, rating, comments], (err, result) => {
//     if (err) {
//       console.error("Error saving feedback:", err);
//       return res.status(500).json({ error: "Failed to submit feedback" });
//     }
//     res.status(200).json({ message: "Feedback submitted successfully" });
//   });
// });

// app.post("/signup", (req, res) => {
//   const { full_name, email, password } = req.body;
//   const created_at = new Date();

//   const query = "INSERT INTO users (full_name, email, password, created_at) VALUES (?, ?, ?, ?)";
//   db.query(query, [full_name, email, password, created_at], (err, result) => {
//     if (err) {
//       console.error("DB Error:", err);
//       res.status(500).json({ message: "Registration failed ❌" });
//     } else {
//       res.status(200).json({ message: "User registered successfully ✅" });
//     }
//   });
// });

// // ✅ Sign In
// app.post("/signin", (req, res) => {
//   const { email, password } = req.body;

//   const query = "SELECT * FROM users WHERE email = ? AND password = ?";
//   db.query(query, [email, password], (err, results) => {
//     if (err) {
//       console.error("Login error:", err);
//       return res.status(500).json({ message: "Server error" });
//     }

//     if (results.length === 0) {
//       return res.status(401).json({ message: "Invalid credentials ❌" });
//     }

//     const user = results[0];

//     res.status(200).json({
//       message: "Login successful ✅",
//       user: {
//         id: user.id,
//         full_name: user.full_name,
//         email: user.email,
//         userType: user.userType, // ✅ Include this
//       },
//     });
//   });
// });

// // ✅ Get All Events
// app.get("/api/events/all", (req, res) => {
//   db.query("SELECT * FROM events", (err, results) => {
//     if (err) return res.status(500).json({ error: "Database query error" });
//     res.status(200).json(results);
//   });
// });

// // ✅ Create a New Event
// app.post("/api/events", (req, res) => {
//   const { title, venue, date } = req.body;
//   if (!title || !venue || !date) {
//     return res.status(400).json({ error: "❌ All fields are required." });
//   }


// router.post("/submit-feedback", async (req, res) => {
//   try {
//     const { user_id, event_id, feedback_text, rating } = req.body;

//     // Validation
//     if (!user_id || !event_id || !feedback_text || !rating) {
//       return res.status(400).json({ message: "All fields are required." });
//     }

//     if (rating < 1 || rating > 5) {
//       return res.status(400).json({ message: "Rating must be between 1 and 5." });
//     }

//     // Optional: Check if user attended the event
//     const [reg] = await db.query(
//       "SELECT * FROM registrations WHERE user_id = ? AND event_id = ?",
//       [user_id, event_id]
//     );

//     if (reg.length === 0) {
//       return res.status(403).json({ message: "User not registered for the event." });
//     }

//     // Insert feedback
//     await db.query(
//       "INSERT INTO feedback (user_id, event_id, feedback_text, rating) VALUES (?, ?, ?, ?)",
//       [user_id, event_id, feedback_text, rating]
//     );

//     res.status(200).json({ message: "Feedback submitted successfully!" });
//   } catch (error) {
//     console.error("Feedback Error:", error);
//     res.status(500).json({ message: "Internal server error" });
//   }
// });


//   db.query(
//     "INSERT INTO events (title, venue, date) VALUES (?, ?, ?)",
//     [title, venue, date],
//     (err, result) => {
//       if (err) return res.status(500).json({ error: "Database insert error" });
//       res.status(201).json({ message: "✅ Event created", id: result.insertId });
//     }
//   );
// });

// // ✅ Delete an Event
// app.delete("/api/events/:id", (req, res) => {
//   const { id } = req.params;
//   db.query("DELETE FROM events WHERE id = ?", [id], (err, result) => {
//     if (err) return res.status(500).json({ error: "Database delete error" });
//     if (result.affectedRows === 0) return res.status(404).json({ message: "❌ Event not found" });

//     res.status(200).json({ message: "✅ Event deleted successfully" });
//   });
// });

// // 🟢 Fetch all events
// app.get("/api/events/all", (req, res) => {
//   db.query("SELECT * FROM events", (err, results) => {
//       if (err) return res.status(500).json({ error: err.message });
//       res.json(results);
//   });
// });

// // 🟢 Create a new event
// app.post("/api/events", (req, res) => {
//   const { title, date, venue } = req.body;
//   const id = uuidv4();
//   const sql = "INSERT INTO events (id, title, date, venue) VALUES (?, ?, ?, ?)";

//   db.query(sql, [id, title, date, venue], (err, result) => {
//       if (err) return res.status(500).json({ error: err.message });
//       res.status(201).json({ id, title, date, venue });
//   });
// });

// // 🟢 Delete an event
// app.delete("/api/events/:id", (req, res) => {
//   const { id } = req.params;
//   db.query("DELETE FROM events WHERE id = ?", [id], (err, result) => {
//       if (err) return res.status(500).json({ error: err.message });
//       res.json({ message: "Event deleted successfully!" });
//   });
// });

// // 🟢 Register for an event

// app.get('/:id', async (req, res) => {
//   const { id } = req.params;

//   try {
//     const [rows] = await db.query('SELECT * FROM events WHERE id = ?', [id]);
//     if (rows.length === 0) {
//       return res.status(404).json({ error: 'Event not found' });
//     }
//     res.json(rows[0]);
//   } catch (err) {
//     res.status(500).json({ error: 'Database error' });
//   }
// });




// // ✅ Student Enrollment

// // ✅ Multer Configuration (File Uploads)
// const storage = multer.diskStorage({
//   destination: "uploads/",
//   filename: (req, file, cb) => {
//     cb(null, Date.now() + path.extname(file.originalname)); // Unique filename
//   },
// });
// const upload = multer({ storage });

// // ✅ Upload Photo
// app.post("/api/upload", upload.single("photo"), (req, res) => {
//   if (!req.file) return res.status(400).json({ error: "❌ No file uploaded." });

//   const title = req.file.originalname;
//   const filename = req.file.filename;
//   const uploaded_at = new Date();

//   db.query(
//     "INSERT INTO photos (title, filename, uploaded_at) VALUES (?, ?, ?)",
//     [title, filename, uploaded_at],
//     (err, result) => {
//       if (err) return res.status(500).json({ error: "Database error" });

//       res.status(201).json({
//         message: "✅ Photo uploaded successfully",
//         photo: { id: result.insertId, title, filename, uploaded_at },
//       });
//     }
//   );
// });

// // ✅ Get All Photos
// app.get("/api/photos", (req, res) => {
//   db.query("SELECT * FROM photos", (err, results) => {
//     if (err) return res.status(500).json({ error: "Database error" });

//     res.status(200).json(
//       results.map((photo) => ({
//         ...photo,
//         url: `http://localhost:8080/uploads/${photo.filename}`,
//       }))
//     );
//   });
// });

// const transporter = nodemailer.createTransport({
//   service: "gmail",
//   auth: {
//     user: process.env.EMAIL_USER,
//     pass: process.env.EMAIL_PASS,
//   },
// });
// // Register User
// // Register API
// // Register Route
// app.post("/api/register", (req, res) => {
//   const { name, email, phone, college } = req.body;

//   const sql = "INSERT INTO registrations (name, email, phone, college) VALUES (?, ?, ?, ?)";
//   db.query(sql, [name, email, phone, college], (err, result) => {
//     if (err) {
//       console.error("Insert Error:", err);
//       if (err.code === "ER_DUP_ENTRY") {
//         return res.status(400).json({ message: "Email already registered!" });
//       }
//       return res.status(500).json({ message: "Registration failed!" });
//     }

//     // Send confirmation email
//     const mailOptions = {
//       from: process.env.EMAIL_USER,
//       to: email,
//       subject: "🎉 Registration Confirmation",
//       html: `
//       <h1>Registration Confirmation</h1>
//       <h1>Sent By Jaymeen Devatka</h1>
//         <h2>Hello ${name},</h2>
//         <p>Thank you for registering!</p>
//         <p><strong>📞 Phone:</strong> ${phone}</p>
//         <p><strong>🏫 College:</strong> ${college}</p>
//         <p>We’ll get back to you soon!</p>
//         <br>
//         <p>– Team Event</p>
//         <h2>Charusat * NSS</h2>
//       `,
//     };

//     transporter.sendMail(mailOptions, (emailErr, info) => {
//       if (emailErr) {
//         console.error("Email Send Failed:", emailErr);
//         return res.status(500).json({ message: "Registered, but email failed." });
//       }

//       console.log("Email sent to", email);
//       res.status(201).json({ message: "Registered successfully! Confirmation email sent." });
//     });
//   });
// });


// // Get All Registrations
// app.get("/api/registrations", (req, res) => {
//   db.query("SELECT * FROM registrations", (err, results) => {
//     if (err) {
//       console.error("Error fetching registrations:", err);
//       return res.status(500).json({ error: "Database error" });
//     }
//     res.json(results);
//   });
// });

// app.get('/check-feedback', async (req, res) => {
//   const { id } = req.query;

//   try {
//     const [rows] = await db.query('SELECT * FROM feedback WHERE id = ?', [id]);
//     res.json({ submitted: rows.length > 0 });
//   } catch (err) {
//     res.status(500).json({ error: 'Failed to check feedback' });
//   }
// });

// // Submit feedback
// app.post('/submit-feedback', async (req, res) => {
//   const { event_id, rating, comments } = req.body;

//   try {
//     await db.query(
//       'INSERT INTO feedback (event_id, rating, comments) VALUES (?, ?, ?)',
//       [id, rating, comments]
//     );
//     res.json({ success: true });
//   } catch (err) {
//     res.status(500).json({ error: 'Failed to submit feedback' });
//   }
// });
// // Create a router for feedback endpoints
// const feedbackRouter = express.Router();

// // Check if feedback exists for an event
// feedbackRouter.get('/check-feedback', async (req, res) => {
//   const { id } = req.query;

//   try {
//     const [rows] = await db.query('SELECT * FROM feedback WHERE event_id = ?', [id]);
//     res.json({ 
//       submitted: rows.length > 0,
//       // Include any other data your frontend expects
//       exists: rows.length > 0  // if frontend expects this
//     });
//   } catch (err) {
//     res.status(500).json({ error: 'Failed to check feedback' });
//   }
// });

// app.get("/api/events/:id", async (req, res) => {
//   const { id } = req.params;
//   try {
//     const [rows] = await db.query("SELECT * FROM events WHERE id = ?", [id]);
//     if (rows.length === 0) {
//       return res.status(404).json({ error: "Event not found" });
//     }
//     res.json(rows[0]);
//   } catch (error) {
//     console.error("Failed to get event by ID:", error);
//     res.status(500).json({ error: "Failed to load event details" });
//   }
// });

// // Submit feedback
// feedbackRouter.post('/submit-feedback', async (req, res) => {
//   const { id, rating, comments } = req.body;

//   try {
//     await db.query(
//       'INSERT INTO feedback (event_id, rating, comments) VALUES (?, ?, ?)',
//       [id, rating, comments]
//     );
//     res.json({ success: true });
//   } catch (err) {
//     res.status(500).json({ error: 'Failed to submit feedback' });
//   }
// });

// // ✅ Start Server


// // const app = express();
// const PORT = 8080;

// app.use(cors());
// app.use(bodyParser.json());

// app.use("/api/feedback",feedbackRouter);

// // const PORT = process.env.PORT || 8080;
// app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));

const express = require("express");
const mysql = require("mysql2");
const nodemailer = require("nodemailer");
const bodyParser = require("body-parser");
const cors = require("cors");
const multer = require("multer");
const path = require("path");
const { generateOTP } = require("./otpUtil");
const { sendOTPEmail } = require("./mailer");
const PDFDocument = require("pdfkit");
require("dotenv").config();

const app = express();
const PORT = 8080;

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use("/uploads", express.static("uploads"));

// DB Connection
const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "root",
  database: "user_auth",
});

db.connect((err) => {
  if (err) {
    console.error("DB Connection Failed:", err);
  } else {
    console.log("MySQL Connected ✅");
  }
});

const dbPromise = db.promise();
const otpStore = {}; // Temporary OTP storage

// ==========================
// ✅ OTP Routes
// ==========================
app.post("/send-otp", async (req, res) => {
  const { email } = req.body;
  const otp = generateOTP();
  otpStore[email] = otp;

  try {
    await sendOTPEmail(email, otp);
    res.status(200).json({ message: "OTP sent ✅", otp }); // For testing
  } catch (error) {
    console.error("OTP Email Error:", error);
    res.status(500).json({ message: "Failed to send OTP ❌" });
  }
});

app.post("/verify-otp", (req, res) => {
  const { email, otp } = req.body;

  if (otpStore[email] === otp) {
    delete otpStore[email];
    res.status(200).json({ message: "OTP verified ✅" });
  } else {
    res.status(400).json({ message: "Invalid OTP ❌" });
  }
});

// ==========================
// ✅ Auth Routes
// ==========================
app.post("/signup", (req, res) => {
  const { full_name, email, password } = req.body;
  const created_at = new Date();
  const query = "INSERT INTO users (full_name, email, password, created_at) VALUES (?, ?, ?, ?)";

  db.query(query, [full_name, email, password, created_at], (err) => {
    if (err) return res.status(500).json({ message: "Registration failed ❌" });
    res.status(200).json({ message: "User registered successfully ✅" });
  });
});

app.post("/signin", (req, res) => {
  const { email, password } = req.body;
  const query = "SELECT * FROM users WHERE email = ? AND password = ?";

  db.query(query, [email, password], (err, results) => {
    if (err) return res.status(500).json({ message: "Server error" });
    if (results.length === 0) return res.status(401).json({ message: "Invalid credentials ❌" });

    const user = results[0];
    res.status(200).json({
      message: "Login successful ✅",
      user: {
        id: user.id,
        full_name: user.full_name,
        email: user.email,
        userType: user.userType,
      },
    });
  });
});

// ==========================
// ✅ Event Routes
// ==========================
app.get("/api/events/all", (req, res) => {
  db.query("SELECT * FROM events", (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(results);
  });
});

app.post("/api/events", (req, res) => {
  const { title, venue, date } = req.body;
  if (!title || !venue || !date)
    return res.status(400).json({ error: "All fields are required." });

  db.query("INSERT INTO events (title, venue, date) VALUES (?, ?, ?)", [title, venue, date], (err, result) => {
    if (err) return res.status(500).json({ error: "Database insert error" });
    res.status(201).json({ message: "✅ Event created", id: result.insertId });
  });
});

app.get("/api/events/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const [rows] = await dbPromise.query("SELECT * FROM events WHERE id = ?", [id]);
    if (rows.length === 0) return res.status(404).json({ error: "Event not found" });
    res.json(rows[0]);
  } catch (error) {
    res.status(500).json({ error: "Failed to load event details" });
  }
});

app.delete("/api/events/:id", (req, res) => {
  const { id } = req.params;
  db.query("DELETE FROM events WHERE id = ?", [id], (err) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ message: "✅ Event deleted successfully" });
  });
});

// ==========================
// ✅ File Upload (Multer)
// ==========================
const storage = multer.diskStorage({
  destination: "uploads/",
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});
const upload = multer({ storage });

app.post("/api/upload", upload.single("photo"), (req, res) => {
  if (!req.file) return res.status(400).json({ error: "❌ No file uploaded." });

  const { originalname, filename } = req.file;
  const uploaded_at = new Date();
  db.query(
    "INSERT INTO photos (title, filename, uploaded_at) VALUES (?, ?, ?)",
    [originalname, filename, uploaded_at],
    (err, result) => {
      if (err) return res.status(500).json({ error: "Database error" });
      res.status(201).json({
        message: "✅ Photo uploaded",
        photo: { id: result.insertId, title: originalname, filename, uploaded_at },
      });
    }
  );
});

app.get("/api/photos", (req, res) => {
  db.query("SELECT * FROM photos", (err, results) => {
    if (err) return res.status(500).json({ error: "Database error" });
    res.status(200).json(
      results.map((photo) => ({
        ...photo,
        url: `http://localhost:${PORT}/uploads/${photo.filename}`,
      }))
    );
  });
});

// ==========================
// ✅ Registration
// ==========================
app.post("/api/register", (req, res) => {
  const { name, email, phone, college } = req.body;

  db.query(
    "INSERT INTO registrations (name, email, phone, college) VALUES (?, ?, ?, ?)",
    [name, email, phone, college],
    (err, result) => {
      if (err) {
        if (err.code === "ER_DUP_ENTRY") return res.status(400).json({ message: "Email already registered!" });
        return res.status(500).json({ message: "Registration failed!" });
      }

      const mailOptions = {
        from: process.env.EMAIL_USER,
        to: email,
        subject: "🎉 Registration Confirmation",
        html: `
          <h1>Registration Confirmation</h1>
          <h1>Sent By Jaymeen Devatka</h1>
          <h2>Hello ${name},</h2>
          <p>Thank you for registering!</p>
          <p><strong>📞 Phone:</strong> ${phone}</p>
          <p><strong>🏫 College:</strong> ${college}</p>
          <br><p>– Team Event</p><h2>Charusat * NSS</h2>`,
      };

      const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
          user: process.env.EMAIL_USER,
          pass: process.env.EMAIL_PASS,
        },
      });

      transporter.sendMail(mailOptions, (emailErr) => {
        if (emailErr) return res.status(500).json({ message: "Registered, but email failed." });
        res.status(201).json({ message: "Registered successfully! Email sent ✅" });
      });
    }
  );
});

app.get("/api/registrations", (req, res) => {
  db.query("SELECT * FROM registrations", (err, results) => {
    if (err) return res.status(500).json({ error: "Database error" });
    res.json(results);
  });
});

// ==========================
// ✅ Feedback Routes (Unified)
// ==========================
const feedbackRouter = express.Router();

feedbackRouter.get("/", async (req, res) => {
  const { event_id } = req.query;
  try {
    const [rows] = await dbPromise.query("SELECT * FROM feedback WHERE event_id = ?", [event_id]);
    res.json({ submitted: rows.length > 0, exists: rows.length > 0 });
  } catch (err) {
    res.status(500).json({ error: "Failed to check feedback" });
  }
});

feedbackRouter.post("/", async (req, res) => {
  const { event_id, rating, comments } = req.body;
  try {
    await dbPromise.query(
      "INSERT INTO feedback (event_id, rating, comments) VALUES (?, ?, ?)",
      [event_id, rating, comments]
    );
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: "Failed to submit feedback" });
  }
});

app.use("/api/feedback", feedbackRouter);

// ==========================
// ✅ Start Server
// ==========================
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));

