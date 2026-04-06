import express from "express";
import Record from "../models/recordModel.js";
import { authMiddleware } from "../middlewares/authMiddleware.js";
import { authorizeRoles } from "../middlewares/roleMiddleware.js";
import { checkActiveUser } from "../middlewares/activeUserMiddleware.js";

const router = express.Router();


// CREATE RECORD (Admin only)
router.post(
  "/create-record",
  authMiddleware,
  checkActiveUser,
  authorizeRoles("admin"),
  async (req, res) => {
    try {
      const record = new Record({
        ...req.body,
        createdBy: req.user.id
      });

      await record.save();

      res.status(201).json({
        message: "Record created successfully",
        record
      });

    } catch (err) {
      res.status(400).json({
        message: "Error creating record",
        reason: err.message
      });
    }
  }
);


//  GET RECORDS (Analyst + Admin)
router.get(
  "/get-records",
  authMiddleware,
  checkActiveUser,
  authorizeRoles("admin", "analyst"),
  async (req, res) => {
    try {
      const { type, category, startDate, endDate } = req.query;

      let filter = {};

      if (type) filter.type = type;
      if (category) filter.category = category;

      if (startDate && endDate) {
        filter.date = {
          $gte: new Date(startDate),
          $lte: new Date(endDate)
        };
      }

      const records = await Record.find(filter).sort({ createdAt: -1 });

      res.json({
        count: records.length,
        records
      });

    } catch (err) {
      res.status(400).json({
        message: "Error fetching records",
        reason: err.message
      });
    }
  }
);


// UPDATE RECORD (Admin only)
router.put(
  "/update-record/:id",
  authMiddleware,
  checkActiveUser,
  authorizeRoles("admin"),
  async (req, res) => {
    try {
      const record = await Record.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true }
      );

      res.json({
        message: "Record updated",
        record
      });

    } catch (err) {
      res.status(400).json({
        message: "Error updating record",
        reason: err.message
      });
    }
  }
);


// DELETE RECORD (Soft Delete)
router.delete(
  "/delete-record/:id",
  authMiddleware,
  checkActiveUser,
  authorizeRoles("admin"),
  async (req, res) => {
    try {
      await Record.findByIdAndUpdate(req.params.id, {
        isDeleted: true
      });

      res.json({
        message: "Record deleted (soft delete)"
      });

    } catch (err) {
      res.status(400).json({
        message: "Error deleting record",
        reason: err.message
      });
    }
  }
);

export default router;