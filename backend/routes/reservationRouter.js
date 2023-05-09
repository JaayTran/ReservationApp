import express from "express";
import {
  createReservationController,
  deleteReservationController,
  getReservationController,
  updateReservationController,
  updateReservationAvailabilityController,
  getAllReservationController,
} from "../controllers/reservationController.js";

const router = express.Router();

//CREATE RESERVATION
router.post("/:tableid/:reservationid", createReservationController);

//UPDATE RESERVATION
router.put(
  "/availability/:reservationid",
  updateReservationAvailabilityController
);
router.put("/:tableid/:reservationid", updateReservationController);

//DELETE RESERVATION
router.delete("/:tableid/:reservationid", deleteReservationController);

//GET SPECIFIC RESERVATION
router.get("/:tableid/:reservationid", getReservationController);

//GET ALL RESERVATIONS
router.get("/reservations", getAllReservationController);

export default router;
