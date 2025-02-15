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
    origin: "http://localhost:5173",

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
app.use("/api/admins", require("./routes/adminRoutes"));

/* Error Handler */
app.use(errorHandler);

app.listen(port, () => {
  console.log(`Listening on port:${port}`);
});
