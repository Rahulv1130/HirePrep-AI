import dotenv from "dotenv";
dotenv.config();

import app from "./app.js";
import connectToDb from "./config/database.js";


const PORT = 3000;
connectToDb();


app.listen(PORT, () => {
    console.log(`Listening to Port : ${PORT}`)
});