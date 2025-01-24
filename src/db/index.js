import { mongoose } from 'mongoose';
import { DB_NAME } from "../constants.js"
import dotenv from 'dotenv';
dotenv.config(

);

const connectDB = async () => {
  try {

    const connectionInstance = await mongoose.connect(`mongodb+srv://mahemud:mahemud@cluster0.y3zrjtm.mongodb.net/luxurystore`)

    console.log(`\nMongoDB connected! DB host : ${connectionInstance.connection.host}`);

  } catch (error) {
    console.log("MongoDB connection error", error);
    process.exit(1);
  }
}


export default connectDB;