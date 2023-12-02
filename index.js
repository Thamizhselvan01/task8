import express from "express";
import cors from "cors";
import HallRouter from "./Router/Hall.Router.js";

const app = express();

app.use(express.json());
app.use(cors());

const PORT = 5000;

app.use("/api", HallRouter);
app.get("/", async (req, res) => {
  try {
    res.status(200).json({
      message: "hall booking  API is Working Fine....",
    });
    console.log("HAll booking API is Working Fine....");
  } catch (error) {
    res.status(500).json({ message: "server error" });
    console.log("error in server>>>>>>>");
  }
});

app.listen(PORT, () => {
  console.log("app is listening in the port>>>", PORT);
});
