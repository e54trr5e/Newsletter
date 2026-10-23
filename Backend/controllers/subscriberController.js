import Subscriber from "../models/Subscriber.js";

export const subscribe = async (req, res) => {
  try {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({
        message: "Email is required",
      });
    }

    
    const existingSubscriber = await Subscriber.findOne({
      email,
    });

    if (existingSubscriber) {

      if (existingSubscriber.status === "active") {
        return res.status(400).json({
          message: "Email is already subscribed",
        });
      }

      existingSubscriber.status = "active";
      existingSubscriber.subscribedAt = new Date();

      await existingSubscriber.save();

      return res.status(200).json({
        message: "Welcome back to BYTEPOST!",
      });
    }

    const subscriber = await Subscriber.create({
      email,
    });

    res.status(201).json({
      message: "Successfully subscribed to BYTEPOST!",
      subscriber,
    });

  } catch (error) {

    console.log(error);

    res.status(500).json({
      message: "Server error",
    });
  }
};

export const unsubscribe = async (req, res) => {

  try {

    const { email } = req.body;


    if (!email) {

      return res.status(400).json({
        message: "Email is required",
      });

    }


    const subscriber = await Subscriber.findOne({
      email,
    });


    if (!subscriber) {

      return res.status(404).json({
        message: "Subscriber not found",
      });

    }


    if (subscriber.status === "unsubscribed") {

      return res.status(400).json({
        message: "This email is already unsubscribed",
      });

    }


    subscriber.status = "unsubscribed";

    await subscriber.save();


    res.status(200).json({
      message: "Successfully unsubscribed from BYTEPOST",
    });


  } catch (error) {

    console.log(error);

    res.status(500).json({
      message: "Server error",
    });

  }

};

export const getSubscribers = async (req, res) => {
  try {
    const subscribers = await Subscriber.find().sort({
      subscribedAt: -1,
    });

    res.status(200).json(subscribers);
  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: "Server error",
    });
  }
};

export const unsubscribeById = async (req, res) => {
  try {
    const subscriber = await Subscriber.findById(
      req.params.id
    );

    if (!subscriber) {
      return res.status(404).json({
        message: "Subscriber not found.",
      });
    }

    if (subscriber.status === "unsubscribed") {
      return res.status(200).json({
        message:
          "You are already unsubscribed from BYTEPOST.",
      });
    }

    subscriber.status = "unsubscribed";

    await subscriber.save();

    res.status(200).json({
      message:
        "You have successfully unsubscribed from BYTEPOST.",
    });

  } catch (error) {
    console.log(
      "Unsubscribe link error:",
      error
    );

    res.status(500).json({
      message: "Could not unsubscribe.",
    });
  }
};