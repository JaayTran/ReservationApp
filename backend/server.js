import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";

import contactRoute from "./routes/contactRouter.js";
import tableRoute from "./routes/tableRouter.js";
import reservationRoute from "./routes/reservationRouter.js";

const app = express();
dotenv.config();

const connect = async () => {
  try {
    await mongoose.connect(process.env.MONGODB);
    console.log("Connected to mongoDB.");
  } catch (error) {
    throw error;
  }
};

mongoose.connection.on("disconnected", () => {
  console.log("mongoDB disconnected!");
});

app.use("/api/contacts", contactRoute);
app.use("/api/table", tableRoute);
app.use("/api/reservation", reservationRoute);

app.listen(5000, () => {
  connect();
  console.log("Server Running on Port 5000");
});
