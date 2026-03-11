require("dotenv").config();

const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const User = require("../models/User");
const dbConnect = require("../config/dbConnect");

// mongoose.connect(process.env.MONGODB_URL)
// .then(() => console.log("MongoDB Connected"))
// .catch((err) => console.log(err));

dbConnect();


const createAdmin = async () => {

  try {

    const adminExists = await User.findOne({ role: "admin" });

    if (adminExists) {
      console.log("Admin already exists");
      process.exit();
    }

    const hashedPassword = await bcrypt.hash("Admin@123", 10);

    const admin = await User.create({
      name: "Admin",
      email: "admin@yopmail.com",
      password: hashedPassword,
      role: "admin"
    });

    console.log("Admin created successfully");
    console.log(admin);

    process.exit();

  } catch (error) {

    console.error(error);
    process.exit(1);

  }

};

createAdmin();



























































//  Run Admin Seeder
// Run this one time in terminal:
// Bash
// Copy code
// node seed/createAdmin.js
// Output:
// Plain text
// Copy code
// MongoDB Connected
// Admin created successfully
// 3️dmin Login
// Plain text
// Copy code
// Email: admin@gmail.com
// Password: admin123
// 4️ Remove Admin Creation From server.js
// Your server.js should stay clean:
// JavaScript
// Copy code
// require("dotenv").config();

// const express = require("express");
// const cors = require("cors");

// const connectDB = require("./config/db");

// const app = express();

// connectDB();

// app.use(cors());
// app.use(express.json());

// app.use("/api/auth", require("./routes/authRoutes"));
// app.use("/api/admin", require("./routes/adminRoutes"));

// app.listen(process.env.PORT, () => {
//   console.log(`Server running on port ${process.env.PORT}`);
// });
//  Advantages of Separate Admin Seeder
// Benefit
// Reason
// Cleaner server.js
// Server only runs APIs
// Professional structure
// Used in production apps
// Controlled admin creation
// Runs only when needed
// Better for deployment
// DevOps friendly
//  Pro tip (used in big projects):
// Developers create multiple seeders
// Plain text
// Copy code
// seed/
//    createAdmin.js