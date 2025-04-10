const express = require("express");
const passport = require("passport");
const router = express.Router();

// Google login
router.get("/auth/google", passport.authenticate("google", { scope: ["profile", "email"] }));

// Google callback
router.get(
  "/auth/google/callback",
  passport.authenticate("google", { failureRedirect: "/login" }),
  (req, res) => {
    res.redirect("/dashboard");
  }
);

// Logout
router.get("/logout", (req, res) => {
  req.logout(() => {
    res.redirect("/");
  });
});

module.exports = router;
