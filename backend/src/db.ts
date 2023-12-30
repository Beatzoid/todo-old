import mongoose from "mongoose";

const connectToDatabase = async () => {
    try {
        const connection = await mongoose.connect(process.env.MONGO_URL!);

        if (connection) {
            console.log("Connection to DB established");
        }
    } catch (error) {
        console.error("Error in connectToDatabase: ", error);
        throw error;
    }
};

export default connectToDatabase;
