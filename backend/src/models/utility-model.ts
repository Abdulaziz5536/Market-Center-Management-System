import mongoose, { Schema } from "mongoose";

const utilityFileSchema = new mongoose.Schema(
  { name: String, type: String, data: String },
  { _id: false },
);

const utilitySchema = new Schema(
  {
    unit: { type: mongoose.Schema.Types.ObjectId, ref: "Unit", required: true },
    utilityType: {
      type: String,
      required: true,
      enum: ["Electricity", "Water", "Other"],
    },
    billingMonth: { type: String, required: true },
    amount: { type: Number, required: true, min: 0 },
    dueDate: { type: String, required: true },
    status: {
      type: String,
      required: true,
      enum: ["Pending", "Paid", "Overdue"],
      default: "Pending",
    },
    receiptFile: utilityFileSchema,
  },
  { timestamps: true },
);

const Utility = mongoose.model("Utility", utilitySchema);

export default Utility;
