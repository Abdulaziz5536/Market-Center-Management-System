import type { Request, Response } from "express";
import Unit from "../models/unit-model";


export const addUnit = async (req: Request, res: Response) => {
  try {
    const {
      unitId,
      area,
      type,
      monthlyRent,
      status,
    } = req.body;

    if (
      !unitId ||
      !area ||
      !type ||
      !monthlyRent
    ) {
      return res.status(400).json({
        message: "All required fields must be provided",
      });
    }

    const existingUnit = await Unit.findOne({ unitId });

    if (existingUnit) {
      return res.status(400).json({
        message: "A unit with this id already exists",
      });
    }

    const unit = await Unit.create({
      unitId,
      area,
      type,
      monthlyRent,
      status: status || "Available",
    });

    res.status(201).json({
      message: "Unit created successfully",
      unit,
    });
  } catch (error) {
    console.error("Create unit error:", error);

    res.status(500).json({
      message: "Server error",
    });
  }
};


export const getUnits = async (req: Request, res: Response) => {
  try {
    const units = await Unit.find().sort({ unitId: 1 });

    res.status(200).json({
      count: units.length,
      units,
    });
  } catch (error) {
    console.error("Get units error:", error);

    res.status(500).json({
      message: "Server error",
    });
  }
};


export const getUnit = async (req: Request, res: Response) => {
  try {
    const unit = await Unit.findById(req.params.id);

    if (!unit) {
      return res.status(404).json({
        message: "Unit not found",
      });
    }

    res.status(200).json({
      unit,
    });
  } catch (error) {
    console.error("Get unit error:", error);

    res.status(500).json({
      message: "Server error",
    });
  }
};


export const updateUnit = async (req: Request, res: Response) => {
  try {
    const {
      unitId,
      area,
      type,
      monthlyRent,
      status,
    } = req.body;

    const unit = await Unit.findById(req.params.id);

    if (!unit) {
      return res.status(404).json({
        message: "Unit not found",
      });
    }

    if (unitId && unitId !== unit.unitId) {
      const existingUnit = await Unit.findOne({ unitId });

      if (existingUnit) {
        return res.status(400).json({
          message: "A unit with this id already exists",
        });
      }
    }

    unit.unitId = unitId ?? unit.unitId;
    unit.area = area ?? unit.area;
    unit.type = type ?? unit.type;
    unit.monthlyRent = monthlyRent ?? unit.monthlyRent;
    unit.status = status ?? unit.status;

    await unit.save();

    res.status(200).json({
      message: "Unit updated successfully",
      unit,
    });
  } catch (error) {
    console.error("Update unit error:", error);

    res.status(500).json({
      message: "Server error",
    });
  }
};


export const deleteUnit = async (req: Request, res: Response) => {
  try {
    const unit = await Unit.findById(req.params.id);

    if (!unit) {
      return res.status(404).json({
        message: "Unit not found",
      });
    }

    await unit.deleteOne();

    res.status(200).json({
      message: "Unit deleted successfully",
    });
  } catch (error) {
    console.error("Delete unit error:", error);

    res.status(500).json({
      message: "Server error",
    });
  }
};