const bcrypt = require("bcryptjs");
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

// Hash password before saving the admin
adminSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next(); // Only hash if password is new/modified
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

module.exports = mongoose.model("Admin", adminSchema);
