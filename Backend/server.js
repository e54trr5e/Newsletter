import dns from "node:dns";

// Use Google + Cloudflare DNS
dns.setServers([
  "8.8.8.8",
  "1.1.1.1",
]);

// Load environment variables FIRST
import "dotenv/config";

import express from "express";
import cors from "cors";

import connectDB from "./config/db.js";

// Routes
import authRoutes from "./routes/authRoutes.js";
import subscriberRoutes from "./routes/subscriberRoutes.js";
import newsletterRoutes from "./routes/newsletterRoutes.js";


// Connect MongoDB
connectDB();


// Create Express app
const app = express();


// ================= MIDDLEWARE =================

app.use(cors());

app.use(express.json());


// ================= ROUTES =================

// Test route
app.get("/", (req, res) => {
  res.json({
    message: "BYTEPOST API is running",
  });
});


// Auth
app.use(
  "/api/auth",
  authRoutes
);


// Subscribers
app.use(
  "/api/subscribers",
  subscriberRoutes
);


// Newsletters
app.use(
  "/api/newsletters",
  newsletterRoutes
);


// ================= SERVER =================

const PORT =
  process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(
    `BYTEPOST server running on port ${PORT}`
  );
});