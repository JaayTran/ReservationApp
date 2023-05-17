import Reservation from '../models/reservationModel.js';
import TableNumber from '../models/tableModel.js';
import { createError } from '../utils/error.js';

export const createReservationController = async (req, res, next) => {
  const tableId = req.params.tableid;
  const newReservation = new Reservation(req.body);

  try {
    const savedReservation = await newReservation.save();

    try {
      const table = await TableNumber.findById(tableId);
      if (!table) {
        // Handle case where table is not found
        return res.status(404).json({ error: 'Table not found' });
      }

      // Update the reservation with the table number
      savedReservation.tableNumber = table.tableNum;
      await savedReservation.save();

      // Update the table with the reservation ID
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
    const updatedReservation = await Reservation.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    );
    res.status(200).json(updatedReservation);
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
      { 'availableTableNumbers._id': req.params.id },
      {
        $push: {
          'availableTableNumbers.$.unavailableDates': req.body.dates,
        },
      }
    );
    res.status(200).json('Reservation status has been updated.');
  } catch (err) {
    next(err);
  }
};
export const deleteReservationController = async (req, res, next) => {
  const tableId = req.params.tableid;
  try {
    await Reservation.findByIdAndDelete(req.params.id);
    try {
      await TableNumber.findByIdAndUpdate(tableId, {
        $pull: { reservations: req.params.id },
      });
    } catch (err) {
      next(err);
    }
    res.status(200).json('Reservation has been deleted.');
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
