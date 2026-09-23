import type { Request, Response } from "express";

import Tenant from "../models/tenant-model";
import Unit from "../models/unit-model";


// CREATE TENANT
export const createTenant = async (
  req: Request,
  res: Response
) => {
  try {
    const {
      tenantName,
      phone,
      email,
      unit,
      moveInDate,
      moveOutDate,
      idLicenseFile,
      leaseAgreementFile,
    } = req.body;

    // Check required fields
    if (!tenantName || !phone || !unit) {
      return res.status(400).json({
        message:
          "Tenant name, phone, and unit are required",
      });
    }

    // Check if the unit exists
    const existingUnit = await Unit.findById(unit);

    if (!existingUnit) {
      return res.status(404).json({
        message: "Unit not found",
      });
    }

    // Create tenant
    const tenant = await Tenant.create({
      tenantName,
      phone,
      email,
      unit,
      moveInDate: moveInDate || "",
      moveOutDate: moveOutDate || "",
      idLicenseFile,
      leaseAgreementFile,
    });

    res.status(201).json({
      message: "Tenant created successfully",
      tenant,
    });
  } catch (error) {
    console.error(
      "Create tenant error:",
      error
    );

    res.status(500).json({
      message: "Server error",
    });
  }
};


// GET ALL TENANTS
export const getTenants = async (
  req: Request,
  res: Response
) => {
  try {
    const tenants = await Tenant.find()
      .populate("unit");

    res.status(200).json({
      tenants,
    });
  } catch (error) {
    console.error(
      "Get tenants error:",
      error
    );

    res.status(500).json({
      message: "Server error",
    });
  }
};


// GET ONE TENANT
export const getTenant = async (
  req: Request,
  res: Response
) => {
  try {
    const tenant = await Tenant.findById(
      req.params.id
    ).populate("unit");

    if (!tenant) {
      return res.status(404).json({
        message: "Tenant not found",
      });
    }

    res.status(200).json({
      tenant,
    });
  } catch (error) {
    console.error(
      "Get tenant error:",
      error
    );

    res.status(500).json({
      message: "Server error",
    });
  }
};


// UPDATE TENANT
export const updateTenant = async (
  req: Request,
  res: Response
) => {
  try {
    const {
      tenantName,
      phone,
      email,
      unit,
      moveInDate,
      moveOutDate,
      idLicenseFile,
      leaseAgreementFile,
    } = req.body;

    // Find tenant
    const tenant = await Tenant.findById(
      req.params.id
    );

    if (!tenant) {
      return res.status(404).json({
        message: "Tenant not found",
      });
    }

    // Check if the new unit exists
    const existingUnit = await Unit.findById(unit);

    if (!existingUnit) {
      return res.status(404).json({
        message: "Unit not found",
      });
    }

    // Update tenant
    tenant.tenantName = tenantName;
    tenant.phone = phone;
    tenant.email = email;
    tenant.unit = unit;
    tenant.moveInDate = moveInDate || "";
    tenant.moveOutDate = moveOutDate || "";

    if (idLicenseFile !== undefined) {
      tenant.idLicenseFile = idLicenseFile;
    }

    if (leaseAgreementFile !== undefined) {
      tenant.leaseAgreementFile =
        leaseAgreementFile;
    }

    await tenant.save();

    res.status(200).json({
      message: "Tenant updated successfully",
      tenant,
    });
  } catch (error) {
    console.error(
      "Update tenant error:",
      error
    );

    res.status(500).json({
      message: "Server error",
    });
  }
};


// DELETE TENANT
export const deleteTenant = async (
  req: Request,
  res: Response
) => {
  try {
    const tenant = await Tenant.findById(
      req.params.id
    );

    if (!tenant) {
      return res.status(404).json({
        message: "Tenant not found",
      });
    }

    await Tenant.findByIdAndDelete(
      req.params.id
    );

    res.status(200).json({
      message: "Tenant deleted successfully",
    });
  } catch (error) {
    console.error(
      "Delete tenant error:",
      error
    );

    res.status(500).json({
      message: "Server error",
    });
  }
};