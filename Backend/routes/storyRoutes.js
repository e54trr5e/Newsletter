import express from "express";

import {
  createStory,
  getStories,
  getStory,
  getAdminStories,
  getAdminStory,
  updateStory,
  deleteStory,
} from "../controllers/storyController.js";

import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();


// PUBLIC
router.get("/", getStories);


// ADMIN ALL
router.get(
  "/admin/all",
  authMiddleware,
  getAdminStories
);


// ADMIN SINGLE
router.get(
  "/admin/:id",
  authMiddleware,
  getAdminStory
);


// PUBLIC SINGLE
router.get(
  "/:slug",
  getStory
);


// CREATE
router.post(
  "/",
  authMiddleware,
  createStory
);


// UPDATE
router.put(
  "/:id",
  authMiddleware,
  updateStory
);


// DELETE
router.delete(
  "/:id",
  authMiddleware,
  deleteStory
);


export default router;