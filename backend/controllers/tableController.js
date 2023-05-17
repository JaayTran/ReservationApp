import TableNumber from '../models/tableModel.js';
import Reservation from '../models/reservationModel.js';

export const createTableController = async (req, res, next) => {
  const newTableNumber = new TableNumber(req.body);

  try {
    const savedTableNumber = await newTableNumber.save();
    res.status(200).json(savedTableNumber);
  } catch (err) {
    next(err);
  }
};
export const updateTableController = async (req, res, next) => {
  try {
    const updatedTableNumber = await TableNumber.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    );
    res.status(200).json(updatedTableNumber);
  } catch (err) {
    next(err);
  }
};
export const deleteTableController = async (req, res, next) => {
  try {
    await TableNumber.findByIdAndDelete(req.params.id);
    res.status(200).json('TableNumber has been deleted.');
  } catch (err) {
    next(err);
  }
};
export const getTableController = async (req, res, next) => {
  try {
    const tableNumber = await TableNumber.findById(req.params.id);
    res.status(200).json(tableNumber);
  } catch (err) {
    next(err);
  }
};
export const getAllTablesController = async (req, res, next) => {
  const { min, max, ...others } = req.query;
  try {
    const tableNumbers = await TableNumber.find({
      ...others,
    }).limit(req.query.limit);
    res.status(200).json(tableNumbers);
  } catch (err) {
    next(err);
  }
};

export const getTableReservationController = async (req, res, next) => {
  try {
    const tableNumber = await TableNumber.findById(req.params.id);
    const list = await Promise.all(
      tableNumber.reservations.map((reservation) => {
        return Reservation.findById(reservation);
      })
    );
    res.status(200).json(list);
  } catch (err) {
    next(err);
  }
};
