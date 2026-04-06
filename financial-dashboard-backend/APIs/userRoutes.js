import express from "express";
import User from "../models/userModel.js";
import bcrypt from "bcryptjs";

import { authMiddleware } from "../middlewares/authMiddleware.js";
import { authorizeRoles } from "../middlewares/roleMiddleware.js";
import { checkActiveUser } from "../middlewares/activeUserMiddleware.js";

const router = express.Router();


//  GET ALL USERS (Admin only)
router.get(
  "/get-users",
  authMiddleware,
  checkActiveUser,
  authorizeRoles("admin"),
  async (req, res) => {
    try {
      const users = await User.find();

      res.json({
        count: users.length,
        users
      });

    } catch (err) {
      res.status(500).json({
        message: "Error fetching users",
        reason: err.message
      });
    }
  }
);


//  GET SINGLE USER
router.get(
  "/get-user/:id",
  authMiddleware,
  checkActiveUser,
  authorizeRoles("admin"),
  async (req, res) => {
    try {
      const user = await User.findById(req.params.id);

      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }

      res.json({ user });

    } catch (err) {
      res.status(500).json({
        message: "Error fetching user",
        reason: err.message
      });
    }
  }
);


//  CREATE USER (Admin)
router.post(
  "/create-user",
  authMiddleware,
  checkActiveUser,
  authorizeRoles("admin"),
  async (req, res) => {
    try {
      const { name, email, password, role } = req.body;

      // check existing user
      const existing = await User.findOne({ email });
      if (existing) {
        return res.status(400).json({ message: "User already exists" });
      }

      // 🔐 HASH PASSWORD
      const hashedPassword = await bcrypt.hash(password, 10);

      // create user
      const user = await User.create({
        name,
        email,
        password: hashedPassword,
        role
      });

      res.status(201).json({
        message: "User created successfully",
        user
      });

    } catch (err) {
      res.status(500).json({
        message: "Error creating user",
        reason: err.message
      });
    }
  }
);


//  UPDATE USER (Role / Status)
router.patch(
  "/update-user/:id",
  authMiddleware,
  checkActiveUser,
  authorizeRoles("admin"),
  async (req, res) => {
    try {
      const { role, status } = req.body;

      const updatedUser = await User.findByIdAndUpdate(
        req.params.id,
        { role, status },
        { new: true }
      );

      if (!updatedUser) {
        return res.status(404).json({ message: "User not found" });
      }

      res.json({
        message: "User updated successfully",
        user: updatedUser
      });

    } catch (err) {
      res.status(500).json({
        message: "Error updating user",
        reason: err.message
      });
    }
  }
);


// DELETE USER
router.delete(
  "/delete-user/:id",
  authMiddleware,
  checkActiveUser,
  authorizeRoles("admin"),
  async (req, res) => {
    try {
      const deletedUser = await User.findByIdAndDelete(req.params.id);

      if (!deletedUser) {
        return res.status(404).json({ message: "User not found" });
      }

      res.json({
        message: "User deleted successfully"
      });

    } catch (err) {
      res.status(500).json({
        message: "Error deleting user",
        reason: err.message
      });
    }
  }
);

export default router;