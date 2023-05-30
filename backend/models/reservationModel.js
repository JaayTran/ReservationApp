import mongoose from "mongoose";
import TableNumber from "./tableModel.js";
import Contact from "./contactModel.js";

const reservationSchema = new mongoose.Schema(
  {
    tableNumber: { type: String },
    tableNumberId: { type: String },
    name: { type: String, required: true },
    phone: { type: String, required: false },
    email: { type: String, required: false },
    // contactInfo: {
    //   type: mongoose.Schema.Types.ObjectId,
    //   ref: 'Contact',
    //   required: true,
    // },

    // incorporate soon
    reservationDate: { type: Date, required: false },
    startTime: { type: String, required: false },
    endTime: { type: String, required: false }, //might not need
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
