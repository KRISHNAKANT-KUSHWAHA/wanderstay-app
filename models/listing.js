const mongoose = require("mongoose");
const Review = require("./review.js");
const Schema = mongoose.Schema;

const listingSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    // ✅ use a proper default Unsplash image link
    default: "https://images.unsplash.com/photo-1506748686214-e9df14d4d9d0",
    set: (v) =>
      v === ""
        ? "https://images.unsplash.com/photo-1506748686214-e9df14d4d9d0"
        : v,
  },
  price: {
    type: Number,
    required: true,
  },
  location: String,
  country: String,
  reviews: [
    {
      type: Schema.Types.ObjectId,
      ref: "Review",
    },
  ],
});

// post mongoose middleware for deleting all review if delete a particular list
listingSchema.post("findOneAndDelete", async (listing) => {
  if (listing) {
    await Review.deleteMany({ _id: { $in: listing.reviews } }); //agr _id in id ka part hogi to bho sari delete ho jyegi
  }
});
//
const Listing = mongoose.model("Listing", listingSchema);

module.exports = Listing;
