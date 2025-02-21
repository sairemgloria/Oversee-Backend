const mongoose = require("mongoose");

const departmentAdminSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
    },
    email: {
      type: String,
      required: [true, "Email is required"],
    },
    password: {
      type: String,
      required: [true, "Password is required"],
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

module.exports = mongoose.model("departmentAdmin", departmentAdminSchema);
