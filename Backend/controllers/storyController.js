import Story from "../models/Story.js";


// ==========================================
// CREATE STORY
// ==========================================

export const createStory = async (req, res) => {
  try {
    const {
      title,
      slug,
      category,
      description,
      content,
      image,
      status,
    } = req.body;

    const story = await Story.create({
      title,
      slug,
      category,
      description,
      content,
      image,

      status: status || "draft",

      publishedAt:
        status === "published"
          ? new Date()
          : null,
    });

    res.status(201).json(story);

  } catch (error) {
    console.log(
      "Create story error:",
      error
    );

    res.status(500).json({
      message: "Could not create story",
    });
  }
};


// ==========================================
// PUBLIC - GET PUBLISHED STORIES
// ==========================================

export const getStories = async (req, res) => {
  try {
    const stories = await Story.find({
      status: "published",
    }).sort({
      publishedAt: -1,
    });

    res.status(200).json(stories);

  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: "Could not load stories",
    });
  }
};


// ==========================================
// PUBLIC - GET ONE STORY
// ==========================================

export const getStory = async (req, res) => {
  try {
    const story = await Story.findOne({
      slug: req.params.slug,
      status: "published",
    });

    if (!story) {
      return res.status(404).json({
        message: "Story not found",
      });
    }

    res.status(200).json(story);

  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: "Could not load story",
    });
  }
};


// ==========================================
// ADMIN - GET ALL STORIES
// ==========================================

export const getAdminStories = async (
  req,
  res
) => {
  try {
    const stories = await Story.find().sort({
      createdAt: -1,
    });

    res.status(200).json(stories);

  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: "Could not load stories",
    });
  }
};


// ==========================================
// ADMIN - GET ONE STORY
// ==========================================

export const getAdminStory = async (
  req,
  res
) => {
  try {
    const story = await Story.findById(
      req.params.id
    );

    if (!story) {
      return res.status(404).json({
        message: "Story not found",
      });
    }

    res.status(200).json(story);

  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: "Could not load story",
    });
  }
};


// ==========================================
// UPDATE STORY
// ==========================================

export const updateStory = async (req, res) => {
  try {
    const story = await Story.findById(
      req.params.id
    );

    if (!story) {
      return res.status(404).json({
        message: "Story not found",
      });
    }

    const wasPublished =
      story.status === "published";

    Object.assign(
      story,
      req.body
    );

    if (
      req.body.status === "published" &&
      !wasPublished
    ) {
      story.publishedAt = new Date();
    }

    await story.save();

    res.status(200).json(story);

  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: "Could not update story",
    });
  }
};


// ==========================================
// DELETE STORY
// ==========================================

export const deleteStory = async (req, res) => {
  try {
    const story =
      await Story.findByIdAndDelete(
        req.params.id
      );

    if (!story) {
      return res.status(404).json({
        message: "Story not found",
      });
    }

    res.status(200).json({
      message: "Story deleted successfully",
    });

  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: "Could not delete story",
    });
  }
};