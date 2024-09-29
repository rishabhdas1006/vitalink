import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import MainRouter from "./routes/routeIndex.js";
import cors from "cors";

const app = express();
const PORT = 3000;

app.use(express.json());
app.use(cors());
dotenv.config();

mongoose.connect(process.env.MONGO_URL).then(() => {
	console.log("Connected to DB");
});

app.use("/api/v1", MainRouter);

app.get("/health", (req, res) => {
	return res.status(200).json({
		message: "OK",
	});
});

app.listen(PORT, () => {
	console.log(`Server started on port ${PORT}`);
});
