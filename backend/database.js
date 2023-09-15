import mongoose from "mongoose";

export async function connectDB() {
  // mongoose.connect(process.env.MONGO_URI, {
  //   useNewUrlParser: true,
  // });

  mongoose.connect(
    "mongodb+srv://admin:admin@ecohub.eznpotx.mongodb.net/?retryWrites=true&w=majority",
    {
      useNewUrlParser: true,
    }
  );

  const db = mongoose.connection;

  // Open the connection
  db.once("open", () => {
    console.log("MongoDB connected");
  });
}
