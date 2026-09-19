import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./config/db";
import userRoute from "./routes/user-routes";
import testRoute from "./routes/test-route";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());
connectDB();

app.use("/api/auth", userRoute);
app.use("/api/test", testRoute);

app.get("/", (req, res) => {
    res.json({
        message: "Property Management API is running"
    });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});