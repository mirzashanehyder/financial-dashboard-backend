import mongoose from "mongoose";

const recordSchema = new mongoose.Schema(
  {
    amount: {
      type: Number,
      required: [true, "Amount is required"],
      min: 0,
    },

    type: {
      type: String,
      enum: ["income", "expense"],
      required: true,
    },

    category: {
      type: String,
      required: [true, "Category is required"],
      trim: true,
    },

    date: {
      type: Date,
      required: [true, "Date is required"],
    },

    notes: {
      type: String,
      trim: true,
    },

    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

recordSchema.index({ type: 1 });
recordSchema.index({ category: 1 });
recordSchema.index({ date: 1 });

// // AUTO EXCLUDE DELETED RECORDS
// recordSchema.pre("find", function () {
//   this.where({ isDeleted: false });
// });

// recordSchema.pre("findOne", function () {
//   this.where({ isDeleted: false });
// });

export default mongoose.model("Record", recordSchema);