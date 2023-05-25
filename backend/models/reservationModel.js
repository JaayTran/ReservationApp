import mongoose from "mongoose";
import TableNumber from "./tableModel.js";
import Contact from "./contactModel.js";

const reservationSchema = new mongoose.Schema(
  {
    tableNumber: { type: String },
    tableNumberId: { type: String },
    //this will be
    name: { type: String, required: true },
    phone: { type: String, required: false },
    email: { type: String, required: false },
    // contactInfo: {
    //   type: mongoose.Schema.Types.ObjectId,
    //   ref: 'Contact',
    //   required: true,
    // },

    // incorporate soon
    // startTime: { type: Date, required: true },
    // endTime: { type: Date, required: true },
    numPeople: {
      type: Number,
      required: true,
    },
    comments: {
      type: String,
      required: false,
    },
  },
  { timestamps: true }
);

const Reservation = mongoose.model("Reservation", reservationSchema);
export default Reservation;
