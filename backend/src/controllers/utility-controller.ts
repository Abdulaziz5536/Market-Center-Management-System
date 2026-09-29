import type { Request, Response } from "express";
import Unit from "../models/unit-model";
import Utility from "../models/utility-model";

const hasRequiredFields = (body: Record<string, unknown>) =>
  body.unit && body.utilityType && body.billingMonth && body.amount !== undefined && body.dueDate;

export const createUtility = async (req: Request, res: Response) => {
  try {
    if (!hasRequiredFields(req.body)) {
      return res.status(400).json({ message: "Unit, utility type, billing month, amount, and due date are required" });
    }
    if (!await Unit.findById(req.body.unit)) return res.status(404).json({ message: "Unit not found" });

    const utility = await Utility.create(req.body);
    return res.status(201).json({ message: "Utility bill created successfully", utility: await utility.populate("unit") });
  } catch (error) {
    console.error("Create utility error:", error);
    return res.status(500).json({ message: "Server error" });
  }
};

export const getUtilities = async (_req: Request, res: Response) => {
  try {
    const utilities = await Utility.find()
      .select({ "receiptFile.data": 0 })
      .populate("unit")
      .sort({ billingMonth: -1, createdAt: -1 })
      .lean();
    return res.status(200).json({ utilities });
  } catch (error) {
    console.error("Get utilities error:", error);
    return res.status(500).json({ message: "Server error" });
  }
};

export const getUtility = async (req: Request, res: Response) => {
  try {
    const utility = await Utility.findById(req.params.id).populate("unit");
    if (!utility) return res.status(404).json({ message: "Utility bill not found" });
    return res.status(200).json({ utility });
  } catch (error) {
    console.error("Get utility error:", error);
    return res.status(500).json({ message: "Server error" });
  }
};

export const updateUtility = async (req: Request, res: Response) => {
  try {
    if (!hasRequiredFields(req.body)) {
      return res.status(400).json({ message: "Unit, utility type, billing month, amount, and due date are required" });
    }
    if (!await Unit.findById(req.body.unit)) return res.status(404).json({ message: "Unit not found" });

    const updateData = { ...req.body };
    if (!updateData.receiptFile?.data) delete updateData.receiptFile;
    const utility = await Utility.findByIdAndUpdate(req.params.id, updateData, { new: true }).populate("unit");
    if (!utility) return res.status(404).json({ message: "Utility bill not found" });
    return res.status(200).json({ message: "Utility bill updated successfully", utility });
  } catch (error) {
    console.error("Update utility error:", error);
    return res.status(500).json({ message: "Server error" });
  }
};

export const deleteUtility = async (req: Request, res: Response) => {
  try {
    const utility = await Utility.findByIdAndDelete(req.params.id);
    if (!utility) return res.status(404).json({ message: "Utility bill not found" });
    return res.status(200).json({ message: "Utility bill deleted successfully" });
  } catch (error) {
    console.error("Delete utility error:", error);
    return res.status(500).json({ message: "Server error" });
  }
};
