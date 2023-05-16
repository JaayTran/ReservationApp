import mongoose from "mongoose";
import TableNumber from "./tableModel.js";
import Contact from "./contactModel.js";

const reservationSchema = new mongoose.Schema(
  {
    // tableNumber: {
    //   type: mongoose.Schema.Types.ObjectId,
    //   ref: "TableNumber",
    //   required: true,
    // },
    // contactInfo: {
    //   type: mongoose.Schema.Types.ObjectId,
    //   ref: "Contact",
    //   required: true,
    // },
    tableLocation: {
      type: String,
      required: true,
    },
    numPeople: {
      type: Number,
      required: true,
    },
    comments: {
      type: String,
      required: false,
    },
    availableTableNumbers: [
      { string: String, unavailableDates: { type: [Date] } },
    ],
  },
  { timestamps: true }
);

const Reservation = mongoose.model("Reservation", reservationSchema);
export default Reservation;
