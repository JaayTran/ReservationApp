import Reservation from "../models/reservationModel.js";

//for add or fetch
export const getReservationController = async (req, res) => {
  try {
    const reservation = await Reservation.find();
    res.status(200).send(reservation);
  } catch (error) {
    console.log(error);
  }
};

//for add
export const addReservationController = async (req, res) => {
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
