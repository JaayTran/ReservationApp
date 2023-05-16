import express from "express";
import {
  createTableController,
  updateTableController,
  deleteTableController,
  getTableController,
  getAllTablesController,
  getTableReservationController,
} from "../controllers/tableController.js";
import TableNumber from "../models/tableModel.js";
const router = express.Router();

//CREATE
router.post("/", createTableController);

//UPDATE
router.put("/:id", updateTableController);

//DELETE
router.delete("/:id", deleteTableController);

//GET SPECIFIC TABLE
router.get("/find/:id", getTableController);

//GET ALL
router.get("/", getAllTablesController);

//GET ALL RESERVATIONS FOR SPECIFIC TABLE
router.get("/reservation/:id", getTableReservationController);

export default router;
