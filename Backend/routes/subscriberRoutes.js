import express from "express";
import authMiddleware from "../middleware/authMiddleware.js";
import {
  subscribe,
  unsubscribe,
  getSubscribers,
  unsubscribeById
} from "../controllers/subscriberController.js";

const router = express.Router();

router.post("/", subscribe);

router.post("/unsubscribe", unsubscribe);

router.get(
  "/",
  authMiddleware,
  getSubscribers
);

router.patch(
  "/unsubscribe/:id",
  unsubscribeById
);

export default router;