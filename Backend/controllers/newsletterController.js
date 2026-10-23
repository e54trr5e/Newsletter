import Newsletter from "../models/Newsletter.js";
import Subscriber from "../models/Subscriber.js";

import {
  sendNewsletterEmail,
} from "../services/emailService.js";

import newsletterEmail from "../templates/newsletterEmail.js";


// ==========================================
// CREATE NEWSLETTER
// ==========================================

export const createNewsletter = async (req, res) => {
  try {
    const {
      issueNumber,
      title,
      description,
      content,
      coverImage,
      status,
    } = req.body;

    // Basic validation
    if (
      !issueNumber ||
      !title ||
      !description ||
      !content
    ) {
      return res.status(400).json({
        message:
          "Issue number, title, description and content are required.",
      });
    }

    // Check duplicate issue number
    const existingNewsletter =
      await Newsletter.findOne({
        issueNumber,
      });

    if (existingNewsletter) {
      return res.status(400).json({
        message:
          "A newsletter with this issue number already exists.",
      });
    }

    // Create newsletter
    const newsletter =
      await Newsletter.create({
        issueNumber,
        title,
        description,
        content,
        coverImage: coverImage || "",

        status:
          status === "published"
            ? "published"
            : "draft",

        publishedAt:
          status === "published"
            ? new Date()
            : null,

        emailSent: false,

        emailSentAt: null,
      });

    res.status(201).json(
      newsletter
    );

  } catch (error) {

    console.log(
      "Create newsletter error:",
      error
    );

    res.status(500).json({
      message:
        "Could not create newsletter",
    });
  }
};


// ==========================================
// PUBLIC - GET ALL PUBLISHED NEWSLETTERS
// ==========================================

export const getNewsletters = async (
  req,
  res
) => {
  try {

    const newsletters =
      await Newsletter.find({
        status: "published",
      }).sort({
        publishedAt: -1,
      });

    res.status(200).json(
      newsletters
    );

  } catch (error) {

    console.log(
      "Get newsletters error:",
      error
    );

    res.status(500).json({
      message:
        "Could not load newsletters",
    });
  }
};


// ==========================================
// ADMIN - GET ALL NEWSLETTERS
// ==========================================

export const getAdminNewsletters = async (
  req,
  res
) => {
  try {

    const newsletters =
      await Newsletter.find().sort({
        createdAt: -1,
      });

    res.status(200).json(
      newsletters
    );

  } catch (error) {

    console.log(
      "Admin newsletters error:",
      error
    );

    res.status(500).json({
      message:
        "Could not load newsletters",
    });
  }
};


// ==========================================
// ADMIN - GET ONE NEWSLETTER
// ==========================================

export const getAdminNewsletter = async (
  req,
  res
) => {
  try {

    const newsletter =
      await Newsletter.findById(
        req.params.id
      );

    if (!newsletter) {
      return res.status(404).json({
        message:
          "Newsletter not found",
      });
    }

    res.status(200).json(
      newsletter
    );

  } catch (error) {

    console.log(
      "Admin newsletter error:",
      error
    );

    res.status(500).json({
      message:
        "Could not load newsletter",
    });
  }
};


// ==========================================
// PUBLIC - GET ONE PUBLISHED NEWSLETTER
// ==========================================

export const getNewsletter = async (
  req,
  res
) => {
  try {

    const newsletter =
      await Newsletter.findOne({
        _id: req.params.id,
        status: "published",
      });

    if (!newsletter) {
      return res.status(404).json({
        message:
          "Newsletter not found",
      });
    }

    res.status(200).json(
      newsletter
    );

  } catch (error) {

    console.log(
      "Get newsletter error:",
      error
    );

    res.status(500).json({
      message:
        "Could not load newsletter",
    });
  }
};


// ==========================================
// UPDATE NEWSLETTER
// ==========================================

export const updateNewsletter = async (
  req,
  res
) => {
  try {

    const newsletter =
      await Newsletter.findById(
        req.params.id
      );

    if (!newsletter) {
      return res.status(404).json({
        message:
          "Newsletter not found",
      });
    }

    // Remember old status
    const wasPublished =
      newsletter.status ===
      "published";

    // Update newsletter
    Object.assign(
      newsletter,
      req.body
    );

    // First time publishing
    if (
      req.body.status === "published" &&
      !wasPublished
    ) {
      newsletter.publishedAt =
        new Date();
    }

    await newsletter.save();

    res.status(200).json(
      newsletter
    );

  } catch (error) {

    console.log(
      "Update newsletter error:",
      error
    );

    res.status(500).json({
      message:
        "Could not update newsletter",
    });
  }
};


// ==========================================
// DELETE NEWSLETTER
// ==========================================

export const deleteNewsletter = async (
  req,
  res
) => {
  try {

    const newsletter =
      await Newsletter.findByIdAndDelete(
        req.params.id
      );

    if (!newsletter) {
      return res.status(404).json({
        message:
          "Newsletter not found",
      });
    }

    res.status(200).json({
      message:
        "Newsletter deleted successfully",
    });

  } catch (error) {

    console.log(
      "Delete newsletter error:",
      error
    );

    res.status(500).json({
      message:
        "Could not delete newsletter",
    });
  }
};


// ==========================================
// SEND NEWSLETTER TO SUBSCRIBERS
// ==========================================

export const sendNewsletter = async (
  req,
  res
) => {
  try {

    // ========================================
    // 1. FIND NEWSLETTER
    // ========================================

    const newsletter =
      await Newsletter.findById(
        req.params.id
      );

    if (!newsletter) {
      return res.status(404).json({
        message:
          "Newsletter not found",
      });
    }


    // ========================================
    // 2. CHECK IF PUBLISHED
    // ========================================

    if (
      newsletter.status !==
      "published"
    ) {
      return res.status(400).json({
        message:
          "Publish the newsletter before sending it.",
      });
    }


    // ========================================
    // 3. PREVENT DUPLICATE SENDING
    // ========================================

    if (newsletter.emailSent) {
      return res.status(400).json({
        message:
          "This newsletter has already been sent.",
      });
    }


    // ========================================
    // 4. GET ACTIVE SUBSCRIBERS
    // ========================================

    const subscribers =
      await Subscriber.find({
        status: "active",
      });

    if (
      subscribers.length === 0
    ) {
      return res.status(400).json({
        message:
          "No active subscribers found.",
      });
    }


    // ========================================
    // 5. SEND TO EACH SUBSCRIBER
    // ========================================

    for (const subscriber of subscribers) {

      // Each subscriber gets their own link
      const unsubscribeUrl =
        `http://localhost:5173/unsubscribe/${subscriber._id}`;


      // Generate personalized HTML
      const html =
        newsletterEmail(
          newsletter,
          unsubscribeUrl
        );


      // Send email
      await sendNewsletterEmail({
        to: subscriber.email,

        subject:
          newsletter.title,

        html: html,
      });
    }


    // ========================================
    // 6. MARK NEWSLETTER AS SENT
    // ========================================

    newsletter.emailSent = true;

    newsletter.emailSentAt =
      new Date();

    await newsletter.save();


    // ========================================
    // 7. SUCCESS
    // ========================================

    res.status(200).json({
      message:
        `Newsletter sent to ${subscribers.length} subscriber(s).`,
    });

  } catch (error) {

    console.log(
      "Send newsletter error:",
      error
    );

    res.status(500).json({
      message:
        "Could not send newsletter",
    });
  }
};