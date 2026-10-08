import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./config/db";
import userRoute from "./routes/user-routes";
import unitRoute from "./routes/unit-route";
import tenantRoute from "./routes/tenant-route";
import contractRoute from "./routes/contract-route";
import utilityRoute from "./routes/utility-route";
import announcementRoute from "./routes/announcement-route";

dotenv.config();

const app = express();
app.use(cors());

app.use(express.json({ limit: "20mb" }));
connectDB();

app.use("/auth", userRoute);
app.use("/units", unitRoute);
app.use("/tenants", tenantRoute);
app.use("/contracts", contractRoute);
app.use("/utilities", utilityRoute);
app.use("/announcement", announcementRoute);

app.get("/", (req, res) => {
    res.json({
        message: "Property Management API is running"
    });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
