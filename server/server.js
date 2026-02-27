const express = require("express");
const app = express();
const dotenv = require("dotenv");
const cors = require("cors");
const AuthRoutes = require("./routes/authRoutes");
const UserRoutes = require("./routes/userRoutes");
const dbConnect = require("./config/dbConnect");
dotenv.config();

const port = process.env.PORT;

app.use(express.json());
app.use(cors());

app.use("/api/v1",AuthRoutes);
app.use("/api/v1",UserRoutes);

app.get("/",(req,res)=>{
    res.send(`<h1>Hi is this Ecommerce app</h1>`);
})

dbConnect();

app.listen(port,()=>{
    console.log(`Hi, this is server started at http://localhost:${port}/`);
});