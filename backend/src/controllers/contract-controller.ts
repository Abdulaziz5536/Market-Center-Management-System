import type { Request, Response } from "express";
import Contract from "../models/contract-model";
import Tenant from "../models/tenant-model";


const hasRequiredFields = (body: Record<string, unknown>) =>
  body.tenant && body.amount !== undefined && body.leaseStartDate && body.leaseEndDate && body.paymentFrequency;

export const createContract = async (req: Request, res: Response) => {
  try {
    if (!hasRequiredFields(req.body)) {
      return res.status(400).json({ message: "Tenant, amount, lease dates, and payment frequency are required" });
    }

    const tenant = await Tenant.findById(req.body.tenant);
    if (!tenant) return res.status(404).json({ message: "Tenant not found" });

    const contract = await Contract.create(req.body);
    const populatedContract = await contract.populate("tenant");
    return res.status(201).json({ message: "Contract created successfully", contract: populatedContract });
  } catch (error) {
    console.error("Create contract error:", error);
    return res.status(500).json({ message: "Server error" });
  }
};

export const getContracts = async (_req: Request, res: Response) => {
  try {
    const contracts = await Contract.find().populate("tenant").sort({ createdAt: -1 });
    return res.status(200).json({ contracts });
  } catch (error) {
    console.error("Get contracts error:", error);
    return res.status(500).json({ message: "Server error" });
  }
};

export const getContract = async (req: Request, res: Response) => {
  try {
    const contract = await Contract.findById(req.params.id).populate("tenant");
    if (!contract) return res.status(404).json({ message: "Contract not found" });
    return res.status(200).json({ contract });
  } catch (error) {
    console.error("Get contract error:", error);
    return res.status(500).json({ message: "Server error" });
  }
};

export const updateContract = async (req: Request, res: Response) => {
  try {
    if (!hasRequiredFields(req.body)) {
      return res.status(400).json({ message: "Tenant, amount, lease dates, and payment frequency are required" });
    }

    const tenant = await Tenant.findById(req.body.tenant);
    if (!tenant) return res.status(404).json({ message: "Tenant not found" });

    const contract = await Contract.findByIdAndUpdate(req.params.id, req.body, { new: true }).populate("tenant");
    if (!contract) return res.status(404).json({ message: "Contract not found" });
    return res.status(200).json({ message: "Contract updated successfully", contract });
  } catch (error) {
    console.error("Update contract error:", error);
    return res.status(500).json({ message: "Server error" });
  }
};

export const deleteContract = async (req: Request, res: Response) => {
  try {
    const contract = await Contract.findByIdAndDelete(req.params.id);
    if (!contract) return res.status(404).json({ message: "Contract not found" });
    return res.status(200).json({ message: "Contract deleted successfully" });
  } catch (error) {
    console.error("Delete contract error:", error);
    return res.status(500).json({ message: "Server error" });
  }
};
