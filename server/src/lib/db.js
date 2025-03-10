import mongoose from 'mongoose';

export const connectDB = async ()=>{
   try {
    const connection = await mongoose.connect(process.env.MONGODB_URI);
    console.log(`mongodb connected: ${connection.connection.host}`);
   } catch (error) {
    console.log("mongoDB connection error: ", error);
   }
}