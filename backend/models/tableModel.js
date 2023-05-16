import mongoose from "mongoose";

const tableSchema = new mongoose.Schema(
  {
    tableNum: { type: String, required: true, unique: true },
    maxCapacity: { type: Number, required: true },
    reservations: {
      type: [String],
    },
  },
  {
    //for date
    timestamps: true,
  }
);

const TableNumber = mongoose.model("TableNumber", tableSchema);
export default TableNumber;
