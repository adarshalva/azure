import mongoose from "mongoose";
import Flight from "./models/flight";

const connectDB = async () => {
  try {
    await mongoose.connect("mongodb://localhost:27017/planescape");
    console.log("✅ Connected to MongoDB");

    const flights = await Flight.find({});
    console.log("🛫 Flights in DB:", flights);

    process.exit(0); // exit after done
  } catch (error) {
    console.error("❌ Error:", error);
    process.exit(1);
  }
};

connectDB();

