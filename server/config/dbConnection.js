import mongoose from "mongoose";

mongoose.set('strictQuery',false);


    const connectToDb = async () => {
        try {
          const conn = await mongoose.connect(process.env.MONGO_URI);
          console.log(`Connected to db: ${conn.connection.host}`);
        } catch (err) {
          console.error(err.message);
          process.exit(1);
        }
      };
export default connectToDb;

