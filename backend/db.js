const mongoose = require("mongoose") // import mongoose
const mongooURI = "mongodb://localhost:27017/BloodBank"  // Mention the connecting url with db name

const connectToMongo = async() =>{
    try {
        mongoose.connect(mongooURI); // connect to db
        console.log("Connected to mongoose successfully now");
    } 
    catch (error) {
        console.log(error); // display error
        process.exit();    // exit in case of error
    }
}

module.exports = connectToMongo;