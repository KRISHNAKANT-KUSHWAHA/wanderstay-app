const mongoose = require("mongoose");
const { initData } = require("./data.js");
const Listing = require("../models/listing.js");

const MONGO_URL = "mongodb://127.0.0.1/wanderstay";

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

  const initData2 = initData.map((obj) => ({
    ...obj,
    owner: new mongoose.Types.ObjectId("6922123309e9458751770c18"),
  }));

  await Listing.insertMany(initData2);

  console.log("data was initialised");
};

initDB();
