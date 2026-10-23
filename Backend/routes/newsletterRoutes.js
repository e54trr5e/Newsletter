import express from "express";

import {
  createNewsletter,
  getNewsletters,
  getAdminNewsletters,
  getAdminNewsletter,
  getNewsletter,
  updateNewsletter,
  deleteNewsletter,
   sendNewsletter,
} from "../controllers/newsletterController.js";

import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();


// ==========================================
// PUBLIC ROUTES
// ==========================================

// Get all published newsletters
router.get("/", getNewsletters);


// ==========================================
// ADMIN ROUTES
// ==========================================

// Get all newsletters
// Includes drafts + published
router.get(
  "/admin/all",
  authMiddleware,
  getAdminNewsletters
);


// Get one newsletter for admin
// Can return draft or published
router.get(
  "/admin/:id",
  authMiddleware,
  getAdminNewsletter
);


// ==========================================
// PUBLIC SINGLE NEWSLETTER
// ==========================================

// Only returns published newsletter
router.get(
  "/:id",
  getNewsletter
);


// ==========================================
// CREATE NEWSLETTER
// ==========================================

router.post(
  "/",
  authMiddleware,
  createNewsletter
);


// ==========================================
// UPDATE NEWSLETTER
// ==========================================

router.put(
  "/:id",
  authMiddleware,
  updateNewsletter
);


// ==========================================
// DELETE NEWSLETTER
// ==========================================

router.delete(
  "/:id",
  authMiddleware,
  deleteNewsletter
);

router.post(
  "/:id/send",
  authMiddleware,
  sendNewsletter
);
export default router;