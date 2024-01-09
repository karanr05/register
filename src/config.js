require("dotenv").config();
const mongoose = require("mongoose");
 
const link = mongoose.connect(process.env.DATABASE_URL); // Enter your MongoDB url in the .env file


link
 .then(() => {
    console.log("Database connected...");
})
.catch((error) => {
    console.error("Database connection error:", error.message);
});



//CREATE SCHEMA
const loginSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true,
    },
    password:{
        type: String,
        required: true,
    }
});

//Collections ALERT
const collections = new mongoose.model("collections", loginSchema);
module.exports = collections;
