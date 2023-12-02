import express from "express";
import cors from "cors";
import HallRouter from "./Router/Hall.Router.js";

const app = express();

app.use(express.json());
app.use(cors());

const PORT = 5000;

app.use("/api", HallRouter);

app.listen(PORT, () => {
  console.log("app is listening in the port>>>", PORT);
});
