import express from "express";
import morgan from "morgan";
import 'dotenv/config';
import mongoose from "mongoose";
import ecommerceRoutes from "./routers/ecommerce.js";

const app = express();
const PORT = 5000;

app.use(morgan("tiny"));
app.use(express.json());
app.use("/ecommerce", ecommerceRoutes);


mongoose.connect(process.env.MONGODBURI)
.then(() => console.log("MONGODB Connected"))
.catch((err) => console.log("err=>",  err)) 


app.get("/", (req, res) => {
    res.send("Server is running on Brower You check It On Brower");
});


app.listen(PORT, () => console.log("Server Is Running on PORT" +  PORT));