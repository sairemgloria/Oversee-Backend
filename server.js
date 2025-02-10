const express = require("express");
const dotenv = require("dotenv").config();
const port = process.env.PORT || 3000;
const connectDB = require("./config/db.js");
const { errorHandler } = require("./middlewares/errorMiddleware.js");

connectDB();

const app = express();

/* Middlewares */
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

/* Routes */
app.use("/api/admins", require("./routes/adminRoutes.js"));

app.use(errorHandler);

app.listen(port, () => {
  console.log(`Listening on port:${port}`);
});
