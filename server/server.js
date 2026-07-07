import express from "express";
import cors from "cors";
import medicationsRouter from "./routes/medications.js";

const app = express();
const PORT = 3001;

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("SeniorCare Connect API is running");
});

app.use("/api/medications", medicationsRouter);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});