import "dotenv/config";
import express from "express";
import cors from "cors";
import connectDB from "./src/config/mongodb.js";

import CertificateRoute from "./src/modules/certificate/router.js";
import AuthRouter from "./src/modules/auth/auth.router.js";
import DepartmentRouter from "./src/modules/department/dep.router.js";
import UpcomingEventRouter from "./src/modules/UpcomingEvent/router.js"
import SupportRouter from "./src/modules/Support/support.router.js"

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Database
connectDB();

// Health check
app.get("/health", (req, res) => {
  res.status(200).json({ success: true, message: "healthy"});
});

// Central Routes 
app.use("/api/v1/certificate", CertificateRoute);
app.use("/api/v1/auth", AuthRouter);
app.use("/api/v1/department", DepartmentRouter);
app.use("/api/v1/upcomingevents", UpcomingEventRouter);
app.use("/api/v1/support", SupportRouter);


// Port
const PORT = process.env.PORT || 5000;

// Start server
const server = app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

export default app;
export { server };

