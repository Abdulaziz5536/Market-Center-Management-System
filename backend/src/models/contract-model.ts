import mongoose, { Schema } from "mongoose";

const contractFileSchema = new mongoose.Schema(
  {
    name: String,
    type: String,
    data: String,
  },
  { _id: false },
);

const contractSchema = new Schema(
  {
    tenant: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Tenant",
      required: true,
    },
    amount: {
      type: Number,
      required: true,
      min: 0,
    },
    leaseStartDate: {
      type: String,
      required: true,
    },
    leaseEndDate: {
      type: String,
      required: true,
    },
    paymentFrequency: {
      type: String,
      required: true,
      enum: ["Monthly", "Quarterly", "Yearly"],
    },
    status: {
      type: String,
      required: true,
      enum: ["Pending", "Paid", "Expired"],
      default: "Pending",
    },
    contractFile: contractFileSchema,
  },
  { timestamps: true },
);

const Contract = mongoose.model("Contract", contractSchema);

export default Contract;
