import mongoose from "mongoose";

async function connectToDb() {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log("Connection Established to Database");
    }
    catch(err) {
        console.log(err);
    }
}

export default connectToDb;