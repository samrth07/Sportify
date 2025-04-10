const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  googleId: { type: String, unique: true },
  email: { type: String, unique: true },
  name: String,
  role: {
    type: String,
    enum: ['admin', 'user'],
    default: 'user'
  }
});

module.exports = mongoose.model("User", userSchema);
