require("dotenv").config();

const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const Admin = require("./models/Admin");

mongoose
  .connect(process.env.MONGO_URI)
  .then(async () => {
    console.log("MongoDB Connected");

    // Check if admin already exists
    const existingAdmin = await Admin.findOne({
      username: "admin",
    });

    if (existingAdmin) {
      console.log("Admin already exists");
      process.exit();
    }

    // Hash password
    const hashedPassword = await bcrypt.hash("admin123", 10);

    // Create admin
    await Admin.create({
      username: "admin",
      password: hashedPassword,
    });

    console.log("Admin created successfully!");
    console.log("Username: admin");
    console.log("Password: admin123");

    process.exit();
  })
  .catch((err) => {
    console.log(err);
    process.exit();
  });