
import express, { Router } from "express";
import dotenv from "dotenv";
import connectDB from "./src/config/mongodb.js";

import CertificateRoute from "./src/modules/certificate/router.js"

dotenv.config();

const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Database
connectDB();

// Health check
app.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    message: "Certificate Automation API is running",
  });
});

app.use("/api/v1/certificate", CertificateRoute)

// Port
const PORT = process.env.PORT || 5000;

// Start server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

