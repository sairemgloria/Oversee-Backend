const mongoose = require("mongoose");

const roleSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
    },
    roleIdCode: {
      type: String,
      required: [true, "Description is required"],
    },
    permissions: {
      type: [String],
      required: [true, "Permissions are required"],
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Role", roleSchema);