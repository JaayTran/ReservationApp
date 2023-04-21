import mongoose from "mongoose";
//for create table into db

const tableSchema = new mongoose.Schema(
  {
    tableNum: { type: String, required: true },
    capacity: { type: String, required: true },
    isAvailable: { type: String, required: true },
  },
  {
    //for date
    timestamps: true,
  }
);

const TableNumber = mongoose.model("TableNumber", tableSchema);
export default TableNumber;
