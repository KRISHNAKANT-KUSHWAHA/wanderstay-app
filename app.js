const express = require("express");
const app = express();
const mongoose = require("mongoose");
const Listing = require("./models/listing.js"); // ✅ renamed testlisting → Listing
const Path = require("path");
const MONGO_URL = "mongodb://127.0.0.1/wander";
const methodOverride = require("method-override");
const ejsMate = require("ejs-mate");
const ExpressError = require("./utils/ExpressError.js");
const wrapAsync = require("./utils/wrapAsync.js");
const { listingSchema, reviewSchema } = require("./schema.js"); //for server side validation

const Reviews = require("./models/review.js"); // require review

const listings = require("./routes/listing.js"); // require listing
const reviews = require("./routes/review.js"); // require reviews
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

app.set("view engine", "ejs");
app.set("views", Path.join(__dirname, "views"));
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method")); // (_method) method ko use krne wale he
app.engine("ejs", ejsMate);
app.use(express.static(Path.join(__dirname, "/public")));

// Root route
app.get("/", (req, res) => {
  res.send("hi, i am root");
});

// validate listing

// validate listing as a middleware jo ki uper likha he ...leave this topic right now check after view time

app.use("/listings", listings); //this single line handle all listing related request

// index route

// new route

// show route

// Create Route👽

// Edit Route

// delete route

// en listing route ki restructuring krdi hmne and in routes folder......

// validate review

// Reviews
// Post review route

// Delete review route

app.use("/listings/:id/reviews", reviews);

// if request not match with any of the route
app.all(/.*/, (req, res, next) => {
  next(new ExpressError(404, "page Not Found!"));
});

// middleware to handle error
// app.use((err, req, res, next) => {
//   const { statusCode = 500, message = "something went wrong!" } = err;
//   res.status(statusCode).send(message);
// });

// middleware to handle error form express template
app.use((err, req, res, next) => {
  // Always log the real error details in console for developers
  console.error("🔥 ERROR:", err);
  // Extract safe info for user
  const { statusCode = 500, message = "Something went wrong!" } = err;
  // Render user-friendly error page
  res.status(statusCode).render("error", { statusCode, message, err });
});

// ✅ Fixed test route
// app.get("/testlisting", async (req, res) => {
//   let sampleListing = new Listing({
//     title: "My New Villa",
//     description: "By the beach", // ✅ changed "Description" → "description"
//     price: 1200,
//     location: "Goa",
//     country: "India",
//   });

//   await sampleListing.save();
//   console.log("sample was saved");
//   res.send("successful testing of Listing model");
// });

// start the server

//

//
app.listen(8080, () => {
  console.log("server is listening to port 8080");
});
