


const express = require("express");
const mongoose = require("mongoose");
const session = require("express-session");
const passport = require("passport");
require("dotenv").config({ path: './Auth/.env' });
require("./config/passport");

const app = express();

// DB
mongoose.connect(process.env.MONGO_URI).then(() => console.log("MongoDB connected"));

// Session
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
  })
);

// Passport
app.use(passport.initialize());
app.use(passport.session());

// Routes
app.use(require("./routes/authRoutes"));

// Basic views
app.get("/", (req, res) => {
  res.send(`<h2>Home</h2><a href="/auth/google">Login with Google</a>`);
});

app.get("/login", (req, res) => {
  res.send('<a href="/auth/google">Login with Google</a>');
});

app.get("/dashboard", (req, res) => {
  if (!req.isAuthenticated()) return res.redirect("/login");

  res.send(`<h2>Hello, ${req.user.name} (${req.user.role})</h2>
            <a href="/logout">Logout</a>`);
});

// Start server
const PORT = 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
