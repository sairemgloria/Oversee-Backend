const express = require("express");
const dotenv = require("dotenv").config();
const cors = require("cors");
const port = process.env.PORT || 3000;
const connectDB = require("./config/db");
const { errorHandler } = require("./middlewares/errorMiddleware");

connectDB();

const app = express();

/* CORS */
app.use(
  cors({
    /* Allow requests from this origin */
    origin: process.env.FRONTEND_URL,

    /* Allowed HTTP methods */
    methods: ["GET", "POST", "PUT", "DELETE"],

    /* Include credentials like cookies if needed */
    credentials: true,
  })
);

/* Middlewares */
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

/* Routes */
app.use("/api/auth", require("./routes/auth/adminAuth"));
app.use("/api/admins", require("./routes/admin/adminRoutes"));
app.use("/api/departmentAdmins", require("./routes/admin/departmentAdminRoutes"));
app.use("/api/roles", require("./routes/admin/roleRoutes"));

/* Error Handler */
app.use(errorHandler);

app.listen(port, () => {
  console.log(`Listening on port:${port}`);
});
