const express = require("express");
const app = express();
const dotenv = require("dotenv");
const cors = require("cors");
const path = require('path');
const AuthRoutes = require("./routes/authRoutes");
const UserRoutes = require("./routes/userRoutes");
const ProductRoutes = require("./routes/productRoutes");
const AdminRoutes = require("./routes/adminRoutes");
const CartRoutes = require("./routes/cartRoutes")
const CategoryRoutes = require("./routes/categoryRoutes");
const WishlistRoutes = require("./routes/wishlistRoutes");
const OrderRoutes = require("./routes/orderRoutes");
const dbConnect = require("./config/dbConnect");
dotenv.config();

const port = process.env.PORT;
const publicDir = path.join(__dirname,"public");//gives path to public directory which is inside the server folder
app.use(express.json());
app.use(express.static(publicDir));//if browser request to acess static files then the express serve it by providing the path to public directory 
app.use(cors());

app.use("/api/v1",AuthRoutes);
app.use("/api/v1",UserRoutes);
app.use("/api/v1",ProductRoutes);
app.use("/api/v1",AdminRoutes);
app.use("/api/v1",CategoryRoutes);
app.use("/api/v1",CartRoutes);
app.use("/api/v1",WishlistRoutes);
app.use("/api/v1",OrderRoutes);

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

//if any path browser want to aceess which backend is not providing then its serves by wildcard get
//and it exposes the frontend by giving resoponse of the path to frontend index.html  
//means koi esi request ka path jo backend pe nahi hai use frontend serve karega
app.get("*name",(req,res)=>{
  res.sendFile(path.join(publicDir,"index.html"))
})
dbConnect();


app.listen(port,()=>{
    console.log(`Hi, this is server started at http://localhost:${port}/`);
});