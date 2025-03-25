const mongoose = require("mongoose");

const roleSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
    },
    codeId: {
      type: String,
      required: [true, "Role code id is required"],
    },
    departmentDesignation: {
      type: String,
      required: [true, "Department Designation is required"],
    }
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Role", roleSchema);