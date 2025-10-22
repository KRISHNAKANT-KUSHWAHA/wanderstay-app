const mongoose = require("mongoose");
const { sampleListings } = require("./data.js"); // ✅ fixed import
const Listing = require("../models/listing.js");

const MONGO_URL = "mongodb://127.0.0.1/wander";

main()
  .then(() => {
    console.log("connected to DB");
  })
  .catch((err) => {
    console.log(err);
  });

async function main() {
  await mongoose.connect(MONGO_URL);
}

const initDB = async () => {
  await Listing.deleteMany({});
  // ✅ fixed from initData.sampleListings → sampleListings
  await Listing.insertMany(sampleListings);
  console.log("data was initialised");
};

initDB();
