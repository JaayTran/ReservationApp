import Reservation from "../models/reservationModel.js";

//for fetch all
export const getAllReservationController = async (req, res) => {
  try {
    const reservation = await Reservation.find();
    res.status(200).send(reservation);
  } catch (error) {
    console.log(error);
  }
};

//fetch specific
export const getReservationController = async (req, res, next) => {
  try {
    const reservation = await Reservation.findById(req.params.id);
    res.status(200).json(reservation);
  } catch (err) {
    next(err);
  }
};

//for add
export const createReservationController = async (req, res) => {
  try {
    const newReservation = new Reservation(req.body);
    await newReservation.save();
    res.status(200).send("Reservation Created Successfully!");
  } catch (error) {
    console.log(error);
  }
};

//for update
export const updateReservationController = async (req, res) => {
  try {
    await Reservation.findOneAndUpdate(
      { _id: req.body.reservationId },
      req.body,
      {
        new: true,
      }
    );
    res.status(201).json("Reservation Updated!");
  } catch (error) {
    res.status(400).send(error);
    console.log(error);
  }
};

//for delete
export const deleteReservationController = async (req, res) => {
  try {
    await Reservation.findOneAndDelete({ _id: req.body.reservationId });
    res.status(200).json("Reservation Deleted!");
  } catch (error) {
    res.status(400).send(error);
    console.log(error);
  }
};

//for reservation availability
export const updateReservationAvailabilityController = async (
  req,
  res,
  next
) => {
  try {
    await Reservation.updateOne(
      { "tableNumbers._id": req.params.id },
      {
        $push: {
          "tableNumbers.$.unavailableDates": req.body.dates,
        },
      }
    );
    res.status(200).json("Room status has been updated.");
  } catch (err) {
    next(err);
  }
};
