// const mongoose=require('mongoose')
// const initData= require("./data.js");
// const Listing =require("./models/listing.js")


// // data base connection 
// const MONGO_URL="mongodb://localhost:27017/wanderlust";
// main()
// .then(console.log("database connected"))
// .catch(err => console.log(err))


// async function main(){
//     await mongoose.connect(MONGO_URL,{
//         useNewUrlParser:true,
//         useUnifiedTopology:true,
//     })
//     console.log("database connected")
// }

// const initDB =async()=>{
//     await Listing.deleteMany({})
//     await Listing.insertMany(initData);
//     await Listing.insertMany(initData.data)
//     console.log(" data was initialized");
// };
// initDB();



const mongoose = require('mongoose');
const initData = require('./data.js');
const Listing = require('./listing.js');

// Database connection URL
const MONGO_URL = "mongodb://localhost:27017/wanderlust";

// Connect to the database
async function main() {
    try {
        await mongoose.connect(MONGO_URL, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        console.log("Database connected");

        // Initialize the database
        await initDB();
    } catch (error) {
        console.error("Database connection error:", error);
    }
}

// Function to initialize the database
const initDB = async () => {
    try {
        // Delete existing data
        await Listing.deleteMany({});

        // Insert sample data
        await Listing.insertMany(initData.data);

        console.log("Data was initialized");
    } catch (error) {
        console.error("Error initializing data:", error);
    }
};

// Call the main function to start the application
main();







