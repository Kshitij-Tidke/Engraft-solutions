import { app } from "./app.js";
import connectDB from "./db/connectDB.js";
import dotenv from "dotenv"

dotenv.config({
    path:"./env"
})

connectDB()
.then(() => {
    const server = app.listen(process.env.PORT || 8000, () => {
        console.log(`Server is running at port : ${process.env.PORT}`);
    })

    server.on("error", (error) => {
        console.log("ERROR while listening: ", error);
    })
})
.catch((error) =>{
    console.log("MongoDB connection failed !!!", error);
})