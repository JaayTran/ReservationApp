import express from "express";
import {
  createTableController,
  updateTableController,
  deleteTableController,
  getTableController,
  getAllTablesController,
  getTableReservationController,
} from "../controllers/tableController.js";
import Table from "../models/tableModel.js";
const router = express.Router();

//CREATE
router.post("/", createTableController);

//UPDATE
router.put("/:tableid", updateTableController);

//DELETE
router.delete("/:tableid", deleteTableController);

//GET SPECIFIC TABLE
router.get("/:tableid", getTableController);

//GET ALL
router.get("/", getAllTablesController);

//GET ALL RESERVATIONS FOR SPECIFIC TABLE
router.get("/:tableid/all", getTableReservationController);

export default router;
