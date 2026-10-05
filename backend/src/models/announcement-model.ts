import mongoose, { Schema } from "mongoose";

const announcementSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },

    announcementType: {
      type: String,
      enum: [
        "General",
        "Maintenance",
        "Emergency",
        "Payment",
        "Utility",
        "Contract",
        "Other",
      ],
      required: true,
    },

    message: {
      type: String,
      required: true,
      trim: true,
    },

    audience: {
      type: String,
      enum: [
        "All Tenants",
        "Specific Unit",
        "All Staff",
      ],
      required: true,
    },

    scheduledDate: {
      type: Date,
      required: true,
    },

    deliveryType: {
      type: String,
      enum: ["Email", "SMS", "Both"],
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Announcement = mongoose.model(
  "Announcement",
  announcementSchema
);

export default Announcement;