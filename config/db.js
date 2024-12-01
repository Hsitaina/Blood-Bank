const mongoose = require("mongoose");
const colors = require("colors");

const connectDB = async()=>{
     try {
        await mongoose.connect(process.env.MONGO_URL);
        console.log(`Mongoose connected to ${mongoose.connection.host}`);
    } catch (error) {
        console.log(`Mongoose error ${error}`);
    }
}

module.exports = connectDB;