import express from "express";
import * as dotenv from "dotenv";
import cors from "cors";
import connectDB from "./mongoDB/connect.js";
import postRoute from "./routes/postRoute.js";
import aiRoute from "./routes/aiRoute.js";

dotenv.config();
const app = express();
app.use(cors());
app.use(express.json({ limit: "50mb" }));

app.use("/api/v1/post", postRoute);
app.use("/api/v1/ai", aiRoute);
app.get("/", (req, res) => {
  res.send("heloo daa");
});

app.listen(3000, () => {
  try {
    connectDB();
    console.log("server running...on 3000");
  } catch (err) {
    console.log(err);
  }
});
