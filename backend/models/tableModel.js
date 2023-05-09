import mongoose from "mongoose";

const tableSchema = new mongoose.Schema(
  {
    tableNum: { type: String, required: true },
    maxCapacity: { type: String, required: true },
    isAvailable: { type: String, required: true },
  },
  {
    //for date
    timestamps: true,
  }
);

const TableNumber = mongoose.model("TableNumber", tableSchema);
export default TableNumber;
