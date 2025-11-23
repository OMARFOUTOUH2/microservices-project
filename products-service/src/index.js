import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import productRoutes from "./routes.js";

dotenv.config();

const app = express();
app.use(express.json());

app.use("/api/products", productRoutes);

const PORT = process.env.PORT || 3001;

mongoose.connect(process.env.MONGO_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => {
  console.log("Connected to MongoDB");
  app.listen(PORT, () => console.log(`Products Service running on port ${PORT}`));
})
.catch(err => console.error("MongoDB connection error:", err));
