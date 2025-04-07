const mongoose = require("mongoose");
const moment = require("moment-timezone");

const departmentSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
    },
    codeId: {
      type: String,
      required: [true, "Department code id is required"],
    },
    date: {
      type: Date,
      required: [true, "Date is required"],
      default: () => moment().tz("Asia/Manila").toDate(), // Store PHT by default
    },
    timeIn: {
      type: Date,
      required: [true, "Time in is required"],
    },
    timeOut: {
      type: Date,
      required: [true, "Time out is required"],
    },
    overtime: {
      type: Date,
      required: [true, "Overtime is required"],
    },
  },
  {
    timestamps: true, // Stores createdAt & updatedAt in UTC
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

// Convert UTC timestamps to PHT when retrieving
departmentSchema.virtual("createdAtPHT").get(function () {
  return moment(this.createdAt).tz("Asia/Manila").format("YYYY-MM-DD HH:mm:ss");
});
departmentSchema.virtual("updatedAtPHT").get(function () {
  return moment(this.updatedAt).tz("Asia/Manila").format("YYYY-MM-DD HH:mm:ss");
});

// Convert other stored times to PHT
departmentSchema.virtual("datePHT").get(function () {
  return moment(this.date).tz("Asia/Manila").format("YYYY-MM-DD HH:mm:ss");
});
departmentSchema.virtual("timeInPHT").get(function () {
  return moment(this.timeIn).tz("Asia/Manila").format("HH:mm:ss");
});
departmentSchema.virtual("timeOutPHT").get(function () {
  return moment(this.timeOut).tz("Asia/Manila").format("HH:mm:ss");
});
departmentSchema.virtual("overtimePHT").get(function () {
  return moment(this.overtime).tz("Asia/Manila").format("HH:mm:ss");
});

module.exports = mongoose.model("Department", departmentSchema);
