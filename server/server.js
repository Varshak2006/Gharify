const express=require("express");
const cors=require("cors");  
const dotenv=require("dotenv");
const path = require("path");
const connectDB=require("./config/db");
const uploadRoutes=require("./routes/uploadRoutes");
dotenv.config();
connectDB();
const app=express();

app.use(cors());
app.use(express.json());
app.use(
    "/uploads",
    express.static(path.join(__dirname,"uploads"))
);
app.use("/api/upload", uploadRoutes);
app.get("/",(req,res)=>{
    res.send("gharify api is running");
});
const serviceroutes=require("./routes/ServiceRoutes");
app.use("/api/services",serviceroutes);
const authRoutes=require("./routes/authRoutes");
app.use("/api/auth",authRoutes);

const bookingRoutes=require("./routes/bookingRoutes");
app.use("/api/bookings",bookingRoutes);

const reviewRoutes=require("./routes/reviewRoutes");
app.use("/api/reviews",reviewRoutes);

const analyticsRoutes = require("./routes/analyticsRoutes");
app.use("/api/analytics", analyticsRoutes);

const PORT=process.env.PORT || 5000;
app.listen(PORT,()=>{
    console.log(`server running on port ${PORT}`);
});
