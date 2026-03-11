const express = require("express");
const app = express();
const dotenv = require("dotenv");
const cors = require("cors");
const AuthRoutes = require("./routes/authRoutes");
const UserRoutes = require("./routes/userRoutes");
const ProductRoutes = require("./routes/productRoutes");
const AdminRoutes = require("./routes/adminRoutes");
const CategoryRoutes = require("./routes/categoryRoutes");
const dbConnect = require("./config/dbConnect");
dotenv.config();

const port = process.env.PORT;

app.use(express.json());
app.use(cors());

app.use("/api/v1",AuthRoutes);
app.use("/api/v1",UserRoutes);
app.use("/api/v1",ProductRoutes);
app.use("/api/v1",AdminRoutes);
app.use("/api/v1",CategoryRoutes);

app.use((err, req, res, next) => {

  if (err.code === "LIMIT_FILE_SIZE") {
    return res.status(400).json({
      success: false,
      message: "Image size cannot exceed 2MB"
    });
  }

  if (err.message === "Only JPEG, PNG and JPG files are allowed") {
    return res.status(400).json({
      success: false,
      message: err.message
    });
  }

  next(err);
});

app.get("/",(req,res)=>{
    res.send(`<h1>Hi is this Ecommerce app</h1>`);
})

dbConnect();

app.listen(port,()=>{
    console.log(`Hi, this is server started at http://localhost:${port}/`);
});