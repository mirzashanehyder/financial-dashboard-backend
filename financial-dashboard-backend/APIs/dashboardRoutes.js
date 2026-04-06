import express from "express";
import Record from "../models/recordModel.js";
import { authMiddleware } from "../middlewares/authMiddleware.js";

const router = express.Router();


//  1. SUMMARY (income, expense, net)
router.get("/summary", authMiddleware, async (req, res) => {
  try {
    const result = await Record.aggregate([
      {
        $match: {
          $or: [
            { isDeleted: false },
            { isDeleted: { $exists: false } }
          ]
        }
      },

      {
        $group: {
          _id: "$type",
          total: { $sum: "$amount" }
        }
      }
    ]);

    let income = 0, expense = 0;

    result.forEach(item => {
      if (item._id === "income") income = item.total;
      else expense = item.total;
    });

    res.json({
      totalIncome: income,
      totalExpense: expense,
      netBalance: income - expense
    });

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});


//  2. CATEGORY BREAKDOWN
router.get("/categories", authMiddleware, async (req, res) => {
  try {
    const data = await Record.aggregate([
      {
        $match: {
          $or: [
            { isDeleted: false },
            { isDeleted: { $exists: false } }
          ]
        }
      },
    
      {
        $group: {
          _id: "$category",
          total: { $sum: "$amount" }
        }
      },
    
      {
        $sort: { total: -1 }
      }
    ]);

    res.json(data);

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});


//  3. MONTHLY TRENDS
router.get("/trends", authMiddleware, async (req, res) => {
  try {
    const data = await Record.aggregate([
      {
        $match: {
          $or: [
            { isDeleted: false },
            { isDeleted: { $exists: false } }
          ]
        }
      },

      {
        $group: {
          _id: {
            year: { $year: "$date" },
            month: { $month: "$date" },
            type: "$type"
          },
          total: { $sum: "$amount" }
        }
      },

      {
        $sort: {
          "_id.year": 1,
          "_id.month": 1
        }
      }
    ]);

    res.json(data);

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});


// 4. RECENT TRANSACTIONS
router.get("/recent", authMiddleware, async (req, res) => {
  try {
    const records = await Record.find({
      $or: [
        { isDeleted: false },
        { isDeleted: { $exists: false } }
      ]
    })
      .sort({ _id: -1 })
      .limit(5);

    res.json(records);

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

export default router;