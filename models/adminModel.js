const mongoose = require("mongoose");

const adminSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
    },
    email: {
      type: String,
      unique: true,
      match: [
        /^[\w.-]+@[a-zA-Z\d.-]+\.[a-zA-Z]{2,}$/,
        "Please enter a valid email address",
      ],
      required: [true, "Email is required"],
    },
    password: {
      type: String,
      required: [true, "Password is required"],
      //   select: false, // 🚀 Prevents password from being returned in queries by default
    },
    type: {
      type: String,
      required: [true, "Account type is required"],
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Admin", adminSchema);
