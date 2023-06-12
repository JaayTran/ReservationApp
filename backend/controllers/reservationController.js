import Reservation from "../models/reservationModel.js";
import TableNumber from "../models/tableModel.js";
import { createError } from "../utils/error.js";

export const createReservationController = async (req, res, next) => {
  const tableId = req.params.tableid;
  const newReservation = new Reservation(req.body);

  try {
    const savedReservation = await newReservation.save();

    try {
      const table = await TableNumber.findById(tableId);
      if (!table) {
        console.log("Table not found");
        return res.status(404).json({ error: "Table not found" });
      }

      savedReservation.tableNumber = table.tableNum;
      savedReservation.tableNumberId = table.id;
      await savedReservation.save();

      await TableNumber.findByIdAndUpdate(tableId, {
        $push: { reservations: savedReservation._id },
      });
    } catch (err) {
      next(err);
    }

    res.status(200).json(savedReservation);
  } catch (err) {
    next(err);
  }
};

export const updateReservationController = async (req, res, next) => {
  try {
    const reservationId = req.params.id;
    const newTableNumber = req.body.tableNum;
    const {
      name,
      phone,
      email,
      numPeople,
      comments,
      reservationDate,
      startTime,
    } = req.body;

    const reservation = await Reservation.findById(reservationId);

    if (!reservation) {
      console.log("Reservation not found");
      return res.status(404).json({ error: "Reservation not found" });
    }

    const oldTableNumberId = reservation.tableNumberId;

    // Retrieve the newTableNumberId based on the newTableNumber
    const newTableNumberObj = await TableNumber.findOne({
      tableNum: newTableNumber,
    });
    if (!newTableNumberObj) {
      console.log("Table number not found");
      return res.status(404).json({ error: "Table number not found" });
    }
    const newTableNumberId = newTableNumberObj._id;

    reservation.tableNumberId = newTableNumberId;
    reservation.tableNumber = newTableNumber;
    reservation.name = name;
    reservation.phone = phone;
    reservation.email = email;
    reservation.numPeople = numPeople;
    reservation.comments = comments;
    reservation.reservationDate = reservationDate;
    reservation.startTime = startTime;

    await reservation.save();

    await TableNumber.findByIdAndUpdate(oldTableNumberId, {
      $pull: { reservations: reservationId },
    });
    await TableNumber.findByIdAndUpdate(newTableNumberId, {
      $push: { reservations: reservationId },
    });

    res.status(200).json(reservation);
  } catch (err) {
    next(err);
  }
};

export const updateReservationAvailabilityController = async (
  req,
  res,
  next
) => {
  try {
    await Reservation.updateOne(
      { "availableTableNumbers._id": req.params.id },
      {
        $push: {
          "availableTableNumbers.$.unavailableDates": req.body.dates,
        },
      }
    );
    res.status(200).json("Reservation status has been updated.");
  } catch (err) {
    next(err);
  }
};
export const deleteReservationController = async (req, res, next) => {
  const tableId = req.params.tableid;
  try {
    const reservation = await Reservation.findById(req.params.id);
    if (!reservation) {
      return res.status(404).json({ error: "Reservation not found" });
    }

    await Reservation.findByIdAndDelete(req.params.id);

    await TableNumber.findByIdAndUpdate(tableId, {
      $pull: { reservations: req.params.id },
    });

    res.status(200).json("Reservation has been deleted.");
  } catch (err) {
    next(err);
  }
};

export const getReservationController = async (req, res, next) => {
  try {
    const reservation = await Reservation.findById(req.params.id);
    res.status(200).json(reservation);
  } catch (err) {
    next(err);
  }
};
export const getAllReservationController = async (req, res, next) => {
  try {
    const reservations = await Reservation.find();
    res.status(200).json(reservations);
  } catch (err) {
    next(err);
  }
};
