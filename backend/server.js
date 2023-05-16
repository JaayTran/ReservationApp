import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";

import contactRoute from "./routes/contactRouter.js";
import tableRoute from "./routes/tableRouter.js";
import reservationRoute from "./routes/reservationRouter.js";
// import cookieParser from "cookie-parser";
import cors from "cors";

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

//middlewares
app.use(cors());
// app.use(cookieParser());
app.use(express.json());

app.use("/api/contacts", contactRoute);
app.use("/api/table", tableRoute);
app.use("/api/reservation", reservationRoute);

app.use((err, req, res, next) => {
  const errorStatus = err.status || 500;
  const errorMessage = err.message || "Something went wrong!";
  return res.status(errorStatus).json({
    success: false,
    status: errorStatus,
    message: errorMessage,
    stack: err.stack,
  });
});

app.listen(5000, () => {
  connect();
  console.log("Server Running on Port 5000");
});
