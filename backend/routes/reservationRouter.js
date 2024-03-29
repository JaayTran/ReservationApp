import express from 'express';
import {
  createReservationController,
  deleteReservationController,
  getReservationController,
  updateReservationController,
  updateReservationAvailabilityController,
  getAllReservationController,
  updateReservationStatusController,
} from '../controllers/reservationController.js';

const router = express.Router();

//CREATE RESERVATION
router.post('/:tableid/', createReservationController);

//UPDATE RESERVATION
router.put('/availability/:id', updateReservationAvailabilityController);
router.put('/:id', updateReservationController);
router.put('/status/:id', updateReservationStatusController);

//DELETE RESERVATION
router.delete('/:id/:tableid', deleteReservationController);

//GET SPECIFIC RESERVATION
router.get('/:id', getReservationController);

//GET ALL RESERVATIONS
router.get('/', getAllReservationController);

export default router;
