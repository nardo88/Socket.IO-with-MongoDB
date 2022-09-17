import express from "express";
import cors from "cors";
import mongoose from "mongoose";

const mongo =
  "mongodb+srv://admin:admin@cluster0.rwelf.mongodb.net/chat?retryWrites=true&w=majority";

const app = express();

app.use(express.json());
app.use(cors({}));

const start = async () => {
  await mongoose.connect(mongo);

  app.listen(5000, () => {
    console.log("server started...");
  });
};

start();
