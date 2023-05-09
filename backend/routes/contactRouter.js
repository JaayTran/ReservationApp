import express from "express";
import {
  createContactController,
  deleteContactController,
  getContactController,
  updateContactController,
  getAllContactController,
} from "../controllers/contactController.js";

const router = express.Router();

//CREATE Contact
router.post("/contacts/", createContactController);

//UPDATE Contact
router.put("/contacts/:contactid", updateContactController);

//DELETE Contact
router.delete("/contacts/:contactid", deleteContactController);

//GET SPECIFIC Contact
router.get("/contacts/:contactid", getContactController);

//GET ALL Contacts
router.get("/contacts", getAllContactController);

export default router;
