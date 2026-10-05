import type { Request, Response } from "express";
import Announcement from "../models/announcement-model";

export const createAnnouncement = async (
  req: Request,
  res: Response
) => {
  try {
    const {
      title,
      announcementType,
      message,
      audience,
      scheduledDate,
      deliveryType,
    } = req.body;

    if (
      !title ||
      !announcementType ||
      !message ||
      !audience ||
      !scheduledDate ||
      !deliveryType
    ) {
      return res.status(400).json({
        message: "All announcement fields are required",
      });
    }

    const announcement = await Announcement.create({
      title,
      announcementType,
      message,
      audience,
      scheduledDate,
      deliveryType,
    });

    return res.status(201).json({
      message: "Announcement created successfully",
      announcement,
    });
  } catch (error) {
    console.error("Create announcement error:", error);

    return res.status(500).json({
      message: "Server error",
    });
  }
};

export const getAnnouncements = async (
  _req: Request,
  res: Response
) => {
  try {
    const announcements = await Announcement.find()
      .sort({ scheduledDate: -1, createdAt: -1 })
      .lean();

    return res.status(200).json({
      announcements,
    });
  } catch (error) {
    console.error("Get announcements error:", error);

    return res.status(500).json({
      message: "Server error",
    });
  }
};

export const getAnnouncement = async (
  req: Request,
  res: Response
) => {
  try {
    const announcement = await Announcement.findById(
      req.params.id
    );

    if (!announcement) {
      return res.status(404).json({
        message: "Announcement not found",
      });
    }

    return res.status(200).json({
      announcement,
    });
  } catch (error) {
    console.error("Get announcement error:", error);

    return res.status(500).json({
      message: "Server error",
    });
  }
};

export const updateAnnouncement = async (
  req: Request,
  res: Response
) => {
  try {
    const {
      title,
      announcementType,
      message,
      audience,
      scheduledDate,
      deliveryType,
    } = req.body;

    if (
      !title ||
      !announcementType ||
      !message ||
      !audience ||
      !scheduledDate ||
      !deliveryType
    ) {
      return res.status(400).json({
        message: "All announcement fields are required",
      });
    }

    const announcement =
      await Announcement.findByIdAndUpdate(
        req.params.id,
        {
          title,
          announcementType,
          message,
          audience,
          scheduledDate,
          deliveryType,
        },
        {
          new: true,
          runValidators: true,
        }
      );

    if (!announcement) {
      return res.status(404).json({
        message: "Announcement not found",
      });
    }

    return res.status(200).json({
      message: "Announcement updated successfully",
      announcement,
    });
  } catch (error) {
    console.error("Update announcement error:", error);

    return res.status(500).json({
      message: "Server error",
    });
  }
};

export const deleteAnnouncement = async (
  req: Request,
  res: Response
) => {
  try {
    const announcement =
      await Announcement.findByIdAndDelete(req.params.id);

    if (!announcement) {
      return res.status(404).json({
        message: "Announcement not found",
      });
    }

    return res.status(200).json({
      message: "Announcement deleted successfully",
    });
  } catch (error) {
    console.error("Delete announcement error:", error);

    return res.status(500).json({
      message: "Server error",
    });
  }
};