// db.js
import mongoose from "mongoose";

const connectDB = async (mongoUri) => {
  if (!mongoUri) throw new Error("MONGODB_URI not provided");

  try {
    // Prevent strictQuery warnings (optional)
    mongoose.set("strictQuery", false);

    // IMPORTANT: do not pass legacy options like useNewUrlParser/useUnifiedTopology
    const conn = await mongoose.connect(mongoUri);

    console.log(`MongoDB connected: ${conn.connection.host}:${conn.connection.port}/${conn.connection.name}`);

    mongoose.connection.on("error", (err) => console.error("MongoDB event error:", err));
    mongoose.connection.on("disconnected", () => console.warn("MongoDB disconnected"));

    return conn;
  } catch (err) {
    console.error("MongoDB connection error:", err.message || err);
    throw err;
  }
};

export default connectDB;
