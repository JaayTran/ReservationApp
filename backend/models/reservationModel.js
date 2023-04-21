import mongoose from "mongoose";
//for create table into db

const reservationSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    phone: { type: String, required: true },
    email: { type: String, required: true },
    tableReserved: { type: String, required: true },

    start: {
      type: Date,
      required: [true, "Please Insert The Start of your event"],
      min: [new Date(), "can't be before now!!"],
    },

    end: {
      type: Date,
      //setting a min function to accept any date one hour ahead of start
      min: [
        function () {
          const date = new Date(this.start);
          const validDate = new Date(date.setHours(date.getHours() + 1));
          return validDate;
        },
        "Event End must be at least one hour a head of event time",
      ],
      default: function () {
        const date = new Date(this.start);
        return date.setDate(date.getDate() + 1);
      },
    },
    notes: { type: String },
  },

  {
    //for date
    timestamps: true,
  }
);

const Reservation = mongoose.model("Reservation", reservationSchema);
export default Reservation;
