import mongoose from 'mongoose';
import { getEnvironmentVariables } from '../enviroments/environment';


const connectDB = async (): Promise<void> => {
  try {
    const conn = await mongoose.connect(getEnvironmentVariables().db_uri); // Replace with your DB URL
    console.log(`MongoDB connected: ${conn.connection.host}`);
  } catch (error) {
    console.error('MongoDB connection failed:', error);
  }
  
};

export default connectDB;
